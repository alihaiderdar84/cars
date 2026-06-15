import { getToken } from "./session.js";

const api = async (path, options = {}) => {

  const port = process.env.PORT;
  const token = getToken();
  const endPoint = `http://localhost:${port}${path}`;

  const res = await fetch(endPoint, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
  
  return await res.json();
};

export { api };
