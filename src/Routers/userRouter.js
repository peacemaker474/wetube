import express from 'express';
import { handleEditUser, handleDeleteUser } from '../Controllers/userController';

const userRouter = express.Router();

userRouter.get("/edit", handleEditUser);
userRouter.get("/delete", handleDeleteUser);

export default userRouter;