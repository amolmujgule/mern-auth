const express = require("express")
require("dotenv").config({path:"./.env"})
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)
const cors = require("cors")

const cookieParser = require("cookie-parser")
const { protect } = require("./middiewares/protect")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    // origin: "https://auth-h07q.onrender.com/" 
    origin:"http://localhost:5174",
    credentials:true
}))


app.use("/api/user", require("./routes/userRoutes")) 
app.use("/api/todo",protect, require("./routes/todoRoutes")) 

const PORT = process.env.PORT || 5000
mongoose.connection.once("open",() => {
    console.log("DB CONNECTED");
    app.listen(PORT,console.log(`http://localhost:${PORT}`))
})
