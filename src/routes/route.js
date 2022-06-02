const express = require('express');
const externalModule1 = require('../logger/logger')
const externalModule2 = require('../util/helper')
const externalModule3 = require('../validator/formatter')
//in the above 3 import statements, we have imported 3 external modules from different folders


const router = express.Router();

router.get('/test-me', function (req, res) {
    //call Module 1 functions 
    externalModule1.welcome()

    //call Module 2 functions 
    externalModule2.printDate()
    externalModule2.printMonth()
    externalModule2.getBatchInfo()


    //call Module 3 functions 
    externalModule3.trim();
    externalModule3.changeToLowerCase()
    externalModule3.changeToUpperCase()

    res.send('My first Node JS assignment!')
});

module.exports = router;
