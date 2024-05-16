let {v4:uuid4}=require("uuid")
const cartmodel = require("../models/cartmodel")

let add=async(req,res)=>{
    try{
        let obj=await cartmodel.find({"uid":req.body.uid,"pid":req.body._id})
        if(obj.length>0){
            await cartmodel.findByIdAndUpdate({"_id":obj[0]._id},{$inc:{"qty":1}})
            res.json({"msg":"updated qty"})
        }
        else{
            let tid=uuid4()
            await new cartmodel({...req.body,"_id":tid,"pid":req.body._id}).save()
            res.json({"msg":"prod add"})

        }
    }
    catch(err){
        console.log(err)
    }
}

let inc=async(req,res)=>{
    try{
        await cartmodel.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":1}})
        res.json({"msg":"incremented"})
    }
    catch(err){

    }
}

let dec=async(req,res)=>{
    try{
        let obj = await cartmodel.findById({"_id":req.body._id})
        if(obj.qty>1){
            await cartmodel.updateOne({"_id":req.body._id},{"qty":obj.qty-1})
        }
        else{
            await cartmodel.deleteOne({"_id":req.body._id})
        }
        res.json({"msg":"incremented"})
        
    }
    catch(err){

    }
}

let del=async(req,res)=>{
    try{
        await cartmodel.deleteOne({"_id":req.params.id})
        res.json({"msg":"item deleted"})
    }
    catch(err){

    }
}

let clr=async(req,res)=>{
    try{
        await cartmodel.deleteMany({"uid":req.params.id})
        res.json({"msg":"cart cleared"})
    }
    catch(err){

    }
}



let getcart=async(req,res)=>{
    try{
    let data=await cartmodel.find({"uid":req.params.uid})
    res.json(data)
    }
    catch(err)
    {

    }
}
module.exports={add,getcart,inc,dec,del,clr}