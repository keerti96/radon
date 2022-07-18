const urlModel = require("../models/urlModel")
const shortId =require("shortid")
const valid_url=require("valid-url")

const isValidRequestBody = function (requestBody) {
    if (Object.keys(requestBody).length == 0) return false;
    return true
}

const isValidData = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value !== "string") return false;
    if (typeof value === "string" && value.trim().length == 0) return false;
    return true;
}

const createUrlValidation = async function (req, res, next) {


    let data = req.body;

    let { longUrl } = data
    // Validating empty body
    if (!isValidRequestBody(data))
        return res.status(400).send({ status: false, msg: "Body cannot be empty" });

    if (!isValidData(longUrl))
        return res.status(400).send({ status: false, msg: "Enter a valid longUrl format" });

    // if(!valid_url.isUri(longUrl))
    //     return res.status(400).send({ status: false, msg: "Enter a valid longUrl" });
    //     console.log("url is correct ")

        // if(longUrl){
        //     /^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#]\\S*)?$/i.test(longUrl)
        //     return res.status(400).send({ status: false, msg: "Enter a valid longUrl" })
        // }
        if(longUrl.match("[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")){
            res.status(400).send({status: false, message: "Invalid URL!! Please ensure format of url!"});
        }
    next()
}


const createUrl = async function (req, res) {
    try {
        let data = req.body;
        let urlCode=shortId.generate().toLowerCase()
        let shortUrl="http://localhost:3000/" + urlCode
        data.urlCode=urlCode
        data.shortUrl=shortUrl
        let savedData = await urlModel.create(data);

        let urlData = await urlModel.findOne({longUrl: data}).select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 });
        if (urlData) {
            return res.status(200).send({ status: true, data: urlData })
        }
        if (!urlData.urlCode) {
            return res.status(404).send({ status: false, msg:" urlCode not present " })
        }
        if (!urlData.shortUrl) {
            return res.status(404).send({ status: false, msg:" shortUrl not present " })
        }
        //res.status(201).send({ status: true, data: savedData });
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

    const getUrl = async function (req, res) {
        try {
    
            let urlCode = req.params.urlCode;
            if(urlCode.length==0){
                return res.status(400).send({status: false, msg: "Enter urlCode in path params" });
            }
            let urlData = await urlModel.findOne({ urlCode: urlCode });
    
            if (!urlData) {
                res.status(404).send({ status: false, message:"urlCode not found!"});
            }
    
            console.log("Redirecting to the url!!")
            return res.status(302).redirect(urlData.longUrl);
    
    
        }
        catch (err) {
            res.status(500).send({ status: false, error: err.message })
        }
    }





module.exports = { createUrlValidation, createUrl,getUrl }