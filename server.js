import "dotenv/config";
import express from "express";
import { register, login } from "./services/auth.js";
import { auth } from "./utils/auth.js";
import { listCars, getCar, rentCar, returnCar } from "./services/cars.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/cars/register", async (req, res, next) => {
  try {
    const result = await register(req.body.username, req.body.password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

app.post("/cars/login", async (req, res, next) => {
  try {
    const result = await login(req.body.username, req.body.password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

app.get("/cars", auth, async (req, res) => {
  const cars = await listCars();
  res.status(200).json({ success: true, data: cars });
});

app.get("/cars/:id", auth, async (req, res, next) => {
  try {
    const car = await getCar(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

app.post("/cars/rent", auth, async (req, res, next) => {
  try {
    const result = await rentCar(req.body.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

app.post("/cars/return", auth, async (req, res, next) => {
  try {
    const result = await returnCar(req.body.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
