// Import packages
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import expressOasGenerator from '@mickeymond/express-oas-generator'
import MongoStore from "connect-mongo";
// import userRouter from "./routes/user.js";
import outageRouter from './routes/outages.js';
// import neighborhoodRouter from "./routes/neighborhood.js";
// import { checkUserSession } from "./middleware/auth.js";


// Db connection
await mongoose.connect(process.env.MONGO_URI)
console.log("Database is connected")


// create express app
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth'],
    mongooseModels: mongoose.modelNames()
})

// Middleware
// To Parse incomming JSON request and put the parsed data in req.body 
app.use(cors({credentials:true, origin:""}));
app.use(express.json());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure:true },

    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    })
}))


// To custom middleware to check user session or token
// app.use(checkUserSession);


// Use routes
// app.use ('/api/v1', userRouter);
app.use('/api/v1', outageRouter);
// app.use('/api/v1', neighborhoodRouter);
// app.use('/api/v1', outageRoutes);
// app.use('/api/v1', outageRoutes);
// app.use('/api/v1', outageRoutes);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-doc'));


// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`App listening on port $(port)`);
});