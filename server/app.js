
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookiePareser from 'cookie-parser'
import mongoose from "mongoose";
// import authRoutes from "./routes/AuthRoutes ";
import authRoutes from "./routes/AuthRoute.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 4001 ;
const dataBaseUri = process.env.DATABASE_URI;

app.use(cors(
    {
        origin:[process.env.ORIGIN, "*"],
        methods:['GET','POST','PUT','DELETE'],
        credentials: true
    }
))
app.use(cookiePareser());
app.use(express.json({limit:'1mb'}));

app.use('/api/auth', authRoutes);



app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})

mongoose.connect(dataBaseUri, {})
.then(()=> console.log('MongoDb connected'))
.catch(err => console.log(err))