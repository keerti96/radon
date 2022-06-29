const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
// const internModel = require("../models/internModel")

const getCollege = async function (req, res) {
    try {
        let filters = req.query.name
       
            let collegeDetails=await collegeModel.find({name:filters})
            if (!collegeDetails ){
                return res.status(404).send({ status: false, msg: "No college found" })
            }
          
        let internsDetails=await internModel.find({collegeId:collegeDetails.id})
        if(Object.keys(internsDetails)==0){
            return res.status(404).send({status:false,msg:"No interns found"})
        }
        let interns=[internsDetails];
        collegeDetails.interns=interns;
        res.status(200).send({data:collegeDetails})
        
        

            // let filteredCollege = await collegeModel.find(filters)
            // if (filteredCollege.length === 0) return res.status(404).send({ status: false, msg: "No such data available" })
            // else return res.status(200).send({ status: true, data: filteredCollege })
        
    }
    
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

// const isValidObjectId = function (objectId) {
//     return mongoose.Types.ObjectId.isValid(objectId)
// }

const isValidRequestBody = function (requestBody){
    return Object.keys(requestBody).length > 0;
}


const createCollege = async function (req, res) {
    try{
        //<<----------Validation of request body parameters--------->>  
        const requestBody = req.body
        console.log(requestBody)

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


module.exports.getCollege= getCollege;