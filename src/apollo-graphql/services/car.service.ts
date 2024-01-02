import { Car, CarInput, CreateCarResponse } from "types";
import { prisma } from "../../../prisma/index.prisma";

/**
 * Gets all cars from the database.
 * @returns A promise resolving to an array of cars.
 */
export const getCars = async (): Promise<Car[] | undefined> => {
  try {
    return await prisma.car.findMany();
  } catch (error) {
    console.log(error);
  }
};

// -----------------------------------------------------------------

/**
 * Gets a car by ID from the database.
 * @param id - The ID of the car.
 * @returns A promise resolving to the car found or null if not found.
 */
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

// --------------------------------------------------------------------

/**
 * Creates a new car in the database.
 * @param carInput - The input data for creating a car.
 * @returns A promise resolving to the response containing the created car.
 */
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

// --------------------------------------------------------------------------

/**
 * Updates a car in the database.
 * @param updateInput - The input data for updating a car.
 * @returns A promise resolving to the updated car.
 */
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

// --------------------------------------------------------------------------

/**
 * Deletes a car from the database.
 * @param id - The ID of the car to be deleted.
 * @returns A promise resolving to the deleted car.
 */
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

// --------------------------------------------------------------------------

/**
 * Gets cars by their IDs from the database.
 * @param ids - An array of car IDs.
 * @returns A promise resolving to an array of cars.
 */
export const getCartCar = async (ids: string[]): Promise<Car[] | undefined> => {
  try {
    const cartCars = await prisma.car.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return cartCars;
  } catch (error) {
    console.error(error);
  }
};
