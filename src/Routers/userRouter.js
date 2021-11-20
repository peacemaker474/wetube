import express from 'express';
import { 
    getEditUser,
    postEditUser,
    handleDeleteUser, 
    handleLogOut, 
    handleSeeUser, 
    handleStartGithubLogin, 
    handleFinishGithubLogin
} from '../Controllers/userController';
import {protectorMiddleware, publicOnlyMiddleware} from '../middlewares';

const userRouter = express.Router();

userRouter.route("/edit")
    .all(protectorMiddleware)
    .get(getEditUser)
    .post(postEditUser);
userRouter.get("/delete", handleDeleteUser);
userRouter.get("/logout", protectorMiddleware, handleLogOut);
userRouter.get("/github/start", publicOnlyMiddleware, handleStartGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, handleFinishGithubLogin);
userRouter.get("/:id(\\d+)", handleSeeUser);

export default userRouter;