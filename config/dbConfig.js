import mongoose from "mongoose";
import "dotenv/config";



// Fetch connection string from environment variables
const connectionString = process.env.mongo_url; 

export const dbConnection = () => {
  mongoose.connect(connectionString).then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });
};