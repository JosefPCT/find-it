import { prisma } from "@repo/database";

export const fetchAllImages = async() => {
  const images = await prisma.image.findMany();
  return images;
}

export const fetchSpecificImage = async(targetPublicId) => {
  const image = await prisma.image.findFirst({
    where: {
      publicId: targetPublicId
    },
    include: {
      tags: true,
      scores: {
        take: 3,
        orderBy: {
          finalTime: 'asc'
        }
      }
    }
  })
  return image;
}