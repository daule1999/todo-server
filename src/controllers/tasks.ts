import { NextFunction, Request, Response } from "express"

import Task from "../models/task"
import { AuthRequest, ID, ITask } from "../types"

 const getAll = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: ID = req.userId
        const tasks = await Task.find({
            user: userId,
        })
        res.send({ tasks })
    } catch (error) {
        console.log("Error in fetching all Tasks", error)
        res.status(500).send({ message: "Error while fetching tasks", error })
    }
    next()
}

 const getAllByCategory = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: ID = req.userId
        const { id } = req.params
        const tasks = await Task.find({
            user: userId,
            categoryId: id,
        })
        res.send({ tasks })
    } catch (error) {
        console.log("error in fetching tasks By Category", error)
        res.status(500).send({ message: "Error while fetching tasks", error })
    }
    next()
}

 const getAllCompletedTasks = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: ID = req.userId
        const tasks = await Task.find({
            user: userId,
            isCompleted: true,
        })
        res.send({tasks})
    } catch (error) {
        console.log("Error while fetching tasks", error)
        res.status(500).send({ message: "Error while fetching tasks", error })
    }
    next()
}

 const getTasksForToday = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: ID = req.userId
        const todaysISODate = new Date()
        todaysISODate.setHours(0, 0, 0, 0)
        const tasks = await Task.find({
            user: userId,
            date: todaysISODate.toISOString(),
        })
        res.send({tasks})
    } catch (error) {
        console.log("Error while fetching tasks", error)
        res.status(500).send({ message: "Error while fetching tasks", error })
    }
    next()
}

 const create = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: ID = req.userId
        const { name, date, categoryId }: ITask = req.body

        const task = await Task.create({
            name,
            date,
            categoryId,
            user: userId,
        })
        res.send(task)
    } catch (error) {
        console.log("Error while creating task", error)
        res.status(500).send({ message: "Error while creating task", error })
    }
    next()
}

 const toggleStatus = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { isCompleted } = req.body
        const { id } = req.params

        const task = await Task.updateOne(
            {
                _id: id,
            },
            {
                isCompleted,
            }
        )
        res.send({ message: "Task status updated" })
    } catch (error) {
        console.log("Error while toggling status task", error)
        res.status(500).send({ message: "Error while toggling status task", error })
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
        await Task.deleteOne({
            _id: id,
        })
        res.send({ message: "Task deleted" })
    } catch (error) {
        console.log("Error while deleting task", error)
        res.status(500).send({ message: "Error while deleting task", error })
    }
    next()
}

 const update = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { _id, categoryId, date, name }: ITask = req.body
        await Task.updateOne(
            {
                _id,
            },
            {
                $set: {
                    name,
                    categoryId,
                    date,
                },
            }
        )
        res.send({ message: "Task updated successfully" })
    } catch (error) {
        console.log("Error while updating the task", error)
        res.status(500).send({ message: "Error while updating the task", error })
    }
    next()
}

export default {
    getAll,
    getAllByCategory,
    getAllCompletedTasks,
    getTasksForToday,
    create,
    toggleStatus,
    remove,
    update
}