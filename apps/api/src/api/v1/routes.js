import express from "express";

import indexRoutes from "../../modules/index/index-route.js";

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ message: "Redirecting to api routes"});
})

apiRouter.use('/api/v1/', indexRoutes)

export default apiRouter;