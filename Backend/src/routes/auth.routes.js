const express = require("express")
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

authRouter.post("/register",authController.register)
authRouter.post("/login",authController.login)
authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)
authRouter.post("/logout",authController.logout)



module.exports = authRouter;