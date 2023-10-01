import { UserInput } from "interfaces";
import { createUser, getUser, getUsers } from "../services/user.service";

export const userResolver = {
  Query: {
    async getUser(_: any, args: Record<string, unknown>) {
      return await getUser(args.email as string);
    },

    async getUsers() {
      return await getUsers();
    },
  },
  Mutation: {
    async createUser(_: any, { input }: Record<string, unknown>) {
      return await createUser(input as UserInput);
    },
  },
};
