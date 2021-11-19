import express from 'express';
import { 
    handleEditUser, 
    handleDeleteUser, 
    handleLogOut, 
    handleSeeUser, 
    handleStartGithubLogin, 
    handleFinishGithubLogin
} from '../Controllers/userController';

const userRouter = express.Router();

userRouter.get("/edit", handleEditUser);
userRouter.get("/delete", handleDeleteUser);
userRouter.get("/logout", handleLogOut);
userRouter.get("/github/start", handleStartGithubLogin);
userRouter.get("/github/finish", handleFinishGithubLogin);
userRouter.get("/:id(\\d+)", handleSeeUser);

export default userRouter;