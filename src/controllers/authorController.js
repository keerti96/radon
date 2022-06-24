const authorModel = require('../models/authorModel')

const validName = function (name) {
    const ret = !(/^[a-zA-Z ]{2,30}$/.test(name))
    return ret
}

const verifyPassword = function (password) {
    //var pw = document.getElementById("pswd").value;  
    //check empty password field  
    let msg
    if (password == "") {
        //document.getElementById("message").innerHTML = "**Fill the password please!"; 
        msg = "Fill the password please!"
        return msg;
    }

    //minimum password length validation  
    if (password.length < 5) {
        //document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";  
        msg = "Password length must be atleast 5 characters"
        return msg;
    }

    //maximum length of password validation  
    if (password.length > 15) {
        //document.getElementById("message").innerHTML = "**Password length must not exceed 15 characters";
        msg = "Password length must not exceed 15 characters"
        return msg;
    } else {
        return true;
    }
}

//-------------------------------------------CREATE AUTHOR-------------------------------------------------------
const createAuthor = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) res.status(400).send({ status: false, msg: "no data send in request" })

        const { fname } = data
        if (!fname) {
            return res.status(400).send({ status: false, message: "fname not recieved it is required" })
        }

        if (validName(fname)) {
            return res.status(400).send({ status: false, message: "first name should be valid " })

        }
        const { lname } = data
        if (validName(lname)) {
            return res.status(400).send({ status: false, message: "last name should be valid " })

        }
        const { title } = data
        if (!(['Mr', "Mrs", "Miss"].includes(title))) {
            return res.status(400).send({ status: false, msg: "title not valid : it should be Mr ,Mrs, Miss" })
        }

        const { email } = data
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "Email should be a valid email address" })

        }

        const { password } = data
        const result = verifyPassword(password)
        if (result != true) {
            return res.status(400).send({ status: false, message: result })
        }

        const savedData = await authorModel.create(data)
        res.status(201).send({ status: true, msg: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.verifyPassword=verifyPassword