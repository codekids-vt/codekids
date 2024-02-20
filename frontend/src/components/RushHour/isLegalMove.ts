import { Car } from "./types";

function carsOverlap(car1: Car, car2: Car): boolean {
  let carCells1 = Array.from({ length: car1.length }, (_, i) => {
    return car1.vertical
      ? { x: car1.x, y: car1.y + i }
      : { x: car1.x + i, y: car1.y };
  });
  let carCells2 = Array.from({ length: car2.length }, (_, i) => {
    return car2.vertical
      ? { x: car2.x, y: car2.y + i }
      : { x: car2.x + i, y: car2.y };
  });
  const overlapping = carCells1.some((cell) =>
    carCells2.some(
      (otherCell) => cell.x === otherCell.x && cell.y === otherCell.y,
    ),
  );
  return overlapping;
}

export function isLegalMove(cars: Car[], car: Car, newCar: Car): boolean {
  // get all cars but the car being moved
  const otherCars = cars.filter(
    (otherCar) => otherCar.x !== car.x || otherCar.y !== car.y,
  );
  // check that the cars are not overlapping with the newCar

  if (otherCars.some((otherCar) => carsOverlap(newCar, otherCar))) {
    return false;
  }

  // check that the car is not going off the board
  let newCarCells = Array.from({ length: newCar.length }, (_, i) => {
    return newCar.vertical
      ? { x: newCar.x, y: newCar.y + i }
      : { x: newCar.x + i, y: newCar.y };
  });

  if (
    newCarCells.some(
      (cell) => cell.x < 0 || cell.x >= 6 || cell.y < 0 || cell.y >= 6,
    )
  ) {
    return false;
  }

  // check the car only moved in the direction it is facing
  if (car.vertical) {
    if (newCar.x !== car.x) {
      return false;
    }
  } else {
    if (newCar.y !== car.y) {
      return false;
    }
  }

  return true;
}
