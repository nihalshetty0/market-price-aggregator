const mongoose = require('mongoose')

const AggregateSchema = new mongoose.Schema({
    cmdtyName: {
        type:String
    },
    cmdtyID:{
        type: 'String'
    },
    marketID:{
        type: 'String'
    },
    marketName:{
        type: 'String'
    },
    users:[
        {type: String}
    ],
    timestamp: {
        type: Date,
        default: Date.now()
    },
    priceUnit:{
        type: String
    },
    price:{
        type: Number
    }



})

module.exports = mongoose.model('Aggregate', AggregateSchema)