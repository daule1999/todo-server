import mongoose from "mongoose"

const connectToDb = async (MONGO_URL = "mongodb://localhost:27017/todos") => {
    try {
        const connnection = await mongoose.connect(MONGO_URL)
        if(connnection){
            console.log("Connection to mongoDb Done")
        }
    } catch (err) {
        console.log("Error During Mongo Db Connection", err)
        throw err
    }
}

export default connectToDb  