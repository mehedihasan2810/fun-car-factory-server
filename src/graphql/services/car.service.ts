// import { extractSelection } from "../utils/extractSelection";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getCars = async () => {
  //   const extractedSelections = extractSelection(info);
  return await prisma.car.findMany();
};


