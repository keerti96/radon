const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
// const internModel = require("../models/internModel")

const createCollege = async function (req, res) {
    try {
        //<<----------Validation of request body parameters--------->>  
        const requestBody = req.body
        console.log(requestBody)

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Request body is empty!! Please provide the college details" })
        }

        const savedData = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

//================================================**Post Api : To create intern data**===========================================================//
let internData = async  (req, res) =>{
    try {
        const { name, email, mobile, collegeName } = req.body

         //validations starts
        if (!isValidrequestBody(req.body)) {
            res.status(400).send({ status: false, message: "Invalid request parameters. Please provide intern details" })
            return;
        }

        if (!isValid(name)) {
            res.status(400).send({ status: false, message: "Name is required" })
            return;
        }
        if (!/^[a-z,',-]+(\s)[a-z,',-]+$/i.test(name)) {
            res.status(400).send({ status: false, message: "Name should be in valid format" })
            return;
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, message: "email is required" })
            return;
        }
        if (!/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email)) {
            res.status(400).send({ status: false, message: "Email should be in valid format" })
            return;
        }

        const emailUsed = await internModel.findOne({ email: email })
        if (emailUsed) {
            res.status(400).send({ status: false, message: "Email is already registered" })
            return;
        }

        if (!isValid(mobile)) {
            res.status(400).send({ status: false, message: "Number is required" })
            return;
        }
        if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile)) {
            res.status(400).send({ status: false, message: "Mobile number should be in valid format" })
            return;
        }

        const isMobile = await internModel.findOne({ mobile: mobile });

        if (isMobile) {
            res.status(400).send({ status: false, message: "Mobile number already registered" })
            return;
        }

        if(!collegeName){
            res.status(400).send({ status: false, message: "collegeName is required" })
            return;

        }
        
        const doc = await collegeModel.findOne({name:collegeName})
        if(!doc){
            res.status(400).send({ status: false, message: "collegeName is not registered" })
            return;
        }

        //validation ends
        let collegeId=doc._id 
        const result = await internModel.create({name,email, mobile,collegeId})
        res.status(201).send({ status: true, data: result })
        


    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


//=====================================================**Get Api : To get data of interns**======================================================//

let collegeDetails = async  (req, res) => {
    try {
        let query = req.query.collegeName

        //validation starts
        if (!isValid(query)) {
            res.status(400).send({ status: false, message: "Invalid request parameters. Please provide intern details" })
            return;
        }
        if (!query.match(/^[a-z]+$/)) {
            res.status(400).send({ status: false, message: "Name should be in valid format" })
            return;
        }
        let specificCollege = await collegeModel.findOne({ name: query })
        if (!specificCollege) {
            res.status(400).send({ status: true, message: "No college exists with that name" })
            return;
        }

        let id = specificCollege._id.toString()
        let intern = await internModel.find({ collegeId: id, isDeleted: false })

        if(!isValidrequestBody(intern)){
            res.status(400).send({status:false, message: "no intern is regestered"})
            return;
        }
        
        //validations ends 
        let data = {                                             //new object 
            name: specificCollege.name,
            fullName: specificCollege.fullName,
            logoLink: specificCollege.logoLink,
            interests: intern                                   //array in intern
        }
        return res.status(200).send({ status: true, data: data })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}




module.exports = { createCollege,internData,collegeDetails }


