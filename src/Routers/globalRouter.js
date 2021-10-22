import express from 'express';
import {join} from '../Controllers/userController';
import { trending } from '../Controllers/videoController';

const globerRouter = express.Router();

globerRouter.get("/", trending);
globerRouter.get("/join", join);

export default globerRouter;