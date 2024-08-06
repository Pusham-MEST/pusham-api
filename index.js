import userRouter from "./router/user_router.js";
import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import expressOasGenerator from '@mickeymond/express-oas-generator'
import { dbConnection } from "./config/dbConfig.js";

import userRouter from "./router/user_router.js";
import outageRouter from './routes/outages.js';
import neighbourhoodRouter from "./routes/neighborhood.js";
import { checkUserSession } from "./middleware/auth.js";



// create express app
const app = express();


// Db connection

dbConnection();



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
app.use(checkUserSession);
app.use(auth);

// Use routes
app.use ('/api/v1', user_Router);
app.use('/api/v1', outageRouter);
app.use('/api/v1', neighbourhoodRouter);
// app.use('/api/v1', outageRoutes);
// app.use('/api/v1', outageRoutes);
// app.use('/api/v1', outageRoutes);

// Default route for root
app.get('/', (req, res) => {
    res.send('Welcome to the Outage Management System API');
  });



expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-doc'));


app.use(express.json());


app.use(userRouter)
// Db connection
await mongoose.connect(process.env.mongo_url).then(() => {
    console.log('Database is connected');
})

// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

