// import { extractSelection } from "../utils/extractSelection";
import { PrismaClient } from "@prisma/client";
import { UserInput } from "interfaces";

const prisma = new PrismaClient();

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
  //   const extractedSelections = extractSelection(info);
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
