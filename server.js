const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const _socket = require('./manage_socket');
require('dotenv').config(); // Require .env file
require('./models/Stocks');
require('./models/StockHistory');

// Establish mongoose connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true}).catch(err => {console.log('[ERROR] mongo connection :',err)});

let Stocks = mongoose.model('Stocks'); // Mongoose models 
let StockHistory = mongoose.model('StockHistory');
global.fix = require('./helpers/fix'); // Function used to limit float precision
global.cached_stocks = [];

/**
 * Returns array of stock objects.
 *
 * @param {object} req express request object
 * @param {object} res express response object
 * @return {array} [] array of stock objects
 */
router.get('/stocks',(req,res) => {
    Stocks.find().lean().exec().then(stocks => {
        global.cached_stocks = stocks;
        res.json(stocks);
    })
    .catch(err => {
        console.log('[ERROR] while getting stocks details :' , err);
        res.json([]);
    });
});

/**
 * Returns object which contains stock's historic data
 *
 * @param {object} req express request object
 * @param {object} res express response object
 * @return {object} {} return stock's historic data 
 */
router.get('/stocks/:id',(req,res) => {
    let label = null;
    let labels = null;
    let data = null;
    StockHistory.findOne({stock_id:req.params.id}).then(record => {
        if(req.query.type.toLocaleLowerCase() == 'monthly') {
            label = 'monthly';
            labels = ['2021-03-20','2021-02-20','2021-01-20','2020-12-20','2020-11-20','2020-10-20','2020-09-20','2020-08-20','2020-07-20','2020-06-20'];
            data = record.monthly_history;
        } else {
            label = 'yearly';
            labels = ['2021','2020','2019','2018','2017','2016','2015','2015','2014','2013','2012'];
            data = record.yearly_history;
        }
        res.json({
            labels:labels,
            datasets:[{
                label:label,
                data:data
            }]
        })
    })
    .catch(err => {
        console.log('[ERROR] while fetching stock history :' , err);
        res.json({});
    });
});

app.use(cors());
app.use('/',router);
app.use(function (err, req, res, next) { // global error handler
    console.error(err.stack)
    res.status(500).send('INTERNAL_ERROR!');
});


let server = app.listen(port,(err) => {
    if(!err) {
        console.log('App listening on port :' , port);
    }
});

let io = require('socket.io')(server,{cors: {origin: '*'}});
io.on('connection',_socket); // socket events handler
