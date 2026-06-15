let token = null;

const getToken = () => token;

const setToken = (t) => (token = t);

const clearToken = () => (token = null);

export { setToken, getToken, clearToken };
