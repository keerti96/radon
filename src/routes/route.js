const express = require('express');
const router = express.Router();
const bookController= require("../controllers/bookController")

router.post("/createBook",bookController.createBook)
router.post("/createAuthor",bookController.createAuthor)
router.get("/getbook",bookController.getbook)
router.get("/getAuthorName",bookController.getAuthorName)
router.get("/getAuthor",bookController.getAuthor)
router.get("/getBooksById",bookController.getBooksById)

module.exports = router