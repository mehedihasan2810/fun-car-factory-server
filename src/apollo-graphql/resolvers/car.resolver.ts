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
    /*
     * Gets a car by ID.
     * @param _ - Placeholder variable.
     * @param id - The ID of the car to be retrieved.
     * @returns A promise resolving to the car found or null if not found.
     */
    async getCar(
      _: unknown,
      { id }: { id: string }
    ): Promise<Car | null | undefined> {
      return await getCar(id);
    },

    // -----------------------------------------------

    /*
     * Gets all cars.
     * @param _ - Placeholder variable.
     * @param __ - Placeholder variable.
     * @param context - The context object containing authorization information.
     * @param info - Information about the query, including the path.
     * @returns A promise resolving to an array of cars.
     */
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

    /*
     * Gets cars based on their IDs.
     * @param _ - Placeholder variable.
     * @param cartIds - The IDs of the cars to be retrieved.
     * @returns A promise resolving to an array of cars.
     */
    async getCartCar(
      _: unknown,
      { cartIds }: { cartIds: string[] }
    ): Promise<Car[] | undefined> {
      return getCartCar(cartIds);
    },
  },

  // ----------------------------------------------------

  Mutation: {
    /*
     * Creates a new car.
     * @param _ - Placeholder variable.
     * @param carInput - The input data for creating a car.
     * @param context - The context object containing authorization information.
     * @returns A promise resolving to the response containing the created car.
     */
    async createCar(
      _: unknown,
      { carInput }: { carInput: CarInput },
      context: MyContext
    ): Promise<CreateCarResponse | undefined> {
      verifyJwt(context?.authorization);

      return await createCar(carInput);
    },

    // ---------------------------------------------------------

    /*
     * Updates an existing car.
     * @param _ - Placeholder variable.
     * @param updateInput - The updated data for the car.
     * @param context - The context object containing authorization information.
     * @returns A promise resolving to the updated car.
     */
    async updateCar(
      _: unknown,
      { updateInput }: { updateInput: Car },
      context: MyContext
    ) {
      verifyJwt(context?.authorization);
      return await updateCar(updateInput);
    },

    // -----------------------------------------------------------

    /*
     * Deletes a car by ID.
     * @param _ - Placeholder variable.
     * @param id - The ID of the car to be deleted.
     * @param context - The context object containing authorization information.
     * @returns A promise resolving to the deleted car.
     */
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
