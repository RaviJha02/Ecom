let bcrypt=require("bcryptjs")
let jwt=require("jsonwebtoken")
const usermodel = require("../models/usermodel")
let fs=require("fs")

let reg=async(req,res)=>{
    try{
        let user=await usermodel.findById({"_id":req.body._id})
        if(user){
            res.json({"msg":"email already exists with this email"})
        }
        else{
            let hascode=await bcrypt.hash(req.body.pwd,10)
            let data=await usermodel({...req.body,"pwd":hascode}).save()
            res.json({"msg":"account created"})
        }
    }
    catch(err){
        console.log(err)
    }
}

let login=async(req,res)=>{
    try{
        let user=await usermodel.findById({"_id":req.body._id})
        if(user){
            let f= await bcrypt.compare(req.body.pwd,user.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":user._id},"abcd"),"_id":user._id,"name":user.name,"role":user.role})
            }
            else{
                res.json({"msg":"check password"})
            }
        }
        else{
            res.json({"msg":"check email"})
        }
    }
    catch(err){
        console.log(err)
    }
    
}

let islogin=async(req,res,next)=>{
    try{
        await jwt.verify(req.headers.authorization,"abcd")
        next()
    }
    catch(err){
        res.json({"err":"authorization error"})
    }
}

let isadmin=async(req,res,next)=>{
    try{

        let obj=await usermodel.findById({"_id":req.headers._id})
        if(obj.role="admin"){
            next()
        }
        else{
            if(req.url="/add"){
                fs.rm(`./pimgs/${req.file.filename}`,()=>{})
            }
            res.json({"err":"not admin"})
            
        }
    }
    catch(err){

    }
}

module.exports={reg,login,islogin,isadmin}