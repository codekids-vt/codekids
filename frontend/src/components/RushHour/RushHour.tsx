import { useState } from "react";
import Graph from "./Graph";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"; // The default
import { isLegalMove } from "./isLegalMove";
import { Car, stateId, stateIdPair } from "./types";

// function to take a cars list and convert it to a id using a hash
function carsToId(cars: Car[]): string {
  // create string based on all cars sorted by x then y always
  return cars
    .map((car) => `${car.x}-${car.y}-${car.vertical ? "v" : "h"}-${car.length}`)
    .sort()
    .join(",");
}

const initialCars: Car[] = [
  { x: 0, y: 2, vertical: true, length: 3, color: "bg-red-500" },
  { x: 4, y: 3, vertical: false, length: 2, color: "bg-blue-500" },
  { x: 2, y: 2, vertical: true, length: 2, color: "bg-green-500" },
];

const initialStates = { [carsToId(initialCars)]: initialCars };

export default function RushHour() {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [states, setStates] = useState<Record<stateId, Car[]>>(initialStates);
  const [stateTransitions, setStateTransitions] = useState<
    [stateId, stateId][]
  >([]);
  const [message] = useState<string | null>(null);
  const [transitionsEdges, setTransitionsEdges] = useState<
    Record<stateIdPair, [stateId, stateId]>
  >({});

  function setNewCarsState(newCars: Car[]) {
    // utility to update cars, states, and stateTransitions at the same time
    const lastState = carsToId(cars);
    const newState = carsToId(newCars);
    setStates((states) => {
      return { ...states, [newState]: newCars };
    });
    setStateTransitions((transitions) => {
      return [...transitions, [lastState, newState]];
    });
    setTransitionsEdges((edges) => {
      return { ...edges, [`${lastState}-${newState}`]: [lastState, newState] };
    });
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
    } else {
      // trigger a rerender so the draggable goes back to the original position
      setCars([...cars]);
    }
  }

  console.log("cars", cars);
  console.log("state", state);
  console.log("states", states);
  console.log("stateTransitions", stateTransitions);

  return (
    <div className="flex flex-row px-2 gap-4 h-[calc(100vh-8rem)] w-full pt-8">
      {/* column of buttons for options */}
      <div className="flex flex-col items-center rounded-2xl min-h-full bg-white border-2 border-gray-400">
        <div className="flex flex-col p-4 gap-4">
          <button
            className="px-4 py-2 bg-primary-green rounded-full text-white"
            onClick={() => {}}
          >
            Undo
          </button>
        </div>
      </div>
      <div className="min-h-full w-full items-center flex flex-row justify-center">
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
      </div>
      <div className="flex flex-col items-center rounded-xl bg-white border-2 border-gray-500  w-full">
        <div className="text-2xl text-center h-12">{message}</div>
        <Graph
          state={state}
          states={states}
          stateTransitions={transitionsEdges}
        />
      </div>
    </div>
  );
}
