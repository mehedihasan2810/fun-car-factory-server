import { createUser, getUser, getUsers } from "../services/user.service";
import { User, UserInput, CreateUserResponse } from "types";

export const userResolver = {
  Query: {
    async getUser(
      _: unknown,
      { email }: { email: string }
    ): Promise<User | undefined | null> {
      return await getUser(email);
    },

    async getUsers(): Promise<User[] | undefined> {
      return await getUsers();
    },
  },
  Mutation: {
    async createUser(
      _: unknown,
      { input }: { input: UserInput }
    ): Promise<CreateUserResponse | undefined> {
      return await createUser(input);
    },
  },
};
