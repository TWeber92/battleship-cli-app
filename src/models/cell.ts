import type { ShipType } from "./types";

export type Cell = {
  type: "empty" | ShipType;
  id?: number;
  hit: boolean;
};
