import mongoose from "mongoose";
import "dotenv/config";

// const connectionString = process.env.MONGO_URI



// export const dbConnection = () => {
//  mongoose.connect(connectionString).then(() => {
//     console.log('Database is connected')
// })
   
// }


const connectionString = process.env.mongo_url; // Fetch connection string from environment variables

export const dbConnection = () => {
  mongoose.connect(connectionString).then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });
};