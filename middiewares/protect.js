 const jwt = require("jsonwebtoken")
 
 exports.protect = (req , res , next) =>{
const token=  req.cookies.token
if(!token){
    return res.status(401).json({
        message:"Unauthorized Access. Please Provide Token"
    })
}
jwt.verify(token, process.env.JWT_KEY,(err, decode) => {
    if (err) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
    req.body.userId = decode.userId
    next()
})
 } 