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

export const getSpecificImage = async(publicId) => {
  try {
    const image = await imageQueries.fetchSpecificImage(publicId);
    return image;
  } catch (error) {
    console.log(error);
    throw error;
  }
}