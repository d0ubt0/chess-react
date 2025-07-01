import type { PositionType, BoardType } from "./types";
function isInsideBoard(position: PositionType): boolean {
  const [y, x] = position;
  return (0 <= x && x <= 7) && (0 <= y && y <= 7);
}

export function getDiagonalMoves(position: PositionType, board: BoardType): PositionType[] {
  const directions = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
  let diagonalMoves: PositionType[] = [];

  for (const [dy, dx] of directions) {
    let nextPosition: PositionType = [position[0] + dy, position[1] + dx];

    while (isInsideBoard(nextPosition)) {
      diagonalMoves.push(nextPosition);
      nextPosition = [nextPosition[0] + dy, nextPosition[1] + dx];
    }
  }

  return diagonalMoves;
}

export function getStraightMoves(position: PositionType, board: BoardType): PositionType[] {
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let straightMoves: PositionType[] = [];

  for (const [dy, dx] of directions) {
    let nextPosition: PositionType = [position[0] + dy, position[1] + dx];

    while (isInsideBoard(nextPosition)) {
      straightMoves.push(nextPosition);
      nextPosition = [nextPosition[0] + dy, nextPosition[1] + dx];
    }
  }

  return straightMoves;
}