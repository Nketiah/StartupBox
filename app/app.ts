import express, { Request, Response } from 'express'
import "dotenv/config"
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'


//Initialize express
const app = express()

//Load middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

//Accept incoming request data
//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie middleware
app.use(cookieParser())

//CORS
const corsOptions  = {
    origin: "http://localhost:3000",
    credentials: true, 
}
app.use(cors(corsOptions))


//Register Application Routes
app.get("/", (req, res)=> {
    
    res.json({message: "OK"})
    //res.send("API running...")
})

export { app }