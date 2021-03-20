const fix = require("./helpers/fix");

module.exports = (socket) => {
    console.log('socket connection established !')
    setInterval(function(){ // emit new data after every 1 second
        let data = [];
        for(let stock of cached_stocks) {
            data.push({name:stock.name,price:fix((Math.random() * 100) + 20,2),updated_at:new Date()});
        }   
        socket.broadcast.emit('newdata',data);
    },3000);
}