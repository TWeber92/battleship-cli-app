import { Ship } from "./ship";
import type { Cell } from "./cell";
import type { BoardSize } from "./types";
import { Display } from "../cli/display";

export class Board {
  constructor(
    public grid: Cell[][],
    public ships: Ship[],
    public boardSize: BoardSize
  ) {}
}
