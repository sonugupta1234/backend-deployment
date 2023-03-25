const express=require("express")
const connection=require("./db")
require("dotenv").config()
const app=express()
const router=require("./routes/user.routes")
const notesRouter=require("./routes/notes.routes")
const  authenticate  = require("./middlewares/authenticate.middleware")

app.use(express.json())
app.use("/users",router)
app.use(authenticate)
app.use(notesRouter)

app.listen(process.env.PORT,()=>{
    connection()
    console.log("Server Running")
})

module.exports=app