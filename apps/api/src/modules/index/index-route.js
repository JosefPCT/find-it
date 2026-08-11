import express from "express";

import * as indexController from "./index-controller.js";

const indexRouter = express.Router();

indexRouter.get('/', indexController.indexGetRoute);

indexRouter.get('/api', (req, res) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

indexRouter.get('/picture', indexController.indexPictureGetRoute)

export default indexRouter;