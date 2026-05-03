import { api } from "../utils/api.js";

export default {
  name: "list",
  async execute(arg) {
    const data = await api("/cars");
    const cars = data.data;

    for (const car of cars) {
      console.log(
        `${car.available ? "Available: " : "Rented: "} ${car.name} Id: ${car.id}\n`,
      );
    }
  },
};
