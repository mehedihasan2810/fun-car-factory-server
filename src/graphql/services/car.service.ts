import { PrismaClient } from "@prisma/client";
import { CarInput } from "interfaces";

const prisma = new PrismaClient();

export const getCars = async () => {
  try {
    return await prisma.car.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const getCar = async (id: string) => {
  try {
    return await prisma.car.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCar = async (carInput: CarInput) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
