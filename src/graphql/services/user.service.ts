// import { extractSelection } from "../utils/extractSelection";
import { UserInput } from "interfaces";
import { prisma } from "../../../prisma";

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
