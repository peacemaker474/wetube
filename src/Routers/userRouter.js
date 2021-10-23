import express from 'express';
import { handleEditUser, handleDeleteUser, handleLogOut, handleSeeUser } from '../Controllers/userController';

const userRouter = express.Router();

userRouter.get("/edit", handleEditUser);
userRouter.get("/delete", handleDeleteUser);
userRouter.get("/logout", handleLogOut);
userRouter.get("/:id(\\d+)", handleSeeUser);

export default userRouter;