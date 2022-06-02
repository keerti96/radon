const printDate = function(){

    console.log(new Date().toLocaleDateString());
}

const printMonth = function(){

    console.log(new Date().toLocaleDateString('default', {month: 'long'}));

}


const getBatchInfo = function(){

    console.log("Radon, W3D1, the topic for today is Nodejs module system")
        
}


module.exports.printDate = printDate;
module.exports.printMonth = printMonth;
module.exports.getBatchInfo = getBatchInfo;