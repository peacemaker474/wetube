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

videoRouter.get("/:id([0-9a-f]{24})", handleSeeVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit")
    .get(handleGetEditVideo)
    .post(handlePostEditVideo);
videoRouter.route("/upload")
    .get(handleGetUploadVideo)
    .post(handlePostUploadVideo);
videoRouter.route("/:id([0-9a-f]{24})/delete") 
    .get(handleDeleteVideo);

export default videoRouter;