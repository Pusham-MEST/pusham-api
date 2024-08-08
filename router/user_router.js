import { Router } from "express";
import { forgotPassword, logOut, register, userLogin, verifyResetToken } from "../controllers/users_controllers.js";
import { checkUserSession } from "../middleware/auth.js";

const userRouter =Router();

userRouter.post('/users/register',register)
userRouter.post('/users/login', checkUserSession, userLogin)
userRouter.post('/users/logout',logOut)
userRouter.post('/users/forgot-Password', forgotPassword)
userRouter.get('/users/reset-token/:id', verifyResetToken)

export default userRouter;
