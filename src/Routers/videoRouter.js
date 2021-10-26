import express from 'express';
import {
    handleSeeVideo, 
    handleGetEditVideo, 
    handleDeleteVideo,  
    handlePostEditVideo,
    handleGetUploadVideo,
    handlePostUploadVideo, 
} from '../Controllers/videoController';

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", handleSeeVideo);
videoRouter.route("/:id(\\d+)/edit")
    .get(handleGetEditVideo)
    .post(handlePostEditVideo);
videoRouter.route("/upload")
    .get(handleGetUploadVideo)
    .post(handlePostUploadVideo);
videoRouter.get("/:id/(\\d+)delete", handleDeleteVideo);

export default videoRouter;