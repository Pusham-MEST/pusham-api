import { Router } from "express";
import { forgotPassword, logOut, register, userLogin, updateUser, deleteUser, getUser } from "../controllers/users_controllers.js";
import { checkUserSession } from "../middleware/auth.js";


const userRouter =Router();

userRouter.post('/users/register',register)
userRouter.post('/users/login', checkUserSession, userLogin)
userRouter.post('/users/logout',logOut)
userRouter.post('/users/forgot-Password', forgotPassword)
userRouter.get('/users', getUser)
//userRouter.get('/users/reset-token/:id', verifyResetToken)
userRouter.patch('/users/update/:id', updateUser)
userRouter.delete('/users/delete/:id', checkUserSession, deleteUser)

export default userRouter;
