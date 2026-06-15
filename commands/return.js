import { api } from "../utils/api.js";

export default {
  name: "return",
  async execute(rl) {
    const id = await rl.question("Id of the car: ");
    const data = await api("/cars/return", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    console.log(data.message);
  },
};
