import { Setup } from "../core/setup.service";
import type { Cell } from "../models/cell";
import type { Ship } from "../models/ship";
import type { BoardSize } from "../models/types";

export class Display {
  static printGrid(grid: Cell[][], debug: boolean): void {
    console.table(
      grid.reduce((acc, row, i) => {
        const rowLetter = String.fromCharCode(65 + i);
        acc[rowLetter] = row.reduce((rowAcc, cell, colI) => {
          rowAcc[colI + 1] = cell.hit
            ? cell.type === "empty"
              ? "❌"
              : cell.type === "small"
              ? "🔵"
              : "🟠"
            : debug && cell.type !== "empty"
            ? cell.type === "small"
              ? "🔵"
              : "🟠"
            : " - ";
          return rowAcc;
        }, {} as Record<number, string>);
        return acc;
      }, {} as Record<string, Record<number, string>>)
    );
  }

  static describeBoards(): void {
    return console.log(`
            4x4:
             - [ ] 1 large
             - [ ] 1 small
            
            5x5:
             - [ ] 1 large
             - [ ] 2 small
            
            6x6:
             - [ ] 2 large
             - [ ] 2 small
             `);
  }

  static WelcomeMessage = `Welcome to Battleship 🚢 
          Choose a Board Size:`;

  static guessOrQuit = "Make a guess (e.g., A1, B2) or type 'quit':";

  static invalidFormat =
    "Invalid format. Please use: A1, B1, ect. or type 'quit'";

  static quitMessage = "See you next time!";

  static SizeSelection(size: BoardSize): string {
    return `You selected ${size}x${size}. Let's play!`;
  }

  static invalidCoords = "Invalid coordinates! Try Again.";

  static hitOrMiss(isHit: boolean): void {
    console.log(isHit ? "Hit! 🔥" : "Miss 💦");
  }

  static shipSunk(ship: Ship): void {
    console.log(`You sank my ${ship.type} Battle Ship! 💥`);
  }

  static youWin(): void {
    console.log(this.victoryArt);
  }
  static victoryArt = `🏳️ All Ships destroyed! 🏳️
       ========
        __   _______ _   _   _    _ _____ _   _
        \\ \\ / /  _  | | | | | |  | |_   _| \\ | |
         \\ V /| | | | | | | | |  | | | | |  \\| |
          \\ / | | | | | | | | |/\\| | | | | . ' |
          | | \\ \\_/ / |_| | \\  /\\  /_| |_| |\\  |
          \\_/  \\___/ \\___/   \\/  \\/ \\___/\\_| \\_/
       ========
`;
}
