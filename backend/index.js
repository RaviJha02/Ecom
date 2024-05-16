let express=require("express")
let mongoose=require("mongoose")
const userroute = require("./routes/userroute")
const prodroute = require("./routes/prodroute")
var bodyParser = require('body-parser')
let cors=require("cors")
const cartroute = require("./routes/cartroute")


let app=express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/imgs",express.static("./pimgs"))



mongoose.connect("mongodb://localhost:27017/ecom").then(()=>{
    console.log("ok")
})

app.use("/user",userroute)
app.use("/prod",prodroute)
app.use("/cart",cartroute)

app.listen(5000)