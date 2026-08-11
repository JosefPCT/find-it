import express from "express";

import indexRoutes from "../../modules/index/index-route.js";

const apiRouter = express.Router();

// Route for the main index, TODO: redirect to api/v1 index
apiRouter.get('/', (req, res) => {
  res.status(200).json({ message: "Redirecting to api routes"});
})

// Routing
apiRouter.use('/api/v1/', indexRoutes)

export default apiRouter;