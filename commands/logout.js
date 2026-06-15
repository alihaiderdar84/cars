import { clearToken } from "../utils/session.js";

export default {
  name: "logout",
  async execute(rl) {

    clearToken();

    console.log("You are logged out");
  },
};
