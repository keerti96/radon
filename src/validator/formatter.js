const stringToFormat = "String to be Formatted"

const trim = function(){
    console.log("After Trim ==>", stringToFormat.trim())
}


const changeToLowerCase = function(){
    console.log("Lower case: ", stringToFormat.toLowerCase() )
}

const changeToUpperCase = function(){
    console.log("Upper case: ", stringToFormat.toUpperCase() )
}

module.exports.trim = trim;
module.exports.changeToLowerCase = changeToLowerCase;
module.exports.changeToUpperCase = changeToUpperCase;