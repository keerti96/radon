const express =require('express');
const {createUrl,getUrl,flushw } = require('../controllers/urlController');
const {createUrlValidation}=require('../middleware/UrlValidation')
const router=express.Router()



router.post('/url/shorten',createUrlValidation,createUrl)
router.get('/:urlCode',getUrl)
router.put('/clearCache', flushw);


module.exports = router;