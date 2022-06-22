const jwt = require("jsonwebtoken")

const authentication = function (req, res, next) {
    try {
        const token = req.headers["X-Auth-Token"] || req.headers["x-auth-token"]
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token missing" })
        }
        const decodedtoken = jwt.verify(token, "")
        if (!decodedtoken) {
            return res.status(401).send({ status: false, msg: "Token invalid" })
        }
        req["x-api-key"] = token
        next()


    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


const authrization = function (req, res, next) {
    try {


    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports.authentication = authentication
module.exports.authrization = authrization