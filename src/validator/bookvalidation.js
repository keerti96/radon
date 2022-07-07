const bookModel = require("../models/booksModel");
const userModel = require("../models/userModel");
const { isValidRequestBody, isValidData, isValidObjectId } = require("../validator/validation.js")
const validator = require('validator')
const moment = require('moment')

const checkCreate = function (req, res, next) {
    try{
    
        const requestBody = req.body

            if (!isValidRequestBody(requestBody)) {
                return res.status(400).send({ status: false, message: "Request body is empty!! Please provide the college details" })
            }

        const {} = requestBody;
        
        //check if each mandatory field is present in request body
        let missdata = "";

        if (!isValidData(title)) {
            missdata = missdata + "title"

        }
        if (!isValidData(name)) {
            missdata = missdata + " " + "name"

        }
        if (!isValidData(phone)) {
            missdata = missdata + " " + "phone"

        }
        if (!isValidData(email)) {
            missdata = missdata + " " + "email"

        }
        if (!isValidData(password)) {
            missdata = missdata + " " + "password"

        }

        if (missdata) {
            let message = missdata + " is missing  or not String type"
            return res.status(400).send({ status: false, msg: message })
        }

        //validating other constraints
        if (!(['Mr', "Mrs", "Miss"].includes(title))) {
            return res.status(400).send({ status: false, msg: "title not valid : it should be Mr ,Mrs, Miss" })
        }

        if (!name.match(/^[A-Z,a-z, ,]+$/)) {
            return res.status(400).send({ status: false, msg: " Name should be in valid format" })
        }

        if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone)) {
            return res.status(400).send({ status: false, msg: "Mobile number should be in valid format" })
        }
        if (!verifyEmail(email)) {
            return res.status(400).send({ status: false, msg: "Email format is invalid" })

        }


        const result = verifyPassword(password)
        if (result != true) {
            return res.status(400).send({ status: false, message: result })
        }
    
    //if all validations are correct then go to controller
        next()

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }  

}

/*
const bookvalidation = async function (req, res, next) {
    // try {
    let data = req.body;

    //validating empty body
    if (!isValidRequestBody(data))
        return res.status(400).send({ status: false, msg: "Body cannot be empty" })

    //validating title is entered and valid
    if (!isValidData(data.title))
        return res.status(400).send({ status: false, msg: `${data.title} is not a valid title` })
    if (!/^([a-zA-Z ]+)$/.test(data.title.trim())) {
        return res.status(400).send({ status: false, msg: " enter valid title in alphabets only " });
    }
    let title = await bookModel.findOne({title:data.title})
    
    if(title) return res.status(400).send({status: false, msg: "Book with this title is already"})

    //validating excerpt is entered and valid
    if (!isValidData(data.excerpt))
        return res.status(400).send({ status: false, msg: `${data.excerpt} is not a valid excerpt` })
    if (!/^([a-zA-Z\S ]+)$/.test(data.excerpt.trim())) {
        return res.status(400).send({ status: false, msg: "enter valid excerpt in alphabets only" });
    } 

    //validating userId is entered and valid
    if (!isValidObjectId(data.userId))
        return res.status(400).send({ status: false, msg: `${data.userId} is not a valid Object ID` })

    let user_id = await userModel.findById({ _id: data.userId });
    if (!user_id) {
        return res.status(400).send({ status: false, msg: "No such User  exsit" });
    }

    //validating ISBN is entere and valid
    if (!validator.isISBN(data.ISBN))
        return res.status(400).send({ status: false, msg: `${data.ISBN} is not a valid ISBN` })

    let checkISBN = await bookModel.find({ ISBN: data.ISBN });
    if (checkISBN.length !== 0) {
        return res.status(400).send({ status: false, msg: "plz enter new ISBN" });
    }


    //Validating category is entered and valid

    if (!isValidData(data.category))
        return res.status(400).send({ status: false, msg: `${data.category} is not a valid category` })
    if (!/^([a-zA-Z ]+)$/.test(data.category.trim())) {
        return res.status(400).send({ status: false, msg: " enter valid category in alphabets only" });
    }

    //validating subCategory is entered and valid
    if (typeof data.subcategory === "undefined" || data.subcategory === null)
        return res.status(400).send({ status: false, msg: `${data.subcategory} is not a valid subcategory` })
    if (data.subcategory.length == 0) {
        return res.status(400).send({ status: false, msg: "subcategory is not valid" });
    }
    // if(typeof data.subcategory !=="object")
    // return res.status(400).send({status:false,msg:"give subcategory in array only"})

    if (data.subcategory) {
        for (let i = 0; i < data.subcategory.length; i++) {
            if (data.subcategory[i] == 0) {
                return res.status(400).send({ status: false, msg: "subcategory should have atleast one alpha" });
            }

            if (!/^([a-zA-Z ]+)$/.test(data.subcategory[i])) {
                return res.status(400).send({ status: false, msg: " enter valid subcategory in alphabets only" });
            }
        }
    }

 
    if(!data.releasedAt){
        return res.status(400).send({status:false,msg:"releasedAt is not given"})
    }
   
    
    if(data.releasedAt !== "^\\d{4}-\\d{2}-\\d{2}$"){   
         if(data.releasedAt !== moment().format("YYYY-MM-DD")){
        return res.status(400).send({status:false,msg:"date format should be in YYYY-MM-DD"})
    

         }
    next()
}
}

*/

module.exports = bookvalidation