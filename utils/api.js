export const api = async (path, options = {}) => {
  const endPoint = `http://localhost:3000${path}`;
  const res = await fetch(endPoint, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return await res.json();
};
