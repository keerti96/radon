const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller")




router.post("/functionup/colleges", controller.createCollege )

router.post("/functionup/interns", controller.internData )

router.get("/functionup/collegeDetails", controller.collegeDetails )



module.exports = router;