import { PrismaClient } from "@prisma/client";
import { CarInput } from "interfaces";

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

export const createCar = async (carInput: CarInput) => {
  const car = await prisma.car.create({
    data: {
      ...carInput,
    },
  });

  return {
    code: 200,
    message: "successfully created",
    success: true,
    car: {
      ...car,
    },
  };
};
