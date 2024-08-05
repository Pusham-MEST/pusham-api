// Import packages
import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/user_router.js";

// create express app
const app = express();

//middleware
app.use(express.json())

// Db connection
await mongoose.connect(process.env.MONGO_URL).then(() =>{
console.log('Database is connected')
})

//use routes
app.use(userRouter)

// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});