const mongoose = require('mongoose')

const shoesSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
   isReadyToBuy: Boolean,

    
    
}) 

const Shoe = mongoose.model('Shoe', shoesSchema)
module.exports = Shoe
    