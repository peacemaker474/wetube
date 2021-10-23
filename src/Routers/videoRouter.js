import express from 'express';
import {handleSeeVideo, handleEditVideo, handleDeleteVideo, handleUploadVideo} from '../Controllers/videoController';

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", handleSeeVideo);
videoRouter.get("/:id(\\d+)/edit", handleEditVideo);
videoRouter.get("/:id/(\\d+)delete", handleDeleteVideo);
videoRouter.get("/upload", handleUploadVideo);

export default videoRouter;