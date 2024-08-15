import { UserModel, resetTokenModel } from "../models/userModel.js";
import { Neighbourhood } from "../models/neighbourhood.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { mailTransporter } from "../config/mail.js";
import { registerValidator } from "../schema/schema.js";
import axios from 'axios';

// Register user
// export const register = async (req, res, next) => {
//     try {
//        const {value,error} = registerValidator.validate(req.body)
// if (error){ return res.status(400).send(error.details[0].message)}

//         // Check if the user already exists
//         const email=value.email;
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: 'User already exists' });
//         }

//         // Hash the password using bcrypt
//         const hashPassword = bcrypt.hashSync(value.password, 10);

//         // Create the new user with the hashed password
//         const user = await UserModel.create({
//            ...value,
//             password: hashPassword,
//         });

//         // Respond with a success message
//         res.status(201).json({ message: 'User created successfully', user });

//     } catch (error) {
//         console.error("Error during registration:", error);
//         next(error);
//     }
// };








// User login

export const register = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);

        // Validate the request body
        const { error } = registerValidator(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { userName, email, password, googlePlaceId } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password using bcrypt
        const hashPassword = bcrypt.hashSync(password, 10);

        // Fetch location details from Google Places API
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
        //  The googleapi should be set in the .env file
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${googlePlaceId}&key=${apiKey}`);

        const { lat, lng } = response.data.result.geometry.location;
        const address = response.data.result.formatted_address;

        // Find or create the neighbourhood
        let neighbourhood = await Neighbourhood.findOne({ placeId: googlePlaceId });
        if (!neighbourhood) {
            neighbourhood = await Neighbourhood.create({
                name: response.data.result.name,
                placeId: googlePlaceId,
                location: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                address
            });
        }

        // Create and save the user
        const user = await UserModel.create({
            userName,
            email,
            password: hashPassword,
            location: {
                type: 'Point',
                coordinates: [lng, lat],
                address,
                placeId: googlePlaceId,
                neighbourhood: neighbourhood._id
            }
        });

        res.status(201).json({ message: 'User created successfully', user });

    } catch (error) {
        console.error("Error during registration:", error);
        next(error);
    }
};


// User login
export const userLogin = async (req, res, next) => {
    try {
        // Extracting the userName and email from request body
        const { userName, email, password } = req.body;

        // Validate input
        if (!userName && !email) {
            return res.status(400).json({ message: 'Username or Email is required' });
        }

        // Find the user by userName or email
        const user = await UserModel.findOne({
            $or: [
                { userName },
                { email },            ]
        });


        // Check if user is found
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Compare the provided password with the stored hashed password
        const correctPassword = bcrypt.compareSync(password, user.password);

        // Check if the password is correct
        if (!correctPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
             // Ensure this is set in your environment variables
            { expiresIn: '24h' }
        );

        // Send the response with token
        res.status(200).json({ message: 'User logged in successfully', accessToken: token });

        // Log the error for debugging
    } catch (error) {
        console.error('Error during login:', error); 
        // Pass the error to the next middleware or error handler
        next(error); 
    }
};


//user logout 
export const logOut =  async (req, res, next) => {
 try {
    //   await req.session.destroy ();
      res.status (200).json ({message:'user logged out succesfully'})
   
   
 } catch (error) {
    next(error)
 }}
    

// Forgot password
export const forgotPassword = async (req, res, next) => {
    try {
        // Find a user with the provided email
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate Reset Token
        const resetToken = await resetTokenModel.create({
            userId: user.id,
        });

        // Send Reset Email
        await mailTransporter.sendMail({
            to: req.body.email,
            from: process.env.SMTP_USERNAME,
            subject: "Reset Password",
            html: `
                <h3>Hello ${user.firstName}</h3>
                <h4>Please follow the link below to reset your password:</h4>
                <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken.id}">Click Here</a>
            `,
        });

        // Return Response
        res.status(200).json({ message: 'Password reset email sent' });

    } catch (error) {
        next(error);
    }
};

// Verify Reset Password Token
export const verifyResetToken = async (req, res, next) => {
    try {
        // Find Reset Token by id
        const resetToken = await resetTokenModel.findById(req.params.id);
        if (!resetToken) {
            return res.status(404).json({ message: 'Reset Token Not Found' });
        }

        // Check if token is valid
        if (resetToken.expired || Date.now() > new Date(resetToken.expiredAt).getTime()) {
            return res.status(409).json({ message: 'Invalid Reset Token' });
        }

        // Return Response
        res.status(200).json({ message: 'Valid Reset Token' });

    } catch (error) {
        next(error);
    }
};

// Get user
export const getUser = async (req, res, next) => {
    try {
        const aUser = await UserModel.find();
        res.status(201).json(aUser);
    } catch (error) {
        next(error);
    }
}

// Update user
export const updateUser = async (req, res, next) => {
    try {
        const changeUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json('User updated');
    } catch (error) {
        next(error);
    }
}

// Delete user
export const deleteUser = async (req, res, next) => {
    try {
        const deletingUser = await UserModel.findByIdAndDelete(req.params.id);
        res.status(201).json('User deleted');
    } catch (error) {
        next(error);
    }
}

