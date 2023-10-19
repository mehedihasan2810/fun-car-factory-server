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
    async getUser(
      _: unknown,
      { email }: { email: string },
      context: MyContext
    ): Promise<User | undefined | null> {
      verifyJwt(context?.authorization);
      return await getUser(email);
    },

    // ---------------------------------------

    async getUsers(
      _: unknown,
      __: unknown,
      context: MyContext
    ): Promise<User[] | undefined> {
      verifyJwt(context?.authorization);
      return await getUsers();
    },
  },

  // -----------------------------------------------

  Mutation: {
    async createUser(
      _: unknown,
      { input }: { input: UserInput }
    ): // context: MyContext
    Promise<CreateUserResponse | undefined> {
      return await createUser(input);
    },

    // -----------------------------------------------------

    async deleteUser(
      _: unknown,
      { email }: { email: string },
      context: MyContext
    ): Promise<User> {
      verifyJwt(context?.authorization);
      return await deleteUser(email);
    },

    // --------------------------------------------------------

    async getToken(
      _: unknown,
      { email }: { email: string }
    ): Promise<{ token: string }> {
      const token = signJwt(email);
      return { token };
    },
  },
};
