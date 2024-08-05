import { Router } from "express";
import { logOut, register, userLogin } from "../controllers/users_controllers.js";

const userRouter =Router();

userRouter.post('/users/register',register)
userRouter.post('/users/login', userLogin)
userRouter.post('/users/logout',logOut)

export default userRouter