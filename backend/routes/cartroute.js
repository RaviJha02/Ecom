let express=require("express")
const { add, getcart, inc, dec, del, clr } = require("../controllers/cartcon")
const { islogin } = require("../controllers/usercon")
let cartroute=new express.Router()

cartroute.post("/add",islogin,add)
cartroute.get("/get/:uid",islogin,getcart)
cartroute.put("/inc",islogin,inc)
cartroute.put("/dec",islogin,dec)
cartroute.delete("/del/:id",islogin,del)
cartroute.delete("/clr/:id",islogin,clr)

module.exports=cartroute