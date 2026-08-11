import { prisma } from "@repo/database";

export const fetchFirstPicture = async() => {
  const picture = await prisma.picture.findMany();
  return picture;
}