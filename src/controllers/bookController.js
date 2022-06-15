const bookModel = require('../models/bookModel')
const authorModel = require("../models/authorModel")


const getDetails = async function(req,res){
    return res.send("Details printed successfully");
}


/*
const createBook = async function(req,res){
    let data =req.body;
    let saveData = await bookModel.create(data);
    return res.send({msg: saveData});
}


const createAuthor = async function(req,res){
    let data =req.body;
    let saveData = await authorModel.create(data);

    res.send({msg: saveData});
}
const getBooks = async function(req,res){
    let authorName= await authorModel.find({author_name:"Chetan Bhagat"})
    let id =authorName[0].author_id
    let bookData = await bookModel.find({author_id:id})
    res.send({msg: bookData})
}


const getAuthor = async function (req,res) {
    let bookQuery = await bookModel.find({ratings:{$gt:"4"}}).select({author_id:1, _id:0})
    let authId = bookQuery.map(inp => inp.author_id)
    
    let temp = []
    for(i=0;i<authId.length;i++) {
        let x = authId[i]
    let authorQuery = await authorModel.find({ $and: [{author_id : x}, {age: {$gt:"50"}}] }).select({author_name:1, age:1, _id:0})
    temp.push(authorQuery)
    }
    const finalAns = temp.flat()
    return res.send({data: finalAns})
}



const getAuthorName = async function (req, res){
    const bookData = await bookModel.find({prices:{$gte:50,$lte:100}}).select({name:1, author_id:1 ,price:1, _id:0})
    const id = bookData.map(input => input.author_id)
    let arry=[]
    for(let i=0; i<id.length; i++)
    {
        const x = id[i]
        const author = await authorModel.find({author_id:x}).select({author_name:1,author_id:1 , _id:0})
        arry.push(...author)
    }
    const authorName = arry
    res.send({bookData,authorName})

}

// additianal question
const getBooksById = async function (req,res) {
    let authorId = req.params.id
    let savedData = await bookModel.find({author_id : authorId}).select({name:1, _id:0})
    return res.send({data : savedData})

}
*/

//module.exports={getAuthorName,createBook,createAuthor,getBooks,getBooksById,getAuthor}

module.exports.getDetails = getDetails;