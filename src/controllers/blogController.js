const timestamp = require('time-stamp')
const jwt = require("jsonwebtoken")
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')
const mongoose = require("mongoose")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const verifyPassword = require("../controllers/authorController")
const checkchar = require("../controllers/authorController")
const checkarray = function (arr) {
    let msg = 0
    let flag = 0
    if (arr.length == 0) {
        let msg1 = " array must contain must contain some value"
        return msg1
    }

    arr.forEach(element => {
        if (element.trim().length == 0)

            flag = 1

    });
    if (flag == 1) {
        msg = "array element must contain characters other than spaces"
        return msg
    }

    return true

}

//--------------------------------------------CREATEBLOG-------------------------------------------------------------
const createBlog = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "please send the data" })


        const { title, body, authorId, tags, category, subcategory } = data
        if (!title) {
            return res.status(400).send({ status: false, msg: "Title not recieved it is required" })
        }

        let message = checkchar.checkchar(title)
        if (message != true) {
            return res.status(400).send({ status: false, message: "title  " + message })
        }

        if (!body) {
            return res.status(400).send({ status: false, msg: "body not recieved it is required" })
        }

        message = checkchar.checkchar(body)
        if (message != true) {
            return res.status(400).send({ status: false, message: "body  " + message })
        }

        if (!authorId) {
            return res.status(400).send({ status: false, msg: "authorId not recieved it is required" })
        }

        message = checkchar.checkchar(authorId)
        if (message != true) {
            return res.status(400).send({ status: false, message: "authorId  " + message })
        }

        if (!isValidObjectId(authorId)) {
            return res.status(400).send({ status: false, msg: "AuthorId is not valid" })
        }
        const validId = await authorModel.findById(data.authorId)
        if (!validId)
            return res.status(404).send({ status: false, msg: "No Author with this exist" })

        if (!category) {
            return res.status(400).send({ status: false, msg: "category not recieved it is required" })
        }

        message = checkchar.checkchar(category)
        if (message != true) {
            return res.status(400).send({ status: false, message: "category  " + message })
        }

        if (tags) {

            if (typeof (tags) == 'string') {
                message = checkchar.checkchar(tags)

                if (message != true) {
                    return res.status(400).send({ status: false, message: "tags " + message })
                }

            }
            else {

                message = checkarray(tags)
                if (message != true) {
                    return res.status(400).send({ status: false, message: "tags " + message })
                }
            }
        }

        if (subcategory) {
            if (typeof (subcategory) == 'string') {
                message = checkchar.checkchar(subcategory)
                if (message != true) {
                    return res.status(400).send({ status: false, message: "subcategory " + message })
                }

            }
            else {
                message = checkarray(subcategory)
                if (message != true) {
                    return res.status(400).send({ status: false, message: "subcategory  " + message })
                }
            }
        }

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
        if (Object.keys(check).length == 0) {
            return res.status(400).send({ status: false, msg: "no credentials recieved in request" })
        }
        const email = req.body.email
        if (!email) {
            return res.status(401).send({ status: false, msg: "no email recieved in request" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(401).send({ status: false, message: "Email should be a valid email address" })
        }

        const password = req.body.password
        let message = checkchar.checkchar(password)
        if (message != true) {
            return res.status(400).send({ status: false, message: "password  " + message })
        }
        const result = verifyPassword.verifyPassword(password)
        if (result != true) {
            return res.status(401).send({ status: false, msg: result })
        }
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
        // console.log("hello")
        const blogId = req.params.blogId
        // console.log(blogId)
        // if (!blogId) {
        //     return res.status(400).send({ status: false, msg: "please send blogId" })//doubt
        // }
        // if (!isValidObjectId(blogId)) {
        //     return res.status(400).send({ status: false, msg: "blogId is not valid" })
        // }
        const validId = await blogModel.findById(blogId)
        if (!validId)
            return res.status(404).send({ status: false, msg: "blog of this id not found" })
       
        const check = req.body
        if (Object.keys(check).length == 0) {
            return res.status(400).send({ status: false, msg: "no data recieved to update" })
        }

        let { title, body, tags, subcategory } = check
        const update = {}
        
        if (title) {
            let message = checkchar.checkchar(title)
            if (message != true) {
                return res.status(400).send({ status: false, message: "title  " + message })
            }
            update.title = title
        }
        
        if (body) {
            let message = checkchar.checkchar(body)
            if (message != true) {
                return res.status(400).send({ status: false, message: "body  " + message })
            }
            update.body = body
        }

        
        if(tags){
            let message = checkchar.checkchar(tags)
            if (message != true) {
                return res.status(400).send({ status: false, message: "tags  " + message })
            }
        }
       
       
        if(subcategory){
            let message = checkchar.checkchar(subcategory)
            if (message != true) {
                return res.status(400).send({ status: false, message: "subcategory  " + message })
            }
        }
        
        update.isPublished = 'true'
        const time = Date.now('YYYY/MM/DD:mm:ss')
        update.publishedAt = time
        const updateData = await blogModel.findOneAndUpdate({ _id: blogId }, { $push: { subcategory: subcategory, tags: tags }, $set: update }, { new: true })
        console.log(updateData)
        if (!updateData) {
            return res.status(404).send({ status: false, msg: " Record not updated " })//doubt
        }
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

        const validId = await blogModel.findById(blogId)

        if (validId.isDeleted === 'true')
            return res.status(404).send({ status: false, msg: "already deleted" })

        //const time = timestamp('YYYY/MM/DD:mm:ss')
        const time = Date.now('YYYY/MM/DD:mm:ss')
        const update = { isDeleted: true, deletedAt: time }

        const saveData = await blogModel.findOneAndUpdate({ _id: blogId }, update)
        // if(!saveData){
        //     return res.status(400).send({status:false,msg:" Record not updated "})//doubt
        // }
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
        const { category, authorId, tags, subcategory,isPublished} = check
        const filter = {}
        filter.authorId = req.authorId
        filter.isDeleted = false
        if (category) { filter.category = category }
        if (authorId) {
            if (!isValidObjectId(authorId)) {
                return res.status(400).send({ status: false, msg: "not valid authorId" })
            }
            if (await authorModel.findById(authorId))
                filter.authorId = authorId
            else
                res.status(404).send({ status: false, msg: "author of this id not found" })
        }
        if (tags) {
            filter.tags = tags
        }
        if (subcategory) {
            filter.subcategory = subcategory
        }
        if(isPublished){
            filter.isPublished=isPublished
        }
        const time = Date.now('YYYY/MM/DD:mm:ss')

        const update = { isDeleted: true, deletedAt: time }
        const saveData = await blogModel.updateMany(filter, update)
        if (saveData.modifiedCount == 0) {
            return res.status(404).send({ status: false, msg: "resource to be deleted not found " })//doubt
        }
        //console.log(saveData)
        res.status(200).send({ status: true, msg: "Deleted Sucessfully" })
    }
    catch (err) {
        console.log(err)
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