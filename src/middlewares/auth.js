const jwt = require("jsonwebtoken")
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')
const mongoose = require("mongoose")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

//<<------------------------------------------------AUTHENTICATION------------------------------------------------------------>>
const authentication = function (req, res, next) {
    try {
        const token = req.headers["X-Auth-Token"] || req.headers["x-auth-token"]
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token missing" })
        }
        const decodedtoken = jwt.verify(token, "##k&&k@@s")
        if (!decodedtoken) {

            return res.status(401).send({ status: false, msg: "Token invalid" })
        }

        req["x-api-key"] = token
        req.decodedtoken = decodedtoken
        next()


    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//<<-----------------------------------------------AUTHORIZATION----------------------------------------------->>
const authrization = async function (req, res, next) {
    try {
        const blogId = req.params.blogId
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: "blogId is not valid" })
        }
        const validBlog = await blogModel.findById(blogId)
        if (!validBlog)
            return res.status(404).send({ status: false, msg: "blog with thid blogid not found " })
        // comapre the logged in author's id and the author id for requested blog
        let ownerOfBlog = validBlog.authorId;
        //userId for the logged-in user
        let authorId = req.decodedtoken.id
        //userId comparision to check if the logged-in user is requesting for their own data
        if (ownerOfBlog != authorId)
            return res.status(403).send({ status: false, msg: 'Author logged in is not allowed to modify the requested blog data' })
        //req.isDeleted = validBlog.isDeleted;
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports.authentication = authentication
module.exports.authrization = authrization