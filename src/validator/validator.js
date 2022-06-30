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



const checker=function (name,email,mobile,collegeName){
    let missdata="";

    if (!isValid(name)) {
         missdata=missdata+"name"
      
    }
   if (!isValid(email)) {
        missdata=missdata+", "+"email"
       
    }
   if (!isValid(mobile)) {
        missdata=missdata+" , "+"mobile"
       
    }
    if(!collegeName){
        missdata=missdata+" , "+"collegeName"
        
    }
    if(missdata){
        return missdata+" is missing"
    }
    // if (!/^[a-z,',-]+(\s)[a-z,',-]+$/i.test(name)) {
    //     missdata=missdata+"Name is invalid " 
       
    // }

  
    if (!/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email)) {
        missdata=missdata+ "Email is invalid" 
      
    }

    

    if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile)) {
        missdata=missdata+ "Mobile number should be in valid format" 
        
    }

    return missdata;

}
module.exports = {checker ,isValid ,isValidrequestBody}
