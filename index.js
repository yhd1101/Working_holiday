import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser";
import passport from "passport"
import dotEnv from "dotenv"
import connectDB from "./config/database.js";
import passportConfig from "./config/passport.js"
import cors from "cors"


import userRoutes from "./route/user.js"
import profileRoutes from "./route/profile.js";
import countryRoutes from  "./route/country.js"
import countryInfoRoutes from "./route/countryInfo.js"



const app = express()

dotEnv.config()
connectDB()

app.use(cors())
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

//passport init
app.use(passport.initialize())
passportConfig(passport)


app.use("/user", userRoutes)
app.use("/profile", profileRoutes)
app.use("/country", countryRoutes)
app.use("/info", countryInfoRoutes)


const port = process.env.PORT || 9000




app.listen(port, console.log("Server started"))