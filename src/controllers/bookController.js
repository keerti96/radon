const bookModel = require("../models/booksModel")


// ===================================== POST /books ===================================== 

const createBook = async function (req, res) {
    try {
        const data = req.body
       
        const createbooks = await bookModel.create(data)
        res.status(201).send({
            status: true, data: createbooks
        })
     } catch (err) {
        res.status(500).send({ status: false,massage:"success", msg: err.message });
    }
}

// ===================================== GET /books ===================================== 

const getBookbyQuerry = async function (req, res) {
    try {
        let requestData = req.query
        const filter = {}
        filter.isDeleted = false
        if (requestData.category) {
            if (!validate.isValidData(requestData.category))
                return res.status(400).send({ status: false, message: "please give category properly" })
            else
                filter.category = requestData.category
        }
        if (requestData.subcategory) {
            if ((requestData.subcategory.length == 0) || !validate.isValidData(requestData.subcategory))
                return res.status(400).send({ status: false, message: "please give subcategory properly" })
            if (requestData.subcategory.length > 0) {
                let subcateGory = requestData.subcategory
                for (let i = 0; i < subcateGory.length; i++) {
                    if (!validate.isValidData (subcateGory[i] ))
                        return res.status(400).send({ status: false, message: "please give proper subcategory in the array" })
                }
            }
            else
                filter.subcategory = requestData.subcategory
        }
        if (requestData.userId) {
            if (!validate.isValidObjectId(requestData.userId))
                return res.status(400).send({ status: false, message: "please give proper userId" })
                else  filter.userId=requestData.userId

        }
        
        let allBook = await bookModel.find(filter)
            .select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, review: 1 })
            .sort({ title: 1 })
        if (allBook.length == 0)
            return res.status(404).send({ status: false, msg: "book not found" })

        res.status(200).send({ status: true, message: 'Sucess', data: allBook })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ===================================== GET /books ===================================== 

const deleteBookbyPath = async function (req, res) {
    try {
        let bookId = req.params.bookId
  
        if (!isValidObjectId(bookId))
            return res.status(400).send({ status: false, msg: `bookId ${id.bookId} is Invalid BookId` })

        let dToken = req.decodedtoken
        
        let user = await bookModel.findById({ _id: bookId }).select({ _id: 0, userId: 1, isDeleted: 1 })
        if (dToken.id != user.userId)
            return res.status(401).send({ status: false, message: "you are unauthorised" })
        if (user.isDeleted == true)
            return res.status(404).send({ status: false, message: "book not found" })
        let bookData = await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: { isDeleted: true } })
        console.log(bookData)
        res.status(200).send({ status: false, message: "book is deleted" })
    }
    catch (error) { res.status(500).send({ status: false, message: error.message }) }

}


// ===================================== PUT /books/:bookId ===================================== 


const updateBook = async function (req, res) {

    try {
        let data = req.body
        let id = req.params
        var details = {}
        console.log(details)
        //validating empty body
        if (!isValidRequestBody(data))
            return res.status(400).send({ status: false, msg: "Body cannot be empty" })

        //validatig bookId
        if (!isValidObjectId(id.bookId))
            return res.status(400).send({ status: false, msg: `bookId ${id.bookId} is Invalid BookId` })

        let bookId = await bookModel.findById(id.bookId)
        if (bookId.isDeleted == true) return res.status(404).send({ status: false, msg: "This Book is not Present" })
        if (!bookId)
            return res.status(404).send({ status: false, msg: "No such Book Exits" })

        //Validating title and  check Present in DB or Not
        if (data.title) {
            if (!isValidData(data.title))
                return res.status(400).send({ status: false, msg: `${data.title} is not a valid title` })
            if (!/^([a-zA-Z ]+)$/.test(data.title.trim())) {
                return res.status(400).send({ status: false, msg: `${data.title} is not a valid title` });
            }
            let titleCall = await bookModel.findOne({ title: data.title })
            if (titleCall) return res.status(400).send({ status: false, msg: `Book with name ${data.title}  is Already Present` })
            details.title = data.title.trim();
        }

        //validating excerpt is entered and valid
        if (data.excerpt) {
            if (!isValidData(data.excerpt)) {
                return res.status(400).send({ status: false, msg: `${data.excerpt} is not a valid excerpt` })
            }
            if (!/^([a-zA-Z\S ]+)$/.test(data.excerpt)) {
                return res.status(400).send({ status: false, msg: `${data.excerpt} is not a valid excerpt` });
            }
            details.excerpt = data.excerpt.trim();
        }

        //validating ISBN is and check Present in DB or Not
        if (data.ISBN) {
            if (!validator.isISBN(data.ISBN))
                return res.status(400).send({ status: false, msg: `${data.ISBN} is not a valid ISBN` })

            let ISBNCall = await bookModel.findOne({ ISBN: data.ISBN })
            if (ISBNCall) return res.status(400).send({ status: false, msg: `Book with ISBN  ${data.ISBN}  is Already Present` })
            details.ISBN = data.ISBN.trim();
        }

        //Date is in Valid Format Or Not
        if (data) {
            if (data.releasedAt !== moment().format("YYYY-MM-DD")) return res.status(400).send({ status: false, msg: "date format should be in YYYY-MM-DD" })
            details.releasedAt = data.releasedAt.trim();

        }

        let updatedata = await bookModel.findOneAndUpdate({ _id: id.bookId }, details, { new: true }).select({ __v: 0 })

        res.status(200).send({ status: true, message: 'Success', data: updatedata })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// const getBook = async function (req, res){
//     console.log("Controller ")
// }

module.exports = {getBookbyQuerry, createBook, , deleteBookbyPath}

//module.exports = {getBook}