import type { stardust } from "@nebula.js/stardust";
import { Direction, type Coord, type Snake, type BoardSize } from "./types";

export const SQUARE_SIZE = 48;
export const MARGIN = 1;

export const randomNumber = (max: number) => Math.floor(Math.random() * max);

export const randomDirection = () => randomNumber(4);

export const getOppositeDirection = (direction: Direction) =>
  (direction + 2) % 4;

export const getRandomCoord = (boardSize: BoardSize, margin = 0): Coord => ({
  x: randomNumber(boardSize.width - margin),
  y: randomNumber(boardSize.height - margin),
});

export const areCoordsEqual = (
  coordOne: Coord | undefined,
  coordTwo: Coord | undefined
) =>
  !!coordOne &&
  !!coordTwo &&
  coordOne.x === coordTwo.x &&
  coordOne.y === coordTwo.y;

export const isCoordSnake = (squareCoord: Coord, snake: Snake) =>
  snake.some((coord) => areCoordsEqual(squareCoord, coord));

export const isCoordTail = (squareCoord: Coord, snake: Snake) =>
  snake.some((coord, i) => i > 0 && areCoordsEqual(squareCoord, coord));

export const getNeighborCoord = (
  coord: Coord,
  direction: Direction,
  boardSize: BoardSize
): Coord => {
  const { x, y } = coord;

  switch (direction) {
    case Direction.Up:
      return { x, y: y === 0 ? boardSize.height - 1 : y - 1 };
    case Direction.Down:
      return { x, y: y === boardSize.height - 1 ? 0 : y + 1 };
    case Direction.Left:
      return { y, x: x === 0 ? boardSize.width - 1 : x - 1 };
    case Direction.Right:
      return { y, x: x === boardSize.width - 1 ? 0 : x + 1 };
    default:
      return coord;
  }
};

export const getInitSnake = ({ height, width }: BoardSize): Snake => {
  const midHeight = Math.floor(height / 2);
  const midWidth = Math.floor(width / 2);
  return [
    { x: midWidth + 1, y: midHeight - 1 },
    { x: midWidth, y: midHeight - 1 },
    { x: midWidth - 1, y: midHeight - 1 },
  ];
};

export const spawnFood = (snake: Snake, boardSize: BoardSize): Coord => {
  let food = getRandomCoord(boardSize);
  while (isCoordSnake(food, snake)) {
    food = getRandomCoord(boardSize);
  }
  return food;
};

export const calculateSize = (pixelSize: number) => {
  const unevenSize = Math.floor((pixelSize - SQUARE_SIZE * 2) / SQUARE_SIZE);
  return unevenSize - (unevenSize % 2) + 1;
};

export const getBoardSize = (rect: stardust.Rect) => ({
  width: calculateSize(rect.width),
  height: calculateSize(rect.height),
});

export const getSnakeColor = (squareCoord: Coord, snake: Snake) => {
  const MIN_VALUE = 25;
  const MAX_VALUE = 180;
  const tailIndex = snake.findIndex((coord) =>
    areCoordsEqual(coord, squareCoord)
  );
  const scaleFactor = tailIndex / (snake.length - 1);
  const lightness = scaleFactor * MAX_VALUE + MIN_VALUE;

  return `rgb(${lightness}, ${lightness}, ${lightness})`;
};
