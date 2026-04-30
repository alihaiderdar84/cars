import path from "path";
import fs from "fs/promises";

const carsPath = path.join(process.cwd(), "data", "cars.json");

const getCars = async () => {
  return JSON.parse(await fs.readFile(carsPath, "utf-8"));
};

const saveCars = async (cars) => {
  await fs.writeFile(carsPath, JSON.stringify(cars, null, 2));
};

const listCars = async () => {
  return getCars();
};

const getCar = async (id) => {
  id = Number(id);
  if (!id || isNaN(id)) {
    return { success: false, message: "Please provide a valid id" };
  }

  const data = await getCars();
  const car = data.find((car) => car.id === id);

  if (!car) {
    return { success: false, message: "Car not found" };
  }

  return { success: true, data: car };
};

const rentCar = async (id) => {
  id = Number(id);
  if (!id || isNaN(id)) {
    return { success: false, message: "Please provide a valid id" };
  }

  const data = await getCars();
  const car = data.find((car) => car.id === id);

  if (!car) {
    return { success: false, message: "Car not found" };
  }

  if (!car.available) {
    return { success: false, message: "The car is not available" };
  }

  car.available = false;
  await saveCars(data);

  return { success: true, message: "Car rented" };
};

const returnCar = async (id) => {
  id = Number(id);
  if (!id || isNaN(id)) {
    return { success: false, message: "Please provide a valid id" };
  }

  const data = await getCars();
  const car = data.find((car) => car.id === id);

  if (!car) {
    return { success: false, message: "Car not found" };
  }

  if (car.available) {
    return { success: false, message: "The car is not rented" };
  }

  car.available = true;
  await saveCars(data);

  return { success: true, message: "Car returned" };
};

export { listCars, getCar, rentCar, returnCar };
