import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import { dbConnection } from "./config/dbConfig.js";
import userRouter from "./router/user_router.js";
import outageRouter from './routes/outages.js';
import neighbourhoodRouter from "./routes/neighborhood.js";

// Create express app
const app = express();

// Database connection
dbConnection();

// OpenAPI generator setup
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["user", "outage", "neighbourhood"],
    mongooseModels: mongoose.modelNames()
});

// Middleware
// Parse incoming JSON request and put the parsed data in req.body
app.use(cors({ credentials: true, origin: "http://localhost:5173/" }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-default-secret', // Use an environment variable or a hard-coded default string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in production
    store: MongoStore.create({
        mongoUrl: process.env.mongo_url
    })
}));

// Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', outageRouter);
app.use('/api/v1', neighbourhoodRouter);

// OpenAPI generator requests handling
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
