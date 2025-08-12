import { Display } from "../cli/display";
import { Board } from "../models/board";
import type { Cell } from "../models/cell";
import { Ship } from "../models/ship";
import type { BoardSize, GridCoord, ShipType } from "../models/types";

export class BoardService {
  createBoard(size: BoardSize): Board {
    const grid: Cell[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        type: "empty",
        hit: false,
      }))
    );
    return new Board(grid, this.generateShips(size, grid), size);
  }

  getShipConfig(size: BoardSize) {
    return {
      4: { small: 1, large: 1 },
      5: { small: 2, large: 1 },
      6: { small: 2, large: 2 },
    }[size];
  }
  generateShips(size: BoardSize, grid: Cell[][]): Ship[] {
    return Object.entries(this.getShipConfig(size))
      .flatMap(([type, count]) =>
        Array.from({ length: count }, () => {
          const ship = new Ship(type as ShipType);
          return this.placeShip(ship, grid, size) ? ship : [];
        })
      )
      .flat();
  }
  getCoords(ship: Ship, grid: Cell[][], size: BoardSize): GridCoord {
    for (let attempts = 0; attempts < size * 5; attempts++) {
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      const coords: GridCoord = [];
      const start = Math.floor(Math.random() * size);

      for (let i = 0; i < ship.size; i++) {
        const row = orientation === "horizontal" ? start : start + i;
        const col = orientation === "horizontal" ? start + i : start;

        if (row >= size || col >= size || grid[row]![col]!.type !== "empty") {
          break;
        }
        coords.push([row, col]);
      }
      if (coords.length === ship.size) {
        return coords;
      }
    }
    return [];
  }
  placeShip(ship: Ship, grid: Cell[][], size: BoardSize): boolean {
    const coords = this.getCoords(ship, grid, size);
    if (!coords) return false;

    coords.forEach(([row, col]) => {
      grid[row]![col] = {
        type: ship.type,
        id: ship.id,
        hit: false,
      };
    });
    ship.coords = coords;
    return true;
  }
  isShipSunk(board: Board) {
    return board.ships.forEach((ship) => {
      if (
        !ship.sunk &&
        ship.coords.every(([row, col]) => board.grid[row]![col]!.hit)
      ) {
        ship.sunk = true;
        Display.shipSunk(ship);
      }
    });
  }

  hasFleetSank(board: Board): boolean {
    return board.ships.every((ship) => ship.sunk);
  }
}
