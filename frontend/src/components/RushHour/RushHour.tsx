import { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"; // The default
import { isLegalMove } from "./isLegalMove";
import { Car } from "./types";

// function to take a cars list and convert it to a id using a hash
function carsToId(cars: Car[]): string {
  // create string based on all cars sorted by x then y always
  return cars
    .map((car) => `${car.x}-${car.y}-${car.vertical ? "v" : "h"}-${car.length}`)
    .sort()
    .join(",");
}

function isComplete(cars: Car[]): boolean {
  return cars[0].x === 4;
}

export default function RushHour({
  initialCars,
  onCompletion,
}: {
  initialCars: Car[];
  onCompletion: () => void;
}) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  function setNewCarsState(newCars: Car[]) {
    setCars(newCars);
  }

  let state = carsToId(cars);

  let grid: string[][] = [];
  for (let i = 0; i < 6; i++) {
    grid.push([]);
    for (let j = 0; j < 6; j++) {
      grid[i].push("white");
    }
  }

  const cellWidth = 63.333;

  function handleDragStop(_: DraggableEvent, data: DraggableData) {
    let oldCar = JSON.parse(data.node.id);
    const x = Math.round(data.x / cellWidth);
    const y = Math.round(data.y / cellWidth);
    let newCar = { ...oldCar, x, y };
    // if the same do nothing
    if (oldCar.x === newCar.x && oldCar.y === newCar.y) {
      return;
    }
    if (isLegalMove(cars, oldCar, newCar)) {
      let newCars = cars.map((car) =>
        car.x === oldCar.x && car.y === oldCar.y ? newCar : car,
      );
      setNewCarsState(newCars);
      if (isComplete(newCars)) {
        onCompletion();
      }
    } else {
      // trigger a rerender so the draggable goes back to the original position
      setCars([...cars]);
    }
  }

  console.log("cars", cars);
  console.log("state", state);

  return (
    <div className="relative grid grid-cols-6 aspect-square w-96 h-96 grid-rows-6 justify-between gap-1 bg-black p-1">
      {grid.map((row, i) =>
        row.map((_, j) => (
          <div key={`${i}-${j}`} className={`bg-white aspect-square`}>
            {/* {j},{i} */}
          </div>
        )),
      )}
      {cars.map((car, i) => {
        const inset = 4;
        const carWidth =
          (car.vertical ? cellWidth : cellWidth * car.length) - inset * 2;
        const carHeight =
          (car.vertical ? cellWidth * car.length : cellWidth) - inset * 2;

        const carUnitWidth = car.vertical ? 1 : car.length;
        const carUnitHeight = car.vertical ? car.length : 1;

        // console.log(car, carUnitWidth, carUnitHeight);

        return (
          <Draggable
            key={i}
            axis={car.vertical ? "y" : "x"}
            handle=".handle"
            grid={[cellWidth, cellWidth]}
            scale={1}
            position={{ x: car.x * cellWidth, y: car.y * cellWidth }}
            bounds={{
              left: 0,
              top: 0,
              right: cellWidth * (6 - carUnitWidth),
              bottom: cellWidth * (6 - carUnitHeight),
            }}
            onStop={handleDragStop}
          >
            <div
              className={`absolute ${car.color} handle rounded-xl`}
              style={{
                width: carWidth,
                height: carHeight,
                top: 2 + inset,
                left: 2 + inset,
              }}
              id={JSON.stringify(car)}
            ></div>
          </Draggable>
        );
      })}
    </div>
  );
}
