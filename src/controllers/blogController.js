const timestamp = require('time-stamp')
const jwt = require("jsonwebtoken")
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError')
const mongoose = require("mongoose")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

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
        const filter = {}
        filter.isDeleted = false
        filter.isPublished = true
        const { authorId, category, tags, subcategory } = check

        if (authorId) {
            if (!isValidObjectId(authorId)) {
                return res.status(400).send({ status: false, msg: "not valid authorId" })
            }
            if (await authorModel.findById(authorId))
                filter.authorId = authorId
            else
                res.status(404).send({ status: false, msg: "author of this id not found" })
        }
        if (category) {
            filter.category = category
        }
        if (tags) {
            filter.tags = tags
        }
        if (subcategory) {
            filter.subcategory = subcategory
        }

        const savedData = await blogModel.find(filter).populate("authorId")
        if (Object.keys(savedData).length == 0) {
            return res.status(404).send({ status: false, msg: "no record found" })
        }
        return res.status(200).send({ status: true, msg: savedData })

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


//---------------------------------------------AUTHORLOGIN---------------------------------------------------------------

const authorLogin = async function (req, res) {
    try {
        const check = req.body
        if (Object.keys(check) == 0) {
            return res.status(400).send({ status: false, msg: "no credentials recieved in request" })
        }
        const email = req.body.email
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                res.status(400).send({ status: false, message: "Email should be a valid email address" })
                return}
        const password = req.body.password
        const getData = await authorModel.findOne({ email: email, password: password })
        if (!getData) {
            return res.status(401).send({ status: false, msg: "Incorrect email or password" })
        }
        const token = jwt.sign({ id: getData._id }, "##k&&k@@s")
        res.status(200).send({ status: true, token: token })

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//--------------------------------------------UPDATE BLOG-----------------------------------------------------------
const updateBlog = async function (req, res) {
    try {
        const blogId = req.params
        console.log(blogId)
        if (!blogId) {
            return res.status(400).send({ status: false, msg: "please send blogId" })
        }
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: "blogId is not valid" })
        }
        const validId = await blogModel.findById(blogId)
        if (!validId)
            return res.status(404).send({ status: false, msg: "blog of this id not found" })

        const check = req.body
        if (Object.keys(check).length == 0) {
            return res.status(400).send({ status: false, msg: "no data recieved to update" })
        }

        const { title, body, tags, subcategory } = check
        const update = {}
        if (title) {
            update.title = title
        }
        if (body) {
            update.body = body
        }
        update.isPublished = 'true'
        const time = timestamp('YYYY/MM/DD:mm:ss')
        update.publishedAt = time
        const updateData = await blogModel.findOneAndUpdate({ _id: blogId }, { $push: { subcategory: subcategory, tags: tags }, $set: update }, { new: true })
        res.status(200).send({ status: true, msg: updateData })
    }
    catch (err) {
        console.log(err)
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
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: "blogId is not valid" })
        }
        const validId = await blogModel.findById(blogId)
        if (!validId)
            return res.status(404).send({ status: false, msg: "blog of this Id not found" })
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
        const check = req.query
        if (Object.keys(check).length == 0) {
            res.status(400).send({ status: false, msg: "no data recieved in request" })
        }

        const {category,authorId,tags,subcategory}=check

        const filter = {}
        if (category) 
        { filter.category = req.query.category }
        if (authorId) 
        {
            if (!isValidObjectId(authorId)) {
                return res.status(400).send({ status: false, msg: "not valid authorId" })
            }
            if (await authorModel.findById(authorId))
                filter.authorId = authorId
            else
                res.status(404).send({ status: false, msg: "author of this id not found" })
         }
        if (tags) { filter.tags = req.query.tags }
        if (subcategory) { filter.subcategory = req.query.subcategory }
     
        const time = timestamp('YYYY/MM/DD:mm:ss')
        const update = { isDeleted: false, deletedAt: time }
        const saveData = await blogModel.updateMany({$or:[filter]}, update)
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

// if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
//     res.status(400).send({ status: false, message: "Email should be a valid email address" })
//     return
// }


module.exports.createBlog = createBlog
module.exports.deleteById = deleteById
module.exports.deleteBlog = deleteBlog
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.authorLogin = authorLogin