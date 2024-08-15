import jwt from "jsonwebtoken";



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




export const checkUserSession = (req, res, next) => {
    console.log( req.body)
    if (req) {
      next();
    } else if (req.headers.authorization) {
      try {
        //extract token from headers
        const token = req.headers.authorization.split(" ")[1];
        //verify the token to get the user and append to request
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        // call next function
        next();
        // res.json(req.headers.authorization)
      } catch (error) {
        return res.status(401).json({ error: "Token Expired" })
      }
    }
    else {
      res.status(401).json({error:'Not authenticated'})  }
  };



  // Check if user is admin
  export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    res.status(403).json({ error: 'Access denied, admin only' });
  };