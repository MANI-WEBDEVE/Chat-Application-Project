import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dataBaseConnect } from "./dataBase/dataBase.js";
import authRoute from "./Routes/AuthRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4001;


app.use(
  cors({
    origin: [process.env.ORIGIN, "http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
  })
);

app.use(cookieParser());


app.use(express.json({ limit: "1mb" }));

app.use("/api/auth", authRoute);
 
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

dataBaseConnect();