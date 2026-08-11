import * as indexService from "./index-service.js";

export const indexGetRoute = [
  async(req, res) => {
    const result = await indexService.getIndexMessage();
    res.status(200).json(result);
  }
];

export const indexPictureGetRoute = [
  async(req, res) => {
    const picture = await indexService.getFirstPicture();
    res.status(200).json(picture);
  }
]
