const mongoose = require('mongoose');



// A1
const bookSchema = new mongoose.Schema( {
    bookName: String,
    prices: {
        indianPrice: String,
        europeanPrice: String
        },
    Year: {
        type: String,
        default: 2021
        },
    Tags : [ String ],
    authorName: String,
    totalPages: Number,
    stockAvilable: Boolean
    
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //books




// String, Number
// Boolean, Object/json, array


