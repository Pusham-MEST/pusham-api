
import { UserModel,resetTokenModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { mailTransporter} from "../config/mail.js";


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
    
//forgot passowrd 
export const forgotPassword = async (req, res, next) =>{
try {
    
    //Find a user with provided email
    const user = await UserModel.findOne({email:req.body.email});
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    
    //Generate Reset Token 
const resetToken = await resetTokenModel.create({
    userId:user.id,
    });
       await mailTransporter.sendMail({
        to:req.body.email,
        from:"emmanuel@laremdetech.com",
        subject:"Reset Password",
        html:`
        <h3>Hello ${user.firstName}</h3>
        <h4> Please follow the link below to reset your Password</h4>
        <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken.id}" > Click Here</a> `
    });

    // /Return Response 
    res.status(200).json('Password reset email sent')
    
    }
 catch (error) {
    next(error)
    
}
}


 //Verify Reset Password Token
export const verifyResetToken = async (req, res, next) => {
    try {
        //Find Reset Token by id 
        const resetToken = await resetTokenModel.findById(req.params.id);
        if(!resetToken){
            return res.status(404).json({message:'Reset Token Not Found'});
        }
console.log(resetToken)
        //check if token is valid
        if (resetToken.expired || Date.now() > new Date(resetToken.expiredAt).getTime()) {
            return res.status(409).json({ message: 'Invalid Reset Token' });
        }
        //Return Response
        res.status(200).json({message:'Valid Reset Token'});

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















