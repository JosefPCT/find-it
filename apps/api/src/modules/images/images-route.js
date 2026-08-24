import express from "express"

import * as imageController from "./images-controller.js"

const imageRouter = express.Router();

imageRouter.get("/", imageController.getImagesRoute)

export default imageRouter;