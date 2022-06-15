const express = require('express');
const router = express.Router();
//const bookController= require("../controllers/bookController")

const mid = require('../middleware/middleware1')


router.get("/createUse", mid.details) // bookController.getDetails )

module.exports = router;

/*
router.post("/createBook",bookController.createBook)
router.post("/createAuthor",bookController.createAuthor)
router.get("/getBooks",bookController.getBooks)
router.get("/getAuthorName",bookController.getAuthorName)
router.get("/getAuthor",bookController.getAuthor)

//additional questions
router.get("/getBooksById",bookController.getBooksById)
*/


