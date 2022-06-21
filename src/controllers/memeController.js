const axios=require("axios")

const memecreate=async function(req,res){
try {
    let template_id = req.query.template_id
    let text0 = req.query.text0
    let text1 = req.query.text1
    let username= req.query.username
    let password = req.query.password
    
    //console.log(`body is : ${blahhh} `)
    var options = {
        method: "post",
        url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
        //data: blahhh
    }

    let result = await axios(options)
    let data=result.data
    res.status(200).send({ msg:data })
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}

module.exports.memecreate=memecreate