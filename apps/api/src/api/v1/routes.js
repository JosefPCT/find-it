import express from "express";

import indexRoutes from "../../modules/index/index-route.js";
import imageRoutes from "../../modules/images/images-route.js";
import scoreRoutes from "../../modules/images/scores/scores-route.js"

const apiRouter = express.Router();

// Route for the main index, TODO: redirect to api/v1 index
apiRouter.get('/', (req, res) => {
  res.status(200).json({ message: "Redirecting to api routes"});
})

// Routing
apiRouter.use('/', indexRoutes);
apiRouter.use("/images", imageRoutes);
imageRoutes.use('/:imagePublicId/scores', scoreRoutes);

export default apiRouter;