import express from 'express';
import { join, login } from '../Controllers/userController';
import { home, search } from '../Controllers/videoController';

const globerRouter = express.Router();

globerRouter.get("/", home);
globerRouter.get("/join", join);
globerRouter.get("/login", login);
globerRouter.get("/search", search);

export default globerRouter;