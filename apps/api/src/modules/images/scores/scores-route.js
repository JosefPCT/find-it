import { Router } from "express"

const router = Router({ mergeParams: true });

import * as controller from "./scores-controller.js"



router.post("/", controller.postImageScoreRoute);
router.get("/", controller.getImageScoresRoute)
// router.get('/:imagePublicId', controller.getSpecificImageScoreRoute);

export default router;