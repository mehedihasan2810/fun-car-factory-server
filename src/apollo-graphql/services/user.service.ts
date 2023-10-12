import { UserInput } from "types";
import { prisma } from "../../../prisma/index.prisma";

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async ({ name, email, role }: UserInput) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};
