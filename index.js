import userRouter from "./router/user_router.js";
import express from "express";
import mongoose from "mongoose";


// create express app
const app = express();



app.use(express.json());


app.use(userRouter)
// Db connection
await mongoose.connect(process.env.mongo_url).then(() => {
    console.log('Database is connected');
})

// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

