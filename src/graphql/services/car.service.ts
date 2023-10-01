import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCars = async () => {
  return await prisma.car.findMany();
};

export const getCar = async (id: string) => {
  return await prisma.car.findUnique({
    where: {
      id,
    },
  });
};
