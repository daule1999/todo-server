import { Request } from "express"
import { ObjectId, Types } from "mongoose"

export type ID = string | ObjectId | Types.ObjectId

export interface IUserModel {
    _id?: ID
    email: string
    name: string
    password: string
}

export interface IUser {
    email: string
    name: string
    password: string
}

export interface AuthRequest extends Request {
    userId: ID
    user: IUserModel
}

export interface IColor {
    name: string
    id: string
    code: string
}

export interface IIcon {
    name: string
    id: string
    symbol: string
}

export interface ICategory {
    _id: string
    name: string
    user: IUser | string
    isEditable: boolean
    color: IColor
    icon: IIcon
}

export interface ITask {
    _id: string
    name: string
    categoryId: string
    user: string
    isCompleted: boolean
    isEditable: boolean
    date: string
    createdAt: string
    updatedAt: string
}