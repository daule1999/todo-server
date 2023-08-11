import { NextFunction, Response } from "express"
import Category from "../models/category"
import Task from "../models/task"
import { AuthRequest, ICategory } from "../types"

const getAll = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req
        const categories = await Category.find({
            user: userId,
        })
        return res.send(categories)
    } catch (error) {
        console.log("error in getAllCategories", error)
        res.send({ message: "Something went wrong", error })
    }
    next()
}

const getCategoryById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { params = {} } = req
        const { id } = params
        const category = await Category.findOne({
            _id: id,
        })
        return res.send(category)
    } catch (error) {
        console.log("error in getAllCategories", error)
        res.send({ message: "Something went wrong", error })
    }
    next()
}

const create = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { color, icon, name }: ICategory = req.body
        const { userId } = req

        const category = await Category.create({
            color,
            icon,
            name,
            user: userId,
        })
        res.send({ category })
    } catch (error) {
        console.log("Error in creating Category", error)
        res.send({ message: "Something went wrong", error })
    }
    next()
}

const remove = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        await Task.deleteMany({
            categoryId: id,
        })
        const category = await Category.deleteOne({
            _id: id,
        })
        res.send({ message: "Category deleted successfully", category })
    } catch (error) {
        res.send({ message: "Error in deleting the category", error })
    }
    next()
}

const update = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { _id, color, icon, isEditable, name }: ICategory = req.body
        await Category.updateOne(
            {
                _id,
            },
            {
                $set: {
                    name,
                    color,
                    icon,
                    isEditable,
                },
            }
        )
        res.send({ message: "Category updated successfully" })
    } catch (error) {
        console.log("Error in updating the category", error)
        res.send({ message: "Error in updating the category", error })
    }
    next()
}

export default {
    getAll,
    getCategoryById,
    create,
    remove,
    update
}