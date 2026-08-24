import express from "express"

import * as imageController from "./images-controller.js"

const imageRouter = express.Router();

imageRouter.post("/", imageController.postImagesRoute);
imageRouter.get("/", imageController.getImagesRoute)
imageRouter.get('/:imagePublicId', imageController.getSpecificImageRoute);



export default imageRouter;