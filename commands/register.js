import { api } from "../utils/api.js";

export default {
  name: "register",
  async execute(rl) {
    const username = await rl.question("Enter your username: ");
    const password = await rl.question("Enter your password: ");

    const data = await api("/cars/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    console.log(data.message);
  },
};