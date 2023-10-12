import { Car, CarInput, CreateCarResponse } from "types";
import { prisma } from "../../../prisma/index.prisma";

export const getCars = async (): Promise<Car[] | undefined> => {
  try {
    return await prisma.car.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const getCar = async (id: string): Promise<Car | null | undefined> => {
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

export const createCar = async (
  carInput: CarInput
): Promise<CreateCarResponse | undefined> => {
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

export const updateCar = async (updateInput: Car): Promise<Car | undefined> => {
  try {
    const { id, ...updateData } = updateInput;

    return await prisma.car.update({
      where: {
        id,
      },
      data: updateData,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCar = async (id: string): Promise<Car | undefined> => {
  try {
    return await prisma.car.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
