const { Error } = require("mongoose")
const Todo = require("../models/Todo")
const jwt = require(`jsonwebtoken`)

exports.addTodo = async(req, res) => {
    try {
// const token = req.headers.authorization 
// if(!token){
//    return res.status(401).json({
//         message:"Please Provide Token"
//     })
// }
//  const {userId} = jwt.verify(token,process.env.JWT_KEY)
    console.log(req.body);
       await Todo.create(req.body)
       res.json({
        message:"todo add success"
       })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Error" + error
        })
    }
}
exports.getTodos = async(req, res) => {
    try {
     const result =   await Todo.find()
       res.json({
        message:"todo add success",
        result
       })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Error" + error
        })
    }
}
exports.updateTodo = async(req, res) => {
    try {
        const {todoId} = req.params
     const result =   await Todo.findByIdAndUpdate(todoId, req.body,{
        new:true
     })
       res.json({
        message:"todo update success",
        result
       })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Error" + error
        })
    }
}
exports.deleteTodo = async(req, res) => {
    try {
        const {todoId} = req.params
       await Todo.findByIdAndDelete(todoId)
       res.json({
        message:"todo delete success",
       })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Error" + error
        })
    }
}
exports.destroyTodo = async(req, res) => {
    try {
       await Todo.deleteMany()
       res.json({
        message:"todo destroy success",
       })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Error" + error
        })
    }
}