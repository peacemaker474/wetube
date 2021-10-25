import express from 'express';
import {
    handleSeeVideo, 
    handleGetEditVideo, 
    handleDeleteVideo,  
    handleUploadVideo, 
    handlePostEditVideo
} from '../Controllers/videoController';

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", handleSeeVideo);
videoRouter.route("/:id(\\d+)/edit")
    .get(handleGetEditVideo)
    .post(handlePostEditVideo);
videoRouter.get("/:id/(\\d+)delete", handleDeleteVideo);
videoRouter.get("/upload", handleUploadVideo);

export default videoRouter;