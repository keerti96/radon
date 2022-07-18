const express =require('express');
const {createUrlValidation, createUrl,getUrl } = require('../controllers/urlController');
const router=express.Router()



router.post('/url/shorten',createUrlValidation,createUrl)
router.get('/:urlCode',getUrl)



module.exports = router;