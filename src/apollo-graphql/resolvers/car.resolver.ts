import { createCar, deleteCar, getCar, getCars } from "../services/car.service";
import { Car, CarInput, CreateCarResponse } from "types";
export const carResolver = {
  Query: {
    async getCar(
      _: unknown,
      { id }: { id: string }
    ): Promise<Car | null | undefined> {
      return await getCar(id);
    },
    async getCars(): Promise<Car[] | undefined> {
      return await getCars();
    },
  },

  Mutation: {
    async createCar(
      _: unknown,
      { carInput }: { carInput: CarInput }
    ): Promise<CreateCarResponse | undefined> {
      return await createCar(carInput);
    },

    async deleteCar(
      _: unknown,
      { id }: { id: string }
    ): Promise<Car | undefined> {
      return await deleteCar(id);
    },
  },
};
