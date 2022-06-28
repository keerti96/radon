const collegeModel = require("../models/collegeModel")
// const internModel = require("../models/internModel")

const mongoose = require("mongoose")

// const isValidObjectId = function (objectId) {
//     return mongoose.Types.ObjectId.isValid(objectId)
// }

const isValidRequestBody = function(requestBody){
    return Object.keys(data).length > 0;
}


const createCollege = async function (req, res) {
    try{
        //<<----------Validation of request body parameters--------->>  
        const requestBody = req.body
        if (!isValidRequestBody(requestBody)){
            return res.status(400).send({ status: false, msg: "Request body is empty!! Please provide the college details" })
        }

        const savedData = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

module.exports = {createCollege}


