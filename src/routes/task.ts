import express from "express"
import taskController from "../controllers/tasks"
import { authenticationMiddleware } from "../middlewares"
const {
    getAll,
    getAllByCategory,
    getAllCompletedTasks,
    getTasksForToday,
    create,
    toggleStatus,
    remove,
    update
} = taskController

const taskRouter = express.Router()

taskRouter.use(authenticationMiddleware)

taskRouter.get("/", getAll)
taskRouter.get("/tasks-by-categories/:id", getAllByCategory)
taskRouter.get("/completed", getAllCompletedTasks)
taskRouter.get("/today", getTasksForToday)
taskRouter.post("/create", create)
taskRouter.put("/update/:id", toggleStatus)
taskRouter.delete("/:id", remove)
taskRouter.put("/edit/:id", update)

export default taskRouter