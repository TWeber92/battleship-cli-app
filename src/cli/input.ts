import { input, select } from "@inquirer/prompts";
import type { BoardSize } from "../models/types";
import { Display } from "./display";

export class Input {
  async getBoardSize(): Promise<BoardSize> {
    Display.describeBoards();
    const size = await select({
      message: Display.WelcomeMessage,
      choices: [
        { name: "4x4", value: 4 },
        { name: "5x5", value: 5 },
        { name: "6x6", value: 6 },
        { name: "Quit Game", value: null },
      ],
    });
    return size as BoardSize;
  }

  async getPlayerInput(): Promise<string | null> {
    const guess = await input({
      message: Display.guessOrQuit,
      validate: (value) =>
        /^(?:[A-Za-z]\d+|quit)$/i.test(value) || Display.invalidFormat,
    });
    if (guess === "quit") {
      Display.quitMessage;
      return null;
    }
    return guess.toLowerCase();
  }
}
