import * as scoresService from "./scores-service.js";

export const postImageScoreRoute = [
  async(req, res) => {
    console.log("Creating new score:");
    const createdScore = await scoresService.createImageScore(req.params.imagePublicId, req.body);

    res.status(200).json(createdScore);
  }
]

export const getImageScoresRoute = [
  async(req, res) => {
    console.log("/images/:imagePublicId/scores GET route handler");
    console.log(`:imagePublicId is ${req.params.imagePublicId}`);
    const scores = await scoresService.getAllImageScores(req.params.imagePublicId);
    // const result = { test: "Image Scores Route"}

    res.status(200).json(scores)
  }
]