import { UserInput } from "interfaces";
import { createUser, getUser } from "../services/user.service";

export const userResolver = {
  Query: {
    async getUser(_: any, args: Record<string, unknown>) {
      return await getUser(args.email as string);
    },

    getUsers() {},
  },
  Mutation: {
    async createUser(_: any, { input }: Record<string, unknown>) {
      return await createUser(input as UserInput);
    },
  },
};
