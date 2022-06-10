const bookModel = require('../models/bookModel')
const authorModel = require("../models/authorModel")

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


const getbook = async function(req,res){
    let id= await authorModel.findOne({author_name:"Chetan Bhagat"}).select({author_id:1 , _id:0})
    let bookData = await bookModel.find({author_id: id.author_id})
    res.send({msg: bookData})
}

const getUpdatedPrice = async function(req,res){
    
	let updated = await bookModel.findOneAndUpdate({name: "Two States"}, {price: 100}, {new: true}) //select({author_id:1, _id:0})
    let id = updated.author_id;
    let updatedPrice = updated.price
    console.log(id);

    let authorData = await authorModel.findOne({author_id: id}).select({author_name:1, _id:0})
    res.send({msg: authorData, updatedPrice})
}


const getAuthorName = async function (req, res){
    let bookData = await bookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1, _id:0})
    
    let arry=[]
    for(let i=0; i<bookData.length; i++)
    {
        const x = bookData[i]
        const author = await authorModel.findOne({author_id:x.author_id}).select({author_name:1, _id:0})
        arry.push(author)
    }
    const authorName = arry
    res.send({bookData,authorName})
    
    /*
    let authorNames = bookData.map(x => await authorModel.findOne({author_id:x.author_id}).select({author_name:1, _id:0}))

    res.send({bookData,authorNames})
    */

}




// additional question
const getBooksById = async function (req,res) {
    let authorId = req.params.id
    let savedData = await bookModel.find({author_id : authorId}).select({name:1, _id:0})
    return res.send({data : savedData})

}

const getAuthor = async function (req,res) {
    let authId = await bookModel.find({ratings:{$gt:4}}).select({author_id:1, _id:0})
    //let authId = bookQuery.map(inp => inp.author_id)
    

    let temp = []
    for(i=0;i<authId.length;i++) {
        let x = authId[i]
    let authorQuery = await authorModel.find({ $and: [{author_id : x.author_id}, {age: {$gt:50}}] }).select({author_name:1, age:1, _id:0})
    temp.push(authorQuery)
    }
    const finalAns = temp.flat()
    return res.send({data: finalAns})
}






module.exports={getAuthorName,createBook,createAuthor,getbook,getBooksById,getAuthor, getUpdatedPrice}