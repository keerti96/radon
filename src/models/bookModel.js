const mongoose = require('mongoose');



// A1
const bookSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String,
    category: String,
    year: String,
    


    /*
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    emailId: String,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
*/    
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //books




// String, Number
// Boolean, Object/json, array

/*
const bookSchema = new mongoose.Schema( {
    bookName: String,
    prices: {
        indianPrice: String,
        europeanPrice: String
        },
    Year: String,
    Tags : [ String ],
    authorName: String,
    totalPages: Number,
    stockAvilable: Boolean
    
}, { timestamps: true });
*/