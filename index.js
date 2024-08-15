import axios from "axios";
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
import emailRoutes from  './routes/emailRoutes.js';


// create express app
const app = express();


// Db connection
dbConnection();



expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["user", "outage", "neighbourhood"],
    mongooseModels: mongoose.modelNames()
})

// Middleware
// To Parse incomming JSON request and put the parsed data in req.body 
app.use(cors({ credentials:true, origin:"http://localhost:5173" }));
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




// Routes
app.use('/api/v1', emailRoutes);
app.use ('/api/v1', userRouter);
app.use('/api/v1', outageRouter);
app.use('/api/v1', neighbourhoodRouter);

// Define route to get location suggestions
app.get('/api/places', async (req, res) => {
    const { input } = req.query;

    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
            params: {
                input,
                key: process.env.GOOGLE_API_KEY,
                 // Adjust types according to your needs
                 types: '(cities)'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching places:', error.message);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});



// OpenAPI generator requests handling
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));




// Port-listening connection
// const port = process.env.PORT || 3050;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

app.listen(process.env.PORT || 3050, () => {
    console.log(`Server running on port ${process.env.PORT || 3050}`);
});
