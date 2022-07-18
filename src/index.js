const express = require("express")
const bodyParser = express.json()
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")

app.use(bodyParser)

mongoose.connect("mongodb+srv://keerti96:mongo25$$@cluster0.1h72edu.mongodb.net/group62database"
    , { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route)



app.listen(process.env.PORT || 3000, function () { console.log("Express is running on port " + (process.env.PORT || 3000)) });