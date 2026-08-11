import * as indexQueries from "./index-queries.js";

export const getIndexMessage = async() => {
  try {
    return { message: "api/v1 index service laye4r"}
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getFirstPicture = async() => {
  try {
    const picture = await indexQueries.fetchFirstPicture();
    // console.log(picture);
    // res.status(200).json({ pictureId: picture.id, name: picture.name });
    return picture;
  } catch (error) {
    console.log(error);
    throw error;
  }
}