const authorModel = require('../models/authorModel')

const validName = function (name) {
    const ret = !(/^[a-zA-Z ]{2,30}$/.test(name))
    return ret
}

const verifyPassword = function (password) {
  
    //check empty password field  
    let msg
    if (password == "") {
        
        msg = "Fill the password please!"
        return msg;
    }

    //minimum password length validation  
    if (password.length < 5) {
        
        msg = "Password length must be atleast 5 characters"
        return msg;
    }

    //maximum length of password validation  
    if (password.length > 15) {
        
        msg = "Password length must not exceed 15 characters"
        return msg;
    } else {
        return true;
    }
}

const checkchar=function(temp){
    let check=temp.trim()
     let len =check.length
     if(len==0){
         let msg="must contain characters other than spaces"
         return msg
     }
     return true
}
//<<-------------------------------------------CREATE AUTHOR---------------------------------------------------->>
const createAuthor = async function (req, res) {
    try {
//<<----------------------------------------Validation--------------------------------------------------------->>        
        const data = req.body
        if (Object.keys(data).length == 0) res.status(400).send({ status: false, msg: "no data send in request" })

        const { fname } = data
        if (!fname) {
            return res.status(400).send({ status: false, message: "fname not recieved it is required" })
        }

      let message=checkchar(fname)
        if(message!=true){
            return res.status(400).send({status:false,message:"fname  "+message})
        }

        if (validName(fname)) {
            return res.status(400).send({ status: false, message: "first name should be valid " })

        }

        const { lname } = data
        if (!lname) {
            return res.status(400).send({ status: false, message: "lname not recieved it is required" })
        }

        message=checkchar(lname)
        if(message!=true){
            return res.status(400).send({status:false,message:"lname  "+message})
        }
        
        if (validName(lname)) {
            return res.status(400).send({ status: false, message: "last name should be valid " })

        }
        const { title } = data

        if (!title) {
            return res.status(400).send({ status: false, message: "title not recieved it is required" })
        }

         message=checkchar(title)
        if(message!=true){
            return res.status(400).send({status:false,message:"title  "+message})
        }

        if (!(['Mr', "Mrs", "Miss"].includes(title))) {
            return res.status(400).send({ status: false, msg: "title not valid : it should be Mr ,Mrs, Miss" })
        }

        const { email } = data

        if (!email) {
            return res.status(400).send({ status: false, message: "email not recieved it is required" })
        }

         message=checkchar(email)
        if(message!=true){
            return res.status(400).send({status:false,message:"email  "+message})
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "Email should be a valid email address" })

        }

        const { password } = data

        if (!password) {
            return res.status(400).send({ status: false, message: "password not recieved it is required" })
        }

         message=checkchar(password)
        if(message!=true){
            return res.status(400).send({status:false,message:"password  "+message})
        }

        const result = verifyPassword(password)
        if (result != true) {
            return res.status(400).send({ status: false, message: result })
        }
//<<------------------------------------------creating Author --------------------------------------------------->>
        const savedData = await authorModel.create(data)
        res.status(201).send({ status: true, msg: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.verifyPassword=verifyPassword
module.exports.checkchar=checkchar