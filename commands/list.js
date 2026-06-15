import { api } from "../utils/api.js";

export default {
  name: "list",
  async execute(rl) {
    const res = await api("/cars");
    if (!res.success) return console.log(res.message);

    const cars = res.data;

    for (const car of cars) {
      console.log(
        `${car.available ? "Available: " : "Rented: "} ${car.name} Id: ${car.id}\n`,
      );
    }
  },
};
