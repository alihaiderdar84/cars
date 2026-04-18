import { getCars, saveCars } from "../index.js";

export default {
    name: "return",
    async execute (arg) {
        if (!arg) {
        console.log("please provide an id");
        return;
    }
    const data = await getCars();
    const cars = data.cars;

    const car = cars.find(car => car.id === Number(arg));
    if (!car) {
        console.log("car not found");
        return
    }
    if(!car.available) car.available = true; else console.log("Car is not rented");
    await saveCars({ cars });
    }
}