import { signJwt } from "../../jwt-helpers/signJwt";
import { verifyJwt } from "../../jwt-helpers/verifyJwt";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "../services/user.service";
import { User, UserInput, CreateUserResponse, MyContext } from "types";

export const userResolver = {
  Query: {
    /*
     * Gets a user by email.
     * @param _ - Placeholder variable.
     * @param email - The email of the user to be retrieved.
     * @param context - The context object containing authorization information.
     * @returns A promise resolving to the user found or null if not found.
     */
    async getUser(
      _: unknown,
      { email }: { email: string },
      context: MyContext
    ): Promise<User | undefined | null> {
      verifyJwt(context?.authorization);
      return await getUser(email);
    },

    // ---------------------------------------

    /*
     * Gets all users.
     * @param _ - Placeholder variable.
     * @param __ - Placeholder variable.
     * @param context - The context object containing authorization information.
     * @returns A promise resolving to an array of users.
     */
    async getUsers(
      _: unknown,
      __: unknown,
      context: MyContext
    ): Promise<User[] | undefined> {
      verifyJwt(context?.authorization);
      return await getUsers();
    },

    // ---------------------------------------------

    /*
     * Gets a token for the provided email.
     * @param _ - Placeholder variable.
     * @param email - The email for which to generate the token.
     * @returns A promise resolving to an object containing the generated token.
     */
    async getToken(
      _: unknown,
      { email }: { email: string }
    ): Promise<{ token: string }> {
      const token = signJwt(email);
      return { token };
    },
  },

  // -----------------------------------------------

  Mutation: {
    /*
     * Creates a new user.
     * @param _ - Placeholder variable.
     * @param input - The input data for creating a user.
     * @returns A promise resolving to the response containing the created user.
     */
    async createUser(
      _: unknown,
      { input }: { input: UserInput }
    ): // context: MyContext
    Promise<CreateUserResponse | undefined> {
      return await createUser(input);
    },

    // -----------------------------------------------------

    /*
     * Deletes a user by email.
     * @param _ - Placeholder variable.
     * @param email - The email of the user to be deleted.
     * @param context - The context object containing authorization information.
     * @returns A promise resolving to the deleted user.
     */
    async deleteUser(
      _: unknown,
      { email }: { email: string },
      context: MyContext
    ): Promise<User> {
      verifyJwt(context?.authorization);
      return await deleteUser(email);
    },
  },
};
