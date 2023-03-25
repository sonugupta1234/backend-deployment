const jwt=require("jsonwebtoken")
const authenticate = (req,res,next)=>{
const token=req.headers?.authorization?.split(" ")[1]
if(token){
const decoded=jwt.verify(token,"masai")
if(decoded){
    req.body.userID=decoded.userID
next()
} else {
res.send("Please Login")
}
} else {
res.send("Please Login")
}
}
module.exports=authenticate

