const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const { authentication, authorization } = require('../middlewares/auth');
const validateUser = require("../validator/uservalidation.js")




router.post("/register", validateUser.checkCreate , userController.createUser )

router.post("/login", validateUser.checkLogin , userController.userLogin )

router.get("/books", authentication, authorization, bookController.getBook)

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})



module.exports = router;