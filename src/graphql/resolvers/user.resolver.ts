import { createUser } from "../services/user.service";

export const userResolver = {
  Query: {
    getUser() {},

    getUsers() {},
  },
  Mutation: {
    async createUser(_: any, { input }: Record<string, any>) {
      return await createUser({
        name: input.name,
        email: input.email,
        role: input.role,
      });
    },
  },
};
