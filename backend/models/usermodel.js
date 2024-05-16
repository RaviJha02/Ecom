let mongoose=require("mongoose")

let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "phno":String,
    "pwd":String,
    "role":{
        type:String,
        default:"user"
    }
})
let usermodel=mongoose.model("user",usersch)
module.exports=usermodel