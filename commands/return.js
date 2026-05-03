import { api } from "../utils/api.js";

export default {
  name: "return",
  async execute(id) {
    const data = await api("/cars/return", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    console.log(data.message);
  },
};
