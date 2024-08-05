// Import packages
import express from "express";
import mongoose from "mongoose";

// create express app
const app = express();

// Db connection
await mongoose.connect(process.env.MONGO_URI)

// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`App listening on port $(port)`);
});

