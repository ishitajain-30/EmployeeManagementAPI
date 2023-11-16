import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoute from './route/employee.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set('strictQuery',false);
const connectToDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connectd");
    } catch (error) {
        console.log("Error in connecting MongoDB");
    }
}

app.use(cors({origin:true, credentials: true}));


app.use('/api/employee', employeeRoute);
app.listen(PORT,()=>{
    connectToDB();
    console.log("Server listeing on ",PORT);
})