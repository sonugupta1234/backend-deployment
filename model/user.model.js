const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email: String,
    password: String,
    age: Number,
    location: String
})

const crudModel=mongoose.model("user",userSchema)

module.exports=crudModel