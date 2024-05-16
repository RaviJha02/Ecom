let express=require("express")
const { upload, add, getprod, addcom } = require("../controllers/prodcon")
const { islogin, isadmin } = require("../controllers/usercon")
let prodroute=new express.Router()

prodroute.post("/add",upload.single("pimg"),islogin,isadmin,add)
prodroute.get("/get",getprod)
prodroute.put("/prodcom",islogin,addcom)

module.exports=prodroute