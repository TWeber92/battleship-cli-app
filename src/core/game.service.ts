import { Display } from "../cli/display";
import { Input } from "../cli/input";
import { BoardService } from "./board.service";
import { Setup } from "./setup.service";

class Game {
  constructor(
    private setup: Setup = new Setup(),
    private boardService: BoardService = new BoardService(),
    private input: Input = new Input()
  ) {}

  async play() {
    const board = this.boardService.createBoard(
      await this.input.getBoardSize()
    );
    Display.printGrid(board.grid, false);

    while (true) {
      const guess = await this.input.getPlayerInput();
      if (!guess) break;
      const coords = this.setup.inputParser(guess, board.boardSize);
      if (!coords) continue;
      const cellType =
        this.setup.processGuess(board.grid[coords[0]]![coords[1]]!) !== "empty";
      Display.hitOrMiss(cellType);

      Display.printGrid(board.grid, false); //Change to true for debug mode!

      this.boardService.isShipSunk(board);
      if (this.boardService.hasFleetSank(board)) {
        Display.youWin();
        break;
      }
    }
  }
}
const game = new Game();
game.play();
