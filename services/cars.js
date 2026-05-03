import { db } from "../utils/db.js";
import AppError from "../utils/AppError.js";

const getCars = async () => {
  const cars = await db.all("SELECT * FROM cars");

  return cars.map((car) => ({
    ...car,
    available: Boolean(car.available),
  }));
};

const listCars = async () => {
  return getCars();
};

const getCar = async (id) => {
  id = Number(id);
  if (!id || isNaN(id)) {
    throw new AppError("Please provide a valid id", 400);
  }

  let car = await db.get("SELECT * FROM cars WHERE id = ?", [id]);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  car = {
    ...car,
    available: Boolean(car.available),
  };

  return { success: true, data: car };
};

const rentCar = async (id) => {
  id = Number(id);
  if (!id || isNaN(id)) {
    throw new AppError("Please provide a valid id", 400);
  }

  const car = await db.get("SELECT * FROM cars WHERE id = ?", [id]);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  if (!car.available) {
    throw new AppError("The car is not available", 409);
  }

  await db.run("UPDATE cars SET available = 0 WHERE id = ?", [id]);

  return { success: true, message: "Car rented" };
};

const returnCar = async (id) => {
  id = Number(id);
  if (!id || isNaN(id)) {
    throw new AppError("Please provide a valid id", 400);
  }

  const car = await db.get("SELECT * FROM cars WHERE id = ?", [id]);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  if (car.available) {
    throw new AppError("The car is not rented", 409);
  }

  await db.run("UPDATE cars SET available = 1 WHERE id = ?", [id]);
  return { success: true, message: "Car returned" };
};

export { listCars, getCar, rentCar, returnCar };
