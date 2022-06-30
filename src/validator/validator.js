// const collegeModel = require("../models/collegeModel")
// const internModel = require("../models/internModel")
const mongoose = require("mongoose");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === 'null') return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidrequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}



const checker = function (name, email, mobile, collegeName) {
    let missdata = "";

    if (!isValid(name)) {
        missdata = missdata + "name"

    }
    if (!isValid(email)) {
        missdata = missdata + ", " + "email"

    }
    if (!isValid(mobile)) {
        missdata = missdata + " , " + "mobile"

    }
    if (!collegeName) {
        missdata = missdata + " , " + "collegeName"

    }
    if (missdata) {
        return missdata + " is missing"
    }
    // if (!/^[a-z,',-]+(\s)[a-z,',-]+$/i.test(name)) {
    //     missdata=missdata+"Name is invalid " 

    // }


    if (!/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email)) {
        missdata = missdata + "Email is invalid"

    }



    if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile)) {
        missdata = missdata + "Mobile number should be in valid format"

    }

    return missdata;

}
const checkerCollege = function (name, fullName, logoLink) {
    
    let missdata = "";
    if (!isValid(name)) {
        missdata = missdata + " name of college" 
    }

    if (!isValid(fullName)) {
        missdata = missdata +  "  fullName of college" 
    }

    if (!isValid(logoLink)) {
         missdata = missdata + " logoLink of college" 
    }
    if(missdata){return missdata +"  is missing"};
    //  if (/\d/.test(name)) {
    //     missdata=missdata+ " name cannot have numbers.   "
       
    //  }
    if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink)){
        return missdata = missdata +  " Please provide valid link" 
    }

    if (!name.match(/^[a-z,_,-]+$/)) {
        return  "Name should be in valid format"

    }
}

// const checkerIntern = function (query) {
//             //validation starts
//             if (!isValid(query)) {
//                 return "Invalid request parameters. Please provide intern details" ;
//             }
//             if (!query.match(/^[a-z,_,-]+$/)) {
//                 return "Name should be in valid format" ;
//             }
           
// }




module.exports = { checker, isValid, isValidrequestBody, checkerCollege }

