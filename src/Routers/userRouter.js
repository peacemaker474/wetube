import express from 'express';
import { 
    getEditUser,
    postEditUser,
    getChangePassword,
    postChangePassword,
    handleDeleteUser, 
    handleLogOut, 
    handleSeeUser, 
    handleStartGithubLogin, 
    handleFinishGithubLogin
} from '../Controllers/userController';
import {protectorMiddleware, publicOnlyMiddleware, avatarUpload} from '../middlewares';

const userRouter = express.Router();

userRouter.route("/edit")
    .all(protectorMiddleware)
    .get(getEditUser)
    .post(avatarUpload.single("avatar"), postEditUser);
userRouter.route("/change-password")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);
userRouter.get("/delete", handleDeleteUser);
userRouter.get("/logout", protectorMiddleware, handleLogOut);
userRouter.get("/github/start", publicOnlyMiddleware, handleStartGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, handleFinishGithubLogin);
userRouter.get("/:id", handleSeeUser);

export default userRouter;