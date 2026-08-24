import * as imageService from "./images-service.js";

export const postImagesRoute = [
  async(req, res) => {
    res.status(200).json({message: 'POST images route'});
  }
]

export const getImagesRoute = [
  async(req, res) => {
    const result = await imageService.getAllImages();
    res.status(200).json(result)
  }
]

export const getSpecificImageRoute = [
  async(req, res) => {
    res.status(200).json({message: 'Specific Image Route'})
  }
]