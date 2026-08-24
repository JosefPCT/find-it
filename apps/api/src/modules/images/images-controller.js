import * as imageService from "./images-service.js";

export const getImagesRoute = [
  async(req, res) => {
    const result = await imageService.getAllImages();
    res.status(200).json(result)
  }
]