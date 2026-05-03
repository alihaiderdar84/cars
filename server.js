import express from "express";
import { listCars, getCar, rentCar, returnCar } from "./services/cars.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/cars", async (req, res) => {
  const cars = await listCars();
  res.status(200).json({ success: true, data: cars });
});

app.get("/cars/:id", async (req, res, next) => {
  try {
    const car = await getCar(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

app.post("/cars/rent", async (req, res, next) => {
  try {
    const result = await rentCar(req.body.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

app.post("/cars/return", async (req, res, next) => {
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
  console.log(`Server listening on port ${port}`);
});
