const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.register = async(req , res) => {
    try {
        const {password,email} = req.body
      const found = await User.findOne({email})
      if( found){
     return  res.status(409).json({
      message: "Email already exist",
      // hashPass
    })
      }
        const hashPass = await bcrypt.hash(password ,10)
    const result=   await  User.create({
        ...req.body,
      password:hashPass
    })
      res.json({
        message: "user register success",
        result,
        // hashPass
      })
    } catch (error) {
        res.status(400).json({message:"something went wrong " , error})
    }
}
exports.fetchUsers = async(req , res) => {
    try {
      console.log(req.headers.authorization);
      const token = req.headers.authorization
      if(!token){
          return res.json({message:"Provide Token"})
      }
       jwt.verify(token,process.env.JWT_KEY)
      
    const result=   await  User.find()
      res.json({
        message: "user fetch success",
        result
      })
    } catch (error) {
        res.json({message:"something went wrong " , error})
    }
}
exports.login = async(req , res) => {
    try {
      const {email, password} = req.body
      // const result = await User.findOne({email}).lean()
      const result = await User.findOne({email})
      if (!result) {
        return res.status(401).json({message:"email is not registered with us"})
      }
      // email bhetla
      const match = await bcrypt.compare(password , result.password)
      if(!match){
        return res.status(401).json({message :"password do not match"})
      }
      const token = jwt.sign({userId:result._id},process.env.JWT_KEY,{
        expiresIn: "1d"
      })
      res.cookie("token", token,{
        httpOnly:true,
        secure:true,
        maxAge:60 * 60*1000
      })
      res.json({message:"login success" , result:{
        _id:result._id,
        name:result.name,
        emali:result.email,
      }})
    } catch (error) {
        res.status(400).json({message:"something went wrong " + error})
    }
}
exports.destroy = async(req , res) => {
    try {
      // const {email, password} = req.body
       await User.deleteMany()
         res.json({message:"user Destroy success"})
      
    } catch (error) {
        res.json({message:"something went wrong " + error})
    }
}