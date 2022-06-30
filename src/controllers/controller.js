const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validate = require("../validator/validator.js")
const createCollege = async function (req, res) {
    try {
        //<<----------Validation of request body parameters--------->>  
        const requestBody = req.body

        if (!validate.isValidrequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Request body is empty!! Please provide the college details" })
        }

      

        const { name, fullName, logoLink } = requestBody;

        let val = validate.checkerCollege(name, fullName, logoLink)
       

        if (val) {
            return res.status(400).send({ status: false, message: val })
        }
        requestBody.name = requestBody.name.toLowerCase().split(" ").join("");
        //----check if name is unique
        const nameCheck = await collegeModel.find({ name: name })
        if (nameCheck.length != 0) {
            return res.status(400).send({ status: false, message: "this name(abbr) already exists" })
        }


        //<----create a college document---->
        const savedData = await collegeModel.create(requestBody)
        return res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

//================================================ create intern data**===========================================================//
let internData = async function (req, res) {
    try {


        //validations starts
        if (!validate.isValidrequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide intern details" });
        }

        let { name, email, mobile, collegeName } = req.body

        

        let val = validate.checker(name, email, mobile, collegeName)
        if (val) {
            return res.status(400).send({ status: false, message: val })
        }

        collegeName = collegeName.toLowerCase();

        const isMobile = await internModel.findOne({ mobile: mobile });

        if (isMobile) {
            return res.status(400).send({ status: false, message: "Mobile number already registered" })
                ;
        }
        const emailUsed = await internModel.findOne({ email: email })
        if (emailUsed) {
            return res.status(400).send({ status: false, message: "Email is already registered" })

        }


        const doc = await collegeModel.findOne({ name: collegeName })
        if (!doc) {
            return res.status(404).send({ status: false, message: "collegeName is not registered" })
                ;
        }

        //validation ends
        let collegeId = doc._id
        const result = await internModel.create({ name, email, mobile, collegeId })
        res.status(201).send({ status: true, data: result })



    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


//=====================================================To get data of interns**======================================================//

let collegeDetails = async function (req, res)  {
    try {
        let query = req.query.collegeName
        
        let val = validate.checkerIntern(query)
        if (val) {
            return res.status(400).send({ status: false, message: val })
        }

      
        query=query.toLowerCase()

        let specificCollege = await collegeModel.findOne({ name: query })
        if (!specificCollege) {
            return res.status(400).send({ status: true, message: "No college exists with that name" });
        }
        let id = specificCollege._id.toString()
        let intern = await internModel.find({ collegeId: id, isDeleted: false }).select({
            _id: 1, name: 1,
            email: 1,
            mobile: 1
        })

        if (!validate.isValidrequestBody(intern)) {
            return res.status(400).send({ status: false, message: "no intern is regestered" });
        }

        let data = {                                             //new object 
            name: specificCollege.name,
            fullName: specificCollege.fullName,
            logoLink: specificCollege.logoLink,
            interns: intern                                   //array in intern
        }
        return res.status(200).send({ status: true, data: data })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}





module.exports = { createCollege, internData, collegeDetails }


