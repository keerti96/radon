const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller")





router.post("/functionup/colleges", controller.createCollage )

// router.post("/functionup/interns", controller.createIntern)

// router.get("/functionup/collegeDetails", controller.getCOllageDetails)


module.exports = router;