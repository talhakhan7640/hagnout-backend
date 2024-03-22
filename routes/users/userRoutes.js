import express from 'express';
import { userSignupController, userLoginController } from '../../controller/users/userController.js';
const userRouter = express.Router();

userRouter.post('/signup', userSignupController);
userRouter.post('/login', userLoginController);

export default userRouter;