import { api } from "../utils/api.js";
import { setToken } from "../utils/session.js";

export default {
  name: "login",
  async execute(rl) {
    const username = await rl.question("Enter your username: ");
    const password = await rl.question("Enter your password: ");

    const data = await api("/cars/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    setToken(data.token);

    console.log(data.message);
  },
};
