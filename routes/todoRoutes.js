const { getTodos, addTodo, updateTodo, deleteTodo, destroyTodo } = require("../controllers/todoController")
const { protect } = require("../middiewares/protect")

const router = require("express").Router()

router
  .get("/" , getTodos)
  .post("/add", addTodo)
  .put("/update/:todoId",updateTodo )
  .delete("/delete/:todoId",deleteTodo )
  .delete("/destroy",destroyTodo )

  module.exports = router