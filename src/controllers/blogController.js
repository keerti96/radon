const timestamp=require('time-stamp')
//const timestamp = require('time-stamp')
const authorModel=require('../models/authorModel')
const blogModel=require('../models/blogModel')
//--------------------------------------CREATEBLOG-------------------------------------
const createBlog=async function(req,res){
    try{
        const data=req.body
        if(Object.keys(data).length == 0)
       return res.status(400).send({status:false,msg:"please send the data"})
        authorid=await authorModel.findById(data.authorId)
        if(!authorid)
        return res.status(400).send({status:false,msg:"enter a valid authorId"})//doubt
        const savedData=await blogModel.create(data)
        res.status(201).send({status:true,msg:savedData})
    }
    catch(err){
        res.status(500).send({status:false,error:err.message})
    }
}

//----------------------------------------GETBLOG----------------------------------------------------------

const getBlog=async function(req, res){
    try{console.log(req.query)
        const check=req.query

        if(Object.keys(check).length==0){
            const getData=await blogModel.find({ $and: [{isDeleted:false},{isPublished:true}]}).populate('authorId')
            return res.status(200).send({status:true,msg:getData})
       }
        const authorId=req.query.authorId
        const category=req.query.category
        const tag=req.query.tags
        const subcategory=req.query.subcategory
        const filter={}
       if(authorId){
          filter.authorId=authorId
       }
       if(category){
           filter.category=category
       }
    //    if(tag){
    //        filter.tag
    const savedData=await blogModel.find({ $and: [{isDeleted:false},{isPublished:true},filter]}).populate("Author")
       }
    catch(err){
        res.status(500).send({status:false,error:err.message})  
    }
}



const deleteById=async function(req, res){
    try{
        const blogId=req.params.blogId
        if(!blogId){
            return res.status(400).send({status:false,msg:"please send blogId"})
        }
        const validId=await blogModel.findById(blogId)
        if (!validId)
        return res.status(404).send({status:false,msg:"plese send a valid blogId"})
        if(validId.isDeleted==='true')
       return res.status(404).send({status:false,msg:"already deleted"})
        const time = toString(timestamp('YYYY/MM/DD:mm:ss'))
        const update={isDeleted:true,deletedAt:time}
        const saveData=await blogModel.findOneAndUpdate({_id:blogId},update)
        res.status(200).send({status:true,msg:"Deleted Sucessfully"})
        
    }
    catch(err){
        res.status(500).send({status:false,error:err.message})  
    }
}

const deleteBlog=async function(req, res){
    try{


    }
    catch(err){
        res.status(500).send({status:false,error:err.message})  
    }
}

// const deleteById=async function(req res){
//     try{

//     }
//     catch(err){
//         res.status(500).send({status:false,error:err.message})  
//     }
// }
 
module.exports.createBlog=createBlog
module.exports.deleteById=deleteById
module.exports.deleteBlog=deleteBlog
module.exports.getBlog=getBlog