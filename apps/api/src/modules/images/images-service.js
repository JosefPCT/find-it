import * as imageQueries from "./images-queries.js"

export const getAllImages = async() => {
  try {
    const images = await imageQueries.fetchAllImages();
    console.log("Images");
    console.log(images);
    return images;
  } catch (error) {
    console.log(error);
    throw error;
  }
}