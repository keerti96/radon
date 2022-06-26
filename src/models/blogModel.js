const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: 'Author'
    },
    tags: {
        type: [String],
        
    },
    category: {
        type: String,
        trim: true,
        required: true        //, examples: [technology, entertainment, life style, food, fashion]
    },
    subcategory: {
        type: [String],      //examples[technology-[web development, mobile development, AI, ML etc]] 
    },
    deletedAt: {
        type: Date           //when the document is deleted
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date           //when the blog is published
    },
    isPublished: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)



// String, Number
// Boolean, Object/json, array