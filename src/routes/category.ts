import express from "express"
import categoryController from "../controllers/category"
import { authenticationMiddleware } from "../middlewares"
const {
    getAll,
    getCategoryById,
    create,
    remove,
    update
} = categoryController
const categoryRouter = express.Router()

categoryRouter.use(authenticationMiddleware)

categoryRouter.get("/", getAll)
categoryRouter.get("/:id", getCategoryById)
categoryRouter.post("/create", create)
categoryRouter.delete("/:id", remove)
categoryRouter.put("/update", update)

export default categoryRouter