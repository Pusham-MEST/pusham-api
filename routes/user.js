import { Router } from 'express';
import { signup, login };

// creates a Router
const userRouter = Router();

userRouter.post("/auth/signup", signup);

userRouter.post("/auth/login", login);

userRouter.post("/auth/token", token);


userRouter.get("/auth/username", getUser);

userRouter.get("/auth/users", getUsers);

userRouter.get("/auth/users", getUsers);
