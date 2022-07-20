const urlModel = require("../models/urlModel")
const shortId = require("shortid")
//const valid_url = require("valid-url")
const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
    10941,
    "redis-10941.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("qowpCsuHOkS7GDu5AnHgsP19nuxBFRGv", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

const isValidRequestBody = function (requestBody) {
    if (Object.keys(requestBody).length == 0) return false;
    return true
}


//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


const isValidData = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value !== "string") return false;
    if (typeof value === "string" && value.trim().length == 0) return false;
    return true;
}

function isUrl(x){
    const regEx = /^\s*http[s]?:\/\/([w]{3}\.)?[a-zA-Z0-9]+\.[a-z]{2,3}(\.[a-z]{2})?(\/[\w\-!:@#$%^&*()+=?\.]*)*\s*$/;
    return regEx.test(x)
}


const createUrlValidation = async function (req, res, next) {


    let data = req.body;

    let { longUrl } = data
    // Validating empty body
    if (!isValidRequestBody(data))
        return res.status(400).send({ status: false, msg: "Body cannot be empty" });

    if (!isValidData(longUrl))
        return res.status(400).send({ status: false, msg: "Enter a valid longUrl format" });

     if(!isUrl(longUrl)) return res.status(400).send({status:false, message:"enter a valid URL"});  
    // if(!valid_url.isUri(longUrl))
    //     return res.status(400).send({ status: false, msg: "Enter a valid longUrl" });
    //     console.log("url is correct ")


    ///(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

    // }
    // if (longUrl.match("[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")) {
    //     res.status(400).send({ status: false, message: "Invalid URL!! Please ensure format of url!" });
    // }
    next()
}





const createUrl = async function (req, res) {
    try {
        const longUrl = req.body.longUrl;
        const baseUrl = "http://localhost:3000"


        const urlCode = shortId.generate().toLowerCase();

        let cahcedProfileData = await GET_ASYNC(`${longUrl}`)
        if (cahcedProfileData) {
          return  res.status(200).send({status:false,message:"LongUrl is already  present",data:cahcedProfileData})
       }else{
        let urlData = await urlModel.findOne({ longUrl: longUrl }).select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 });
        //console.log(urlData)
        if (urlData) {
            await SET_ASYNC(`${longUrl}`, JSON.stringify(urlData))
            return res.status(400).send({ status: true, message:"This longUrl is already present ",data: urlData })
        }

        const shortUrl = baseUrl + "/" + urlCode;
        const input = { longUrl: longUrl, shortUrl: shortUrl, urlCode: urlCode };

        urlData = await urlModel.create(input);

        const displayData = { longUrl: urlData.longUrl, shortUrl: urlData.shortUrl, urlCode: urlData.urlCode }

        await SET_ASYNC(`${longUrl}`, JSON.stringify(displayData))

       

        return res.status(201).send({ status: true, data: displayData });
    }
    }
    catch (err) {
      return  res.status(500).send({ status: false, error: err.message })
    }
}

// const fetchAuthorProfile = async function (req, res) {
//     let cahcedProfileData = await GET_ASYNC(`${req.params.authorId}`)
//     if (cahcedProfileData) {
//         res.send(cahcedProfileData)
//     } else {
//         let profile = await authorModel.findById(req.params.authorId);
//         await SET_ASYNC(`${req.params.authorId}`, JSON.stringify(profile))
//         res.send({ data: profile });
//     }

// };

const getUrl = async function (req, res) {
    try {
        let urlCode = req.params.urlCode;
        let cahcedProfileData = await GET_ASYNC(`${req.params.urlCode}`)
        if (cahcedProfileData) {
             //console.log('From cache')
           return  res.send(cahcedProfileData)
        }
        else {
            let urlData = await urlModel.findOne({ urlCode: urlCode });
            console.log(urlData)
            await SET_ASYNC(`${req.params.urlCode}`, JSON.stringify(urlData))

            if (!urlData) {
               return  res.status(404).send({ status: false, message: "urlCode not found!" });
            }

            console.log("Redirecting to the url!!")
            return res.status(302).redirect(urlData.longUrl);


        }
    }
    catch (err) {
           return  res.status(500).send({ status: false, error: err.message })
        }
    

}



module.exports = { createUrlValidation, createUrl, getUrl }