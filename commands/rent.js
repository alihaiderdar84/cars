import { api } from "../utils/api.js";

export default {
  name: "rent",
  async execute(id) {
    const data = await api("/cars/rent", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    console.log(data.message);
  },
};
