const express = require('express');
const cookieParser = require("cookie-parser")
const authRouter = require("../src/routes/auth.routes")
const cors = require("cors")
const songRoutes = require("../src/routes/songs.route")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/songs", songRoutes)

module.exports = app