let mongoose=require("mongoose")
let prodsch=new mongoose.Schema(
    {
        "_id":String,
        "name":String,
        "price":Number,
        "desc":String,
        "cat":String,
        "pimg":String,
        "com":[]
    }
)
module.exports=mongoose.model("prod",prodsch)