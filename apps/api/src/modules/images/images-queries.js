import { prisma } from "@repo/database";

export const fetchAllImages = async() => {
  const images = await prisma.image.findMany();
  return images;
}