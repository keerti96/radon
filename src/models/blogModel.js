const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.ObjectId

const blogSchema = new mongoose.Schema( {
    title: {type:String,
    required:true}, 
    body: {type:String,
    required:true}, 
    authorId: {type:ObjectId,
        required:true,
        ref:'Author'}, 
    tags:[String], 
    category: {type:String,
        required:true
        //, examples: [technology, entertainment, life style, food, fashion]
    }, 
    subcategory: {type:[String] 
        //examples[technology-[web development, mobile development, AI, ML etc]] 
    }, 
    //createdAt, updatedAt, 
    deletedAt: {type:Date
        //when the document is deleted
    }, 
    isDeleted: {type:Boolean, 
        default: false}, 
    publishedAt: {type:Date
        //when the blog is published
    }, 
    isPublished: {type:Boolean, 
        default: false},
    
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema) //users



// String, Number
// Boolean, Object/json, array