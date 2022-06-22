const timestamp = require('time-stamp')
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')
//--------------------------------------------CREATEBLOG-------------------------------------------------------------
const createBlog = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "please send the data" })
        authorid = await authorModel.findById(data.authorId)
        if (!authorid)
            return res.status(400).send({ status: false, msg: "enter a valid authorId" })//doubt
        const savedData = await blogModel.create(data)
        res.status(201).send({ status: true, msg: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//----------------------------------------------GETBLOG--------------------------------------------------------------

const getBlog = async function (req, res) {
    try {
        const check = req.query

        if (Object.keys(check).length == 0) {
            const getData = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }] }).populate('authorId')
            return res.status(200).send({ status: true, msg: getData })
        }
        else {
            const authorId = req.query.authorId
            const category = req.query.category
            const tag = req.query.tags
            const subcategory = req.query.subcategory
            const filter = {}
            if (authorId) {
                //do we have to check valid id or not
                filter.authorId = authorId
            }
            if (category) {
                filter.category = category
            }
            if (tag) {
                filter.tag = tag
            }
            if (subcategory) {
                filter.subcategory = subcategory
            }
            const savedData = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, filter] }).populate("authorId")
            res.status(200).send({ status: true, msg: savedData })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


//---------------------------------------------AUTHORLOGIN---------------------------------------------------------------

const authorLogin=async function(req ,res){
    try{
        const check = req.body
        if (Object.keys(check) == 0) {
            return res.status(400).send({ status: false, msg: "no credentials recieved in request" })
        }

    }
    catch(err){
        res.status(500).send({status:false,error:err.message})  
    }
}

//--------------------------------------------UPDATE BLOG-----------------------------------------------------------
const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        if (!blogId) {
            return res.status(400).send({ status: false, msg: "please send blogId" })
        }
        const validId = await blogModel.findById(blogId)
        if (!validId)
            return res.status(404).send({ status: false, msg: "plese send a valid blogId" })

        const check = req.body
        if (Object.keys(check) == 0) {
            return res.status(400).send({ status: false, msg: "no data recieved to update" })
        }
        const update = {}
        if (req.body.title) {
            update.title = req.body.title
        }
        if (req.body.body) {
            update.body = req.body.body
        }
        if (req.body.tags) {
            update.tags = req.body.tags
        }
        if (req.body.subcategory) {
            update.subcategory = req.body.subcategory
        }
        update.isPublished='true'
        const time = timestamp('YYYY/MM/DD:mm:ss')
        update.publishedAt=time
        const updateData = await blogModel.findOneAndUpdate({ _id: blogId }, update, { new: true })
        res.status(200).send({ status: true, msg: updateData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//-------------------------------------------DELETE-BY-ID-----------------------------------------------------------

const deleteById = async function (req, res) {
    try {
        const blogId = req.params.blogId
        if (!blogId) {
            return res.status(400).send({ status: false, msg: "please send blogId" })
        }
        const validId = await blogModel.findById(blogId)
        if (!validId)
            return res.status(404).send({ status: false, msg: "plese send a valid blogId" })
        if (validId.isDeleted === 'true')
            return res.status(404).send({ status: false, msg: "already deleted" })
        const time = timestamp('YYYY/MM/DD:mm:ss')
        const update = { isDeleted: true, deletedAt: time }
        const saveData = await blogModel.findOneAndUpdate({ _id: blogId }, update)
        res.status(200).send({ status: true, msg: "Deleted Sucessfully" })

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//-----------------------------------------------DELETEBLOG-------------------------------------------------

const deleteBlog = async function (req, res) {
    try {
       const check=req.query
       if(Object.keys(check).length==0){
           res.status(400).send({status:false,msg:"no data recieved in request"})
       }
       filter={}
       if(req.query.category){filter.category=req.query.category}
       if(req.query.authorId){filter.authorId=req.query.authorId}
       if(req.query.tags){filter.tags=req.query.tags}
       if(req.query.subcategory){filter.subcategory=req.query.subcategory}
      // if(req.query.is){filter.=req.query}
      const time = timestamp('YYYY/MM/DD:mm:ss')
      update={isDeleted:true,deletedAt:time}
      const saveData=await blogModel.updateMany(filter,update)
      res.status(200).send({ status: true, msg: "Deleted Sucessfully" })
}
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

// const deleteById=async function(req res){
//     try{

//     }
//     catch(err){
//         res.status(500).send({status:false,error:err.message})  
//     }
// }

module.exports.createBlog = createBlog
module.exports.deleteById = deleteById
module.exports.deleteBlog = deleteBlog
module.exports.getBlog = getBlog
module.exports.updateBlog=updateBlog
module.exports.authorLogin=authorLogin