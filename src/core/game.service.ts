import { Display } from "../cli/display";
import { Input } from "../cli/input";
import type { Cell } from "../models/cell";
import { BoardService } from "./board.service";
import { SetupService } from "./setup.service";

export class GameService {
  constructor(
    private setup: SetupService = new SetupService(),
    private boardService: BoardService = new BoardService(),
    private input: Input = new Input()
  ) {}

  async start() {
    const board = this.boardService.createBoard(
      await this.input.getBoardSize()
    );
    if (!board) return;
    console.clear();
    Display.sizeSelection(board.boardSize);
    while (true) {
      Display.printGrid(board.grid, false); //Change to true for debug mode!

      const guess = await this.input.getPlayerInput();
      if (!guess) break;

      const coords = this.setup.inputParser(guess, board.boardSize);
      if (!coords) continue;

      const isHit = this.setup.processGuess(board.grid[coords[0]]![coords[1]]!);
      if (!isHit) continue;

      this.boardService.isShipSunk(board);
      if (this.boardService.hasFleetSank(board)) {
        Display.youWin();
        break;
      }
    }
  }
}
