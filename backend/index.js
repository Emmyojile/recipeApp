import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";
import cookieParser from 'cookie-parser';


const port = process.env.PORT || 8000;
const app = express();

connectDB();
const corsOptions = {
    origin: ["*", "http://localhost:5174"], // Update this with the allowed origins or set it to a specific origin
    methods: "GET, POST, PUT, DELETE", // Update with the allowed HTTP methods
    allowedHeaders: "Content-Type, Authorization", // Update with the allowed headers
    credentials: true, // Enable credentials if you're using cookies or other authentication methods
  };
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));

app.use("/", apiRoutes);


app.listen(port, ()=> console.log(`Server listening on ${port}`));