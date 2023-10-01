// import { extractSelection } from "../utils/extractSelection";
import { PrismaClient } from "@prisma/client";
import { UserInput } from "interfaces";

const prisma = new PrismaClient();

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUsers = async () => {
  return await prisma.user.findMany();
}

export const createUser = async ({ name, email, role }: UserInput) => {
  //   const extractedSelections = extractSelection(info);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      role,
    },
  });
  return user;
};
