import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../utils/db.js";
import AppError from "../utils/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (username, password) => {
  if (!username || !password)
    throw new AppError("Username and password required", 400);

  const existingUser = await db.get(
    "SELECT * FROM users WHERE username = (?)",
    [username],
  );

  if (existingUser) throw new AppError("User already exists", 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
    username,
    hashedPassword,
  ]);

  return { success: true, message: "User registered" };
};

const login = async (username, password) => {
  if (!username || !password)
    throw new AppError("Username and password required", 400);

  const user = await db.get("SELECT * FROM users WHERE username = (?)",
    [username]
  );

  if (!user)
    throw new AppError("Invalid credentials", 409);

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches)
    throw new AppError("Invalid credentials", 409);

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

    return { success: true, message: "Logged in successfully", token }
};

export { register, login };
