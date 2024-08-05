import jwt from "jsonwebtoken";

export const checkUserSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else if (req.headers.authorization) {
        try {
            // extract token from headers
            const token = req.header.authorization.split(" ")[1];
            // verify the token to get the user and append to request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            // Call next fuction
            next();
        } catch (error) {
            return res.status(401).json({ error: "Token Expired" })
        }
    }
    else {
        res.status(401).json({ error: 'Not authenticated' })
    }
};