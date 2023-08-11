import { Request, Response } from "express"
import { Types } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/user"
import { ID, IUser, IUserModel } from "../types"

const encryptPassword = async (password: string) => {
    return await bcrypt.hash(password, await bcrypt.genSalt(12))
}

const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}

const getUserToken = (_id: ID) => {
    const authenticatedUserToken = jwt.sign({ _id }, "JSONWEBTOKEN", {
        expiresIn: "7d",
    })
    return authenticatedUserToken
}

const create = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const existingUser: IUserModel = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).send({ message: "User already exist", user: existingUser })
        }

        const user: IUserModel = await User.create({
            name: name,
            email: email,
            password: await encryptPassword(password),
        })

        return res.status(201).send({ message: "User SignUp successfull", user })
    } catch (error) {
        console.log("Error during signup", error)
        res.status(500).send({ message: "User SignUp Failed", error })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: IUser = req.body
        const existingUser: IUserModel = await User.findOne({ email })
        if (!existingUser) {
            return res.status(409).send({ message: "User doesn't exist", user: existingUser })
        }
        const isPasswordIdentical = await comparePassword(password, existingUser.password)
        if (isPasswordIdentical) {
            const token = getUserToken(existingUser._id)
            res.setHeader('authorization', token)
            return res.send({
                token,
                user: {
                    email: existingUser.email,
                    name: existingUser.name,
                },
            })
        } else {
            return res.status(400).send({ message: "Wrong credentials" })
        }
    } catch (error) {
        console.log("Error while user login", error)
        return res.status(500).send({ message: "Error while user login", error })
    }
}

export default {
    create,
    login
}