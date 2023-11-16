// import { expect, it, describe } from 'bun:test';
// import { isLegalMove } from './legalMove';


// describe('isLegalMove', () => {
//     it('should return true for a legal horizontal move', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [3, 3]]];
//         const cars2 = [[[0, 1], [0, 2]], [[3, 2], [3, 3]]];
//         expect(isLegalMove(cars1, cars2)).toBe(true);
//     });

//     it('should return true for a legal vertical move', () => {
//         const cars1 = [[[0, 0], [1, 0]], [[3, 2], [3, 3]]];
//         const cars2 = [[[1, 0], [2, 0]], [[3, 2], [3, 3]]];
//         expect(isLegalMove(cars1, cars2)).toBe(true);
//     });

//     it('should true for a legal move but where cars are listed in a different order', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [3, 3]]];
//         const cars2 = [[[3, 2], [3, 3]], [[0, 1], [0, 2]]];
//         expect(isLegalMove(cars1, cars2)).toBe(true);
//     });

//     it('should return false for an illegal move where a car moves diagonally', () => {
//         const cars1 = [[[0, 0], [0, 1]]];
//         const cars2 = [[[0, 1], [1, 2]]];
//         expect(isLegalMove(cars1, cars2)).toBe(false);
//     });

//     it('should return false for an illegal move where a car moves more than one space', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [4, 2]]];
//         const cars2 = [[[1, 1], [1, 2]], [[3, 2], [4, 2]]];
//         expect(isLegalMove(cars1, cars2)).toBe(false);
//     });

//     it('should return false for an illegal move where a car spreads out', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [4, 2]]];
//         const cars2 = [[[0, 1], [0, 3]], [[3, 2], [4, 2]]];
//         expect(isLegalMove(cars1, cars2)).toBe(false);
//     });

//     it('should return false for an illegal move where a car moves in both directions', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [4, 2]]];
//         const cars2 = [[[0, 1], [1, 1]], [[3, 2], [3, 3]]];
//         expect(isLegalMove(cars1, cars2)).toBe(false);
//     });

//     it('should return false for an illegal move where two cars move', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [4, 2]]];
//         const cars2 = [[[0, 1], [1, 1]], [[4, 2], [4, 3]]];
//         expect(isLegalMove(cars1, cars2)).toBe(false);
//     });

//     it('should return false for an illegal move where a car goes out of bounds', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [4, 2]]];
//         const cars2 = [[[0, 1], [0, 2]], [[3, 2], [2, 2]]];
//         expect(isLegalMove(cars1, cars2)).toBe(false);
//     });

//     it('should return false for an illegal move where two cars overlap', () => {
//         const cars1 = [[[0, 0], [0, 1]], [[3, 2], [4, 2]]];
//         const cars2 = [[[0, 1], [0, 2]], [[3, 2], [3, 3]], [[4, 2], [5, 2]]];
//         expect(isLegalMove(cars1, cars2)).toBe(false);
//     });
// });

export { };