import express from 'express';
import {handleWatchVideos, handleEditVideos} from '../Controllers/videoController';

const videoRouter = express.Router();

videoRouter.get("/watch", handleWatchVideos);
videoRouter.get("/edit", handleEditVideos);

export default videoRouter;