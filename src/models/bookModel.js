const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
    type: 'String',
    required: true
    },

    author_id:{
        type: "string",
        require: true

    },

    price: Number,

    rating:Number     
    
    },{timestamps:true})
    
   
module.exports = mongoose.model('Book', bookSchema) //usersb
