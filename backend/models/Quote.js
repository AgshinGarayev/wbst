const mongoose = require('mongoose')


const quoteSchema = new mongoose.Schema({
    
    author:{
        type: String,
        required: true
    },
    
    quote:{
        type: String,
        required: true
    },

    user_id:{
        type:String,
        required: true

    }

})

const quoteModel = mongoose.model('quote', quoteSchema)

module.exports = quoteModel;