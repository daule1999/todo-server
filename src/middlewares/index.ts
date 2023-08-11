import jwt from "jsonwebtoken"
import { NextFunction, Response } from "express"
import User from "../models/user"
import { AuthRequest, IUserModel } from "../types"


export const authenticationMiddleware = async (
    request: AuthRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = request.headers
        if (!authorization) {
            return response.status(401).json({
                error: "Authorization is required",
            })
        }
        const token = authorization
        const { _id } = jwt.verify(token, "JSONWEBTOKEN")
        const existingUser: IUserModel = await User.findOne({ _id })

        if (existingUser) {
            request.userId = existingUser._id
            request.user = existingUser
        }
        next()
    } catch (err) {
        console.log("Error during Authentication", err)
        throw err
    }
}