let multer=require("multer")
let {v4:uuid4}=require("uuid")
let prodmodel=require("../models/prodmodel")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './pimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })

  let add=async(req,res)=>{
    try{
        await new prodmodel({...req.body,"_id":uuid4(),"pimg":req.file.filename}).save()
        res.json({"msg":"product added"})
    }
    catch(err){
        console.log(err)
    }
  }

  let addcom=async(req,res)=>{
    try{
      
      await prodmodel.findByIdAndUpdate({"_id":req.body._id},{$push:{"com":req.body}})
      res.json({"msg":"comment added"})
    }
    catch(err){
      console.log(err)

    }
  }

  let getprod=async(req,res)=>{
    try{
        let data=await prodmodel.find()
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

  module.exports={getprod,add,upload,addcom}
