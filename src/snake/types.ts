export enum Direction {
  Up = 3,
  Down = 1,
  Left = 2,
  Right = 0,
}

export enum KeyCode {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}

export enum KeyCodeToDirection {
  ArrowUp = Direction.Up,
  ArrowDown = Direction.Down,
  ArrowLeft = Direction.Left,
  ArrowRight = Direction.Right,
}

export const KeyCodeToDirectionMap = new Map<string, Direction>([
  ["ArrowUp", Direction.Up],
  ["ArrowDown", Direction.Down],
  ["ArrowLeft", Direction.Left],
  ["ArrowRight", Direction.Right],
]);

export type Coord = { x: number; y: number };

export type Square = {
  value: number;
  coord: Coord;
};

export type Snake = Coord[];

export type BoardSize = { width: number; height: number };
