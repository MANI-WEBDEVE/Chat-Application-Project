
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookiePareser from 'cookie-parser'
import mongoose from "mongoose";
// import authRoutes from "./routes/AuthRoutes ";
import authRoutes from "./routes/AuthRoute.js"
import contactsRoutes from "./routes/ContactRoute.js";
import setupSocket from "./socketIo.js";
import messageRoute from "./routes/MessagesRoute.js";
import channelRoutes from "./routes/ChannelRoute.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 4000 ;
const dataBaseUri = process.env.DATABASE_URI;

app.use(cors(
    {
        origin:[process.env.ORIGIN, "*"],
        methods:['GET','POST','PUT','DELETE'],
        credentials: true
    } 
))

app.use("/uploads/profiles",express.static("uploads/profiles"))
app.use("/uploads/files",express.static("uploads/files"))

app.use(cookiePareser());
app.use(express.json({limit:'1mb'}));

app.use('/api/auth', authRoutes);
app.use("/api/contact", contactsRoutes)
app.use("/api/messages", messageRoute)
app.use("/api/channel", channelRoutes)


 const server =  app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})

setupSocket(server)


mongoose.connect(dataBaseUri, {})
.then(()=> console.log('MongoDb connected'))
.catch(err => console.log(err))