import type { ShipType } from "./types";

export class Ship {
  static nextId = 1;
  constructor(
    public type: ShipType,
    public id: number = Ship.nextId++,
    public size: number = type === "small" ? 2 : 3,
    public sunk: boolean = false,
    public coords: [number, number][] = []
  ) {}
}
