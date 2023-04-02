import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser";
import dotEnv from "dotenv"
import connectDB from "./config/database.js";
import userRoutes from "./route/user.js"



const app = express()

dotEnv.config()
connectDB()
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))


app.use("/user", userRoutes)


const port = process.env.PORT || 9000




app.listen(port, console.log("Server started"))