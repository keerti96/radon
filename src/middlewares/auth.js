const jwt=require("jsonwebtoken")

const authentication=function(req,res,next){
    try{

    }
    catch(err){
        res.status(500).send({status:false,error:err.message})
    }
}


const authrization=function(req,res,next){
    try{

    }
    catch(err){
        res.status(500).send({status:false,error:err.message})
    }
}


module.exports.authentication=authentication
module.exports.authrization=authrization