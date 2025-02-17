import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors"
import userRoutes from "./routes/routes.js";

dotenv.config();
const mongourl = process.env.mongourl;
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use(cors())

app.get('/', (request, response) => {
    return response.send("Hello Om");
});

app.use('/api',userRoutes);

mongoose.connect(mongourl).then(() => {
    console.log("Database Connected Successfully!!");
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
    });
}).catch((error) => {
    console.log("Failed to connect to DB");
    console.log(error);
});








