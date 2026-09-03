import * as imagesQueries from "../images-queries.js";
import * as scoresQueries from "./score-queries.js";


export const createImageScore = async(imagePublicId,data) => {
  try {
    const image = await imagesQueries.fetchSpecificImage(imagePublicId);
    if(!image){
      throw new Error("Image parent does not exist");
    }
    const scores = await scoresQueries.createImageScoreByImageId(parseInt(image.id), data);
    console.log("Images");
    console.log(scores);
    return scores;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getAllImageScores = async(imagePublicId) => {
  try {
    const image = await imagesQueries.fetchSpecificImage(imagePublicId);
    if(!image){
      throw new Error("Image parent does not exist");
    }
    const scores = await scoresQueries.fetchAllImageScores(parseInt(image.id));
    console.log("Images");
    console.log(scores);
    return scores;
  } catch (error) {
    console.log(error);
    throw error;
  }
}