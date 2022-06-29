const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller")





router.get("/functionup/colleges", controller.getCollege )




module.exports = router;