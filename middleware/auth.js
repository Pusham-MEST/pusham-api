import jwt from "jsonwebtoken";
// import User from "../models/user.js"



export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found. Please authenticate.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.', error: error.message });
  }
};

export const checkUserSession = (req, res, next) => {
  if (req.session.user) {
    next();
  } else if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token expired or invalid.' });
    }
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

