const express =require('express');
const { createUrl } = require('../controllers/urlController');
const router=express.Router()



router.post('/url/shorten',createUrl)



























module.exports = router;