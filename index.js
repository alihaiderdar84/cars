#!/usr/bin/env node
import fs from "fs/promises";

const getCars = async () => {
    return JSON.parse(await fs.readFile("./cars.json", "utf-8"));
}

const saveCars = async cars => {
    await fs.writeFile("./cars.json", JSON.stringify(cars, null, 2));
}

const data = await getCars();
const cars = data.cars;

const listCars = () => {
    for (const car of cars) {
        console.log(`${car.available ? "Available: " : "Rented: "} ${car.name} Id: ${car.id}\n`)
    }
}

const rentCar = async id => {
    if (!id) {
        console.log("please provide an id");
        return;
    }
    const car = cars.find(car => car.id === Number(id));
    if (!car) {
        console.log("car not found");
        return
    }
    if(car.available) car.available = false; else console.log("Car is not available");
    await saveCars({ cars });
}

const returnCar = async id => {
    if (!id) {
        console.log("please provide an id");
        return;
    }
    const car = cars.find(car => car.id === Number(id));
    if (!car) {
        console.log("car not found");
        return
    }
    if(!car.available) car.available = true; else console.log("Car is not rented");
    await saveCars({ cars });
}

const [,, cmd, id] = process.argv;


switch(cmd) {
    case "list":
        listCars();
        break;
    case "rent":
        rentCar(id);
        break;
    case "return":
        returnCar(id);
        break;
    default:
        console.log("Invalid Command");
}