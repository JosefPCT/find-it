import { prisma } from "@repo/database";

export const createImageScoreByImageId = async(imageId, data) => {
  const createdImage = await prisma.score.create({
    data: {
      imageId: imageId,
      name: data.name,
      startTime: data.startTime,
      endTime: data.endTime,
      finalTime: data.finalTime
    }
  })
}

export const fetchAllImageScores = async(imageId) => {
  const images = await prisma.score.findMany({
    take: 3,
    // skip: 1,
    where: {
      imageId: imageId
    },
    orderBy: {
      finalTime: "asc"
    }
  });
  return images;
}