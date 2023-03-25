const express=require("express");
const crudModel = require("../model/user.model");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")

const router=express.Router()
router.use(express.json())

router.post("/register",async(req,res)=>{
     const {email,password,age,location}=req.body;

    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
            const user=new crudModel({email,password: hash, age, location})
            await user.save()
            res.status(200).send("Register Sucessfull")
        })
      
    } catch (error) {
        res.status(400).send({"msg": error.message})
        // console.log(error)
    }
})

router.post("/login",async(req,res)=>{
     console.log(req.body)
     const {email,password}=req.body
    //  const {email,password}=req.body
    try {
       const user=await crudModel.findOne({email})
       if(user){
        bcrypt.compare(password,user.password, (err,result)=>{
            if(result){
                res.status(200).send({"msg": "Login Sucessfull", "token": jwt.sign({"userID": user._id}, 'bruce')})
            }else{
                res.status(400).send({"msg": "Wrong Credentials"})
            }
        })
       }
      
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

router.get("/products",(req,res)=>{
    const token=req.headers.authorization

    const decoded=jwt.verify(token, 'bruce')
    if(decoded){
        res.status(200).send("Product details")
    }else{
        res.status(400).send({"msg": "Login required, cannot access restricted routes"})
    }
})

module.exports=router