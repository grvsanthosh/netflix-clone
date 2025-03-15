import mongoose from "mongoose";
import {ENV_VARS} from './envVars.js'

export const connectDB = async ()=>{

    try{

        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("connected to MongoDB: ",conn.connection.host)

    }
    catch(e){
               
        console.error("error connecting to DB ", e.message)
        process.exit(1); // 1 means error
    }
}