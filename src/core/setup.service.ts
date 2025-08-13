import type { BoardSize } from "../models/types";
import type { Cell } from "../models/cell";
import { Display } from "../cli/display";

export class SetupService {
  processGuess(cell: Cell): boolean {
    if (cell.hit) {
      console.clear();
      console.log(Display.alreadyHit);
      return false;
    }
    cell.hit = true;
    const isHit = cell.type !== "empty";
    Display.hitOrMiss(isHit);
    return isHit;
  }
  inputParser(guess: string, boardSize: BoardSize): [number, number] | null {
    const letter = guess[0]?.toUpperCase();
    const number = Number(guess.slice(1));
    let row = letter!.charCodeAt(0) - "A".charCodeAt(0);
    let col = number - 1;
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
      console.clear();
      console.log(Display.invalidCoords);
      return null;
    }
    return [row, col];
  }
}
