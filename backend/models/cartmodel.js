let mongoose=require("mongoose")
let cartsch=new mongoose.Schema(
    {
        "_id":String,
        "uid":String,
        "pid":String,
        "name":String,
        "desc":String,
        "pimg":String,
        "cat":String,
        "price":Number,
        "qty":Number
    })
    let cartmodel=mongoose.model("cart",cartsch)
    module.exports=cartmodel