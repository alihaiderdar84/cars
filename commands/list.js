import { getCars } from "../index.js"

export default {
    name: "list",
    async execute(arg) {
        const data = await getCars();
        const cars = data.cars;

        for (const car of cars) {
        console.log(`${car.available ? "Available: " : "Rented: "} ${car.name} Id: ${car.id}\n`)
    }
    }
}