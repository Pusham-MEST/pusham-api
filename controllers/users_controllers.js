import { json } from "express";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer"

//post  or user registration

export const register = async(req,res,next) => {
try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user= await UserModel.create({
        ...req.body, 
        password: hashPassword });

     res.status(201).json('user created successfully')
    
} catch (error) {
   next(error) 
}
}

//user login
export const userLogin = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            $or:[
               { userName:req.body.userName},
               {email:req.body.email}
            ]
        });
        if (!user) {
            return res.status (401).json ('user not found ') };

        const correctPassword  = bcrypt.compareSync(req.body.password, user.password)
        if(!correctPassword){
            return res.status (401).json ('incorect password ')
        }
        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '24h'}
        );
        res.status(200).json({message:'user logged in succesfully', accessToken: token})
    } catch (error) { next(error)
        
    }
}

//user logout 
export const logOut =  async (req, res, next) => {
 try {
    //   await req.session.destroy ();
      res.status (200).json ('user logged out succesfully')
   
   
 } catch (error) {
    next(error)
 }}
    

//reset password

export const requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json('User not found')
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            host: 'mail.youth-arise.org', // Outgoing server from cPanel
            port: 465, // Port for SSL
            secure: true, // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else)  requested to reset password for your account.\n\n` +
                `Please use the  OTP to complete the process:\n\n` +
                `${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('There was an error', err);
            } else {
                res.status(200).json('Password recovery email sent');
            }
        });
    }
    catch (error) {
        next(error);
    }
};

// Confirm OTP
export const confirmOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || !user.resetPasswordToken || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json('OTP is invalid or has expired');
        }

        jwt.verify(otp, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json('OTP is invalid');
            }
            if (decoded.email !== email) {
                return res.status(400).json('OTP does not match email');
            }
            res.status(200).json('OTP confirmed');

        });
    } catch (error) {
        next(error);
    }
};

// Reset Password

export const resetPassword = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || !user.resetPasswordToken || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json('OTP is invalid or has expired');
        }

        jwt.verify(otp, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json('OTP is invalid');
            }
            if (decoded.email !== email) {
                return res.status(400).json('OTP does not match email');
            }

            // hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.confirmPassword = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.status(200).json('Password has been reset');
        })
    } catch (error) {
        next(error);
    }
}
 

//get user

const getUser = async(req,res,next) => {
    try {
        const aUser= await UserModel.find(req.body);
    
        res.status(201).json('1 user gotten')
    } catch (error) {
        next(error)
        
    }
}

//update User
 const updateUser = async (req, res, next)=>{

  try {
      const changeUser = await UserModel.findByIdandUpdate(params.id, req.body);
  
      res.status(201).json  ('user updated')
  } catch (error) {
    next(error)
    
  }

 }

 //delete User

 const deleteUser= (req,res,next)=>{
  try {
      const deletingUser= UserModel.findByIdAndDelete(params.id,req.body);
  
      res.status(201).json ('user deleted')
  } catch (error) {
    next(error)
    
  }

 }















