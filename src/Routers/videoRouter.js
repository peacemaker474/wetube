import express from 'express';
import {
    handleSeeVideo, 
    handleGetEditVideo, 
    handleDeleteVideo,  
    handlePostEditVideo,
    handleGetUploadVideo,
    handlePostUploadVideo, 
} from '../Controllers/videoController';
import { protectorMiddleware, videoUpload } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", handleSeeVideo);
videoRouter.route("/:id([0-9a-f]{24})/edit")
    .all(protectorMiddleware)
    .get(handleGetEditVideo)
    .post(handlePostEditVideo);
videoRouter.route("/upload")
    .all(protectorMiddleware)
    .get(handleGetUploadVideo)
    .post(videoUpload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumb", maxCount: 1 }
    ]), handlePostUploadVideo);
videoRouter.route("/:id([0-9a-f]{24})/delete") 
    .all(protectorMiddleware)
    .get(handleDeleteVideo);

export default videoRouter;