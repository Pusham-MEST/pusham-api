// Import packages
import express from "express";
import mongoose from "mongoose";
import { checkUserSession } from "./middleware/auth.js";

// create express app
const app = express();

// Db connection
await mongoose.connect(process.env.MONGO_URI)
console.log("Database is connected")

// Middleware
// To Parse incomming JSON request and put the parsed data in req.body 
app.use(express.json());

// To custom middlewate to check user session or token
app.use(checkUserSession);



// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`App listening on port $(port)`);
});