export function isLegalMove(cars1: Record<string, number[][]>, cars2: Record<string, number[][]>): boolean {
    // Assuming a 6x6 board
    const boardSize = 6;
    if (JSON.stringify(cars1) === JSON.stringify(cars2)) {
        return true;
    }

    // Helper function to check if a car is within the bounds of the board
    const isWithinBounds = (car: number[][]): boolean => {
        return car.every(([x, y]) => x >= 0 && x < boardSize && y >= 0 && y < boardSize);
    };

    // Helper function to check if a car moved legally
    const carMovedLegally = (car1: number[][], car2: number[][]): boolean => {
        // get whether car1 is horizontal or vertical
        let isHorizontal = car1.every(position => position[0] === car1[0][0]);
        let isVertical = car1.every(position => position[1] === car1[0][1]);

        // Cars must move in one direction, and the length must be the same
        // horizontal car example [[0, 0], [0, 1]]
        // if all x values are the same, then car moved horizontally
        let movedHorizontally = true;
        let movedVertically = true;
        for (let i = 0; i < car1.length; i++) {
            if (car1[i][0] !== car2[i][0]) {
                movedHorizontally = false;
            }
            if (car1[i][1] !== car2[i][1]) {
                movedVertically = false;
            }
        }

        return (isHorizontal && movedHorizontally && !movedVertically) || (isVertical && !movedHorizontally && movedVertically);
    };

    if (Object.keys(cars1).length !== Object.keys(cars2).length) {
        return false; // Different number of cars means it's definitely an illegal move
    }

    // build a new map of cars2
    console.log(`cars2: ${JSON.stringify(cars2)}`);
    const cars2Map = { ...cars2 };
    console.log(`cars2Map: ${JSON.stringify(cars2Map)}`);

    let movedCar: number[][] | undefined = undefined;
    let correspondingCar: number[][] | null = null;

    // get the moved car and the corresponding car
    for (const [key, car] of Object.entries(cars1)) {
        console.log(`key: ${key} car: ${car}`);
        if (!cars2Map[key]) {
            console.log(`cars2Map[key]: ${cars2Map[key]}`);
            return false; // cars1 has a car that cars2 doesn't have, so the move is illegal
        }
        if (JSON.stringify(car) !== JSON.stringify(cars2Map[key])) {
            console.log(`JSON.stringify(car) !== JSON.stringify(cars2Map[key]): ${JSON.stringify(car)} ${JSON.stringify(cars2Map[key])}`);
            if (movedCar) {
                return false; // cars1 has more than one car that moved, so the move is illegal
            }
            movedCar = car
        } else {
            delete cars2Map[key];
        }
    }

    console.log(`movedCar: ${movedCar}`);
    if (!movedCar) {
        return true; // No car moved, so the move is legal
    }
    // first check if only one car left in map
    console.log(`Object.keys(cars2Map).length: ${Object.keys(cars2Map).length}`);
    if (Object.keys(cars2Map).length !== 1) {
        return false;
    }
    // get corresponding car as last one in map
    for (const car of Object.values(cars2Map)) {
        correspondingCar = car;
    }
    // check if corresponding car is null
    if (!correspondingCar) {
        return false;
    }

    console.log(`movedCar: ${movedCar} correspondingCar: ${correspondingCar}`);
    // If the car didn't move legally (in one direction), the move is illegal
    if (!carMovedLegally(movedCar, correspondingCar)) {
        return false;
    }

    // Check if the car is still within bounds
    if (!isWithinBounds(correspondingCar)) {
        return false;
    }

    // At this point, we know that each car from cars1 has a corresponding car in cars2
    // Now check for overlap between correspondingCar and all other cars in cars2
    // Check if any of the positions in correspondingCar overlap with any of the positions in car
    const overlap = correspondingCar.some(position1 => {
        return Object.values(cars2).filter(car => car !== correspondingCar).some(car => {
            return car.some(position2 => {
                return position1[0] === position2[0] && position1[1] === position2[1];
            });
        });
    });

    if (overlap) {
        console.log(`overlap: ${overlap}`);
        return false;
    }

    return true;
}
