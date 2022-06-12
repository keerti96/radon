const BookModel= require("../models/bookModel")
const createBook = async function (req, res) {
    const book = req.body
    let savedBook = await BookModel.create(book)
    res.send({ msg: savedBook })
}

const allBooksList = async function (req, res) {
    let list = await BookModel.find().select({ bookName: 1, authorName: 1, _id: 0 })
    res.send({ msg: list })
}

const yearDetails = async function (req, res) {
    let yearList= await BookModel.find({ year: req.body.year }).select({bookName:1,_id:0})
    res.send(yearList)
 }

const particularBooks = async function (req, res) {
    
    let specificBooks = await BookModel.find(req.body)
    res.send({msg:specificBooks})
}

const priceDetails= async function(req,res){
    let list = await BookModel.find({"prices.indianPrice": {$in: ["100INR", "200INR","500 INR"]}} ).select({bookName:1,_id:0})
    res.send({ msg: list })
}

const randomBooks= async function(req, res) {
    let allBooks = await BookModel.find({$or:[ {stockAvailable: true},{ totalPages: {$gt: 500}}]})
    res.send({msg: allBooks })
}


module.exports.createBook= createBook
module.exports.allBooksList = allBooksList
module.exports.yearDetails = yearDetails
module.exports.particularBooks = particularBooks
module.exports.priceDetails = priceDetails
module.exports.randomBooks = randomBooks



/*
const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getAllBooks= async function (req, res) {
    let allBooks= await BookModel.find()
    res.send({msg: allBooks})
}

module.exports.createBook= createBook
module.exports.getAllBooks= getAllBooks
*/

