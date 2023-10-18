import { verifyJwt } from "../../jwt-helpers/verifyJwt";
import {
  createCar,
  deleteCar,
  getCar,
  getCars,
  getCartCar,
  updateCar,
} from "../services/car.service";
import { Car, CarInput, CreateCarResponse, MyContext } from "types";
export const carResolver = {
  Query: {
    async getCar(
      _: unknown,
      { id }: { id: string }
    ): Promise<Car | null | undefined> {
      return await getCar(id);
    },

    // -----------------------------------------------

    async getCars(
      _: unknown,
      __: unknown,
      context: MyContext,
      info: Record<string, any>
    ): Promise<Car[] | undefined> {
      if (info.path.key === "myCars") {
        verifyJwt(context?.authorization);
      }
      return await getCars();
    },

    // --------------------------------------------------

    async getCartCar(
      _: unknown,
      { cartIds }: { cartIds: string[] }
    ): Promise<Car[] | undefined> {
      return getCartCar(cartIds);
    },
  },

  // ----------------------------------------------------

  Mutation: {
    async createCar(
      _: unknown,
      { carInput }: { carInput: CarInput },
      context: MyContext
    ): Promise<CreateCarResponse | undefined> {
      verifyJwt(context?.authorization);

      return await createCar(carInput);
    },

    // ---------------------------------------------------------

    async updateCar(
      _: unknown,
      { updateInput }: { updateInput: Car },
      context: MyContext
    ) {
      verifyJwt(context?.authorization);
      return await updateCar(updateInput);
    },

    // -----------------------------------------------------------

    async deleteCar(
      _: unknown,
      { id }: { id: string },
      context: MyContext
    ): Promise<Car | undefined> {
      verifyJwt(context?.authorization);
      return await deleteCar(id);
    },
  },
};
