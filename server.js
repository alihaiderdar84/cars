import express from "express";
import { listCars, getCar, rentCar, returnCar } from "./services/cars.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/cars", async (req, res) => {
  const cars = await listCars();
  res.status(200).json({ success: true, data: cars });
});

app.get("/cars/:id", async (req, res) => {
  const car = await getCar(req.params.id);
  if (!car.success) {
    return res.status(404).json(car);
  }
  res.status(200).json(car);
});

app.post("/cars/rent", async (req, res) => {
  const result = await rentCar(req.body.id);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
});

app.post("/cars/return", async (req, res) => {
  const result = await returnCar(req.body.id);
  if (!result.success) {
    return res.status(400).json(result);
  }
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
