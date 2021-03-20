const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  monthly_history:Array,
  yearly_history:Array,
  stock_id:String,
});

module.exports = mongoose.model('StockHistory', schema,'StockHistory');