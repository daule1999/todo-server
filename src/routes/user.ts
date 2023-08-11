import express from "express"
import userController from "../controllers/user"
const { create, login } = userController
const userRouter = express.Router()

userRouter.post("/signup", create)
userRouter.post("/login", login)

export default userRouter