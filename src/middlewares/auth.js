const jwt = require("jsonwebtoken")
const bookModel = require('../models/booksModel')
//const mongoose = require("mongoose")
const {isValidObjectId} = require("../validator/validation")

//<<------------------------------------------------AUTHENTICATION------------------------------------------------------------>>
const authentication = function (req, res, next) {
    try {
        const token = req.headers["X-Auth-Token"] || req.headers["x-auth-token"]
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token missing" })
        }

        try{
        var decodedtoken = jwt.verify(token, "##k&&k@@s")
            console.log(typeof decodedtoken)
        }
        catch(err){
            return res.status(401).send({ status: false, msg: "Token invalid" })
        }
        // if (!decodedtoken) {

        //     return res.status(401).send({ status: false, msg: "Token invalid" })
        // }
     

        req.decodedtoken = decodedtoken
        console.log("Successfully Authenticated")
       
        next()


    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//<<-----------------------------------------------AUTHORIZATION----------------------------------------------->>
const authorization = async function (req, res, next) {
    try {
        //userId for the logged-in user
        let userId = req.decodedtoken.userId

        //userId of the owner of the book
        let ownerOfBook = "" 


        if(req.body.userId){
            const userId = req.body.userId;
            if(!isValidObjectId(userId)){
                return res.status(400).send({ status: false, msg: "Book id is invalid" })
            }
            ownerOfBook = userId ;
        }
       else if(req.params.bookId){
            const bookId = req.params.bookId ;

            if(!isValidObjectId(bookId)){
                return res.status(400).send({ status: false, msg: "Book id is invalid" })
            }
            const validBook = await bookModel.findById(bookId)

            if (!validBook)
                return res.status(404).send({ status: false, msg: "book with thid bookid not found " })
            
            // get the user id for requested book
            ownerOfBook = validBook.userId;
        }

       
        //check if the logged-in user is requesting to modify their own resources 
        if (ownerOfBook != userId)
            return res.status(403).send({ status: false, msg: 'Author logged in is not allowed to modify the requested blog data' })
        
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports = {authentication, authorization}
