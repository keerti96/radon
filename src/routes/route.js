const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller")





router.post("/functionup/colleges", controller.createCollege )




module.exports = router;