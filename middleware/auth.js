import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js"



// export const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace('Bearer ', '');

//     if (!token) {
//       // return res.status(401).json({ message: 'Authentication token is required.' });
//       throw new Error('No token provided');
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await user.findById(decoded.id);

//     if (!user) {
//       // return res.status(401).json({ message: 'User not found. Please authenticate.' });
//       throw new Error('User not fiund');
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Authentication failed.' });
//       // , error: error.message
//   }
// };




const checkUserSession = async (req, res, next) => {
  req.user = {};
  if (req.headers.authorization) {
      try {
          // Extract token from headers
          const token = req.headers.authorization.split(' ')[1]

          if(!token) {
              return res.status(401).json({ error: 'Not authenticated, token missing' })
          };

          // Verify the token to get user and append user to request
          const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
          console.log('Decoded JWT:', decoded);

          // Find the user in the database
          req.user = await userModel.findById(decoded.userId)

          if(!req.user){
              return res.status(401).json({ error: 'Not authenticated, user not found' })
          }
          next();
          
      } catch (error) {
          console.log(error.message);
          return res.status(401).json({ error: "Token Expired" })
      }
  }
  else {
      console.log(error.message)
      res.status(401).json({ error: 'Not authenticated' })
  }
}

export default checkUserSession;
