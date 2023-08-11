import express, { Express, Request, Response } from 'express'
import * as dotenv from "dotenv"
import cors from "cors"
import connectToDb from './db';
import Routes from './routes/index'
import morgan from 'morgan';

dotenv.config();
if (!process.env.PORT && !process.env.MONGO_URL) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const MONGO_URL: string = process.env.MONGO_URL || "mongodb://localhost:27017/gym"

const app: Express = express();
const port = PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

connectToDb(MONGO_URL)

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong")
})

Routes?.init(app)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})