
const express = require('express');
const router = express.Router();
const bookModel= require("../models/bookModel.js")
const bookController= require("../controllers/bookController")


router.post("/createBook", bookController.createBook)
router.get("/allBooksList", bookController.allBooksList)
router.post("/yearDetails", bookController.yearDetails)
router.post("/particularBooks", bookController.particularBooks)
router.get("/priceDetails", bookController.priceDetails)
router.get("/randomBooks", bookController.randomBooks)

module.exports = router;