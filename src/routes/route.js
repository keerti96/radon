const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller")




router.post("/functionup/colleges", controller.createCollege )

router.post("/functionup/interns", controller.internData )

router.get("/functionup/collegeDetails", controller.collegeDetails )

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})



module.exports = router;