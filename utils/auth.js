import jwt from "jsonwebtoken";
import AppError from "./AppError.js";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) throw new AppError("You must be logged in to use this command", 401);

  const token = header.split(" ")[1];

  if (!token) throw new AppError("Invalid Authorization header", 401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(new AppError("Invalid token", 401));
  }
};

export { auth };
