import { getCars } from "../services/car.service";
import { getCar } from "../services/car.service";

export const carResolver = {
  Query: {
    async getCars() {
      return await getCars();
    },

    async getCar(_: any, args: Record<string, unknown>) {
      return await getCar(args.id as string);
    },
  },
};
