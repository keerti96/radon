const authorModel = require('../models/authorModel')

const validName=function(name){
   
    const ret=!(/^[a-zA-Z ]{2,30}$/.test(name))
    return ret
}

//-------------------------------------------CREATE AUTHOR-------------------------------------------------------
const createAuthor = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) res.status(400).send({ status: false, msg: "no data send in request" })
       
        const {fname} = data
        if (validName(fname)) {
            return res.status(400).send({ status: false, message: "first name should be  valid " })
           
        }
        const {lname} = data
        if (validName(lname)) {
            return res.status(400).send({ status: false, message: "last name should be valid " })
            
        }
        const {title}=data
        if(!(['Mr',"Mrs","Miss"].includes(title))){
            return res.status(400).send({status:false,msg:"title not valid"})
        }

        const email = req.body.email
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "Email should be a valid email address" })
            
        }
        const savedData = await authorModel.create(data)
        res.status(201).send({ status: true, msg: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createAuthor = createAuthor