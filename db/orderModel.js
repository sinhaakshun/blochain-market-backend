const mongoose = require('mongoose');


var orderSchema = mongoose.Schema({
    // name: {
    //     type : String,
    //     required: true,
    // },
    productId: {
        type : String,
        required: true,
    },
    // price: {
    //     type : Number,
    //     required: true,
    // },
    userAddress : {
        type : String,
        required: true,
    },
    timestamp: {
        type : Date,
        required: true,
    },
})

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;