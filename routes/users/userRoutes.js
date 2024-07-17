import express from 'express';
import { userSignupController, userLoginController, userLogoutController } from '../../controller/users/userController.js';
const userRouter = express.Router();

userRouter.post('/signup', userSignupController);
userRouter.post('/login', userLoginController);
userRouter.get('/logout', userLogoutController);

export default userRouter;