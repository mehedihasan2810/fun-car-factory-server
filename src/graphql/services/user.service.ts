// import { extractSelection } from "../utils/extractSelection";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInput {
  name: string;
  email: string;
  role: string;
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
