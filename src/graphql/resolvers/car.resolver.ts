import { getCars } from "../services/car.service";

export const carResolver = {
  Query: {
    async getCars() {
    return await getCars();
    },
  },
};
