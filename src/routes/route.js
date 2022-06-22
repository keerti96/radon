const express = require('express');
const router = express.Router();
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const mw=require("../middlewares/auth")

//----------------------------------------------API USED IN THE PROJECT---------------------------------------------------

//----------------------------------------------CREATE AUTHOR API----------------------------------------------------
router.post('/authors',authorController.createAuthor)

//----------------------------------------------CREATE BLOG API-----------------------------------------------------
router.post('/blogs',blogController.createBlog)

//----------------------------------------------GET BLOG API-------------------------------------------------------
router.get('/blogs',blogController.getBlog)

//--------------------------------------------UPDATE BLOG API-------------------------------------------------------
router.put('/blogs/:blogId',blogController.updateBlog)

//--------------------------------------------DELETE BLOG API-------------------------------------------------------
router.delete('/blogs/:blogId',blogController.deleteById)
router.delete('/blogs',blogController.deleteBlog)

//---------------------------------------------AUTHOR LOGIN API------------------------------------------------------
router.post('/login',blogController.authorLogin)
module.exports = router;