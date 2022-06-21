const authorModel=require('../models/authorModel')

const createAuthor=async function(req,res){
    try{
    const data=req.body
    if(!data)res.status(400).send({status:false,msg:"please send the data"})
    const savedData=await authorModel.create(data)
    res.status(201).send({status:true,msg:savedData})
    }
    catch(err){
        res.status(500).send({status:false,error:err.message})
    }
}
 
module.exports.createAuthor=createAuthor