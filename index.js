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
import checkUserSession from "./middleware/auth.js";



// create express app
const app = express();


// Db connection
dbConnection();



expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["auth", "outages", "neighbourhoods"],
    mongooseModels: mongoose.modelNames()
})

// Middleware
// To Parse incomming JSON request and put the parsed data in req.body 
app.use(cors({ credentials:true, origin:"*" }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure:false },

    store:MongoStore.create({
        mongoUrl: process.env.mongo_url
    })
}))


// To custom middleware to check user session or token
app.use(checkUserSession);
// app.use(auth);


// Routes
// app.use( authRouter );
app.use ('/api/v1', userRouter);
app.use('/api/v1', outageRouter);
app.use('/api/v1', neighbourhoodRouter);
// OpenAPI generator requests handling
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

// // Default route for root
// app.get('/', (req, res) => {
//     res.send('Welcome to the Outage Management System API');
//   });





// Port-listening connection
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

