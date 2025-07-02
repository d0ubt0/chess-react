import type { PositionType, BoardType } from "./types";
function isInsideBoard(position: PositionType): boolean {
  const [y, x] = position;
  return (0 <= x && x <= 7) && (0 <= y && y <= 7);
}
export function getMoves(position: PositionType, board: BoardType, directions: [number, number][]): PositionType[] {
  const validMoves: PositionType[] = [];
  const [row, col] = position;
  const positionPiece = board[row][col];

  for (const [dRow, dCol] of directions) {
    let y = row + dRow;
    let x = col + dCol;

    while (isInsideBoard([y, x])) {
      const targetPiece = board[y][x];
      if (!targetPiece) {
        validMoves.push([y, x]);
        y += dRow;
        x += dCol;
      } else {
        if (positionPiece && targetPiece.color !== positionPiece.color) {
          validMoves.push([y, x]);
        }
        break; 
      }
    }
  }

  return validMoves;
}

export function getDiagonalMoves(position: PositionType, board: BoardType): PositionType[] {
  const directions: [number, number][] = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
  return getMoves(position, board, directions)
}

export function getStraightMoves(position: PositionType, board: BoardType): PositionType[] {
  const directions: [number, number][] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  return getMoves(position, board, directions)
}

export function getKnightMoves(position: PositionType, board: BoardType): PositionType[]{
  const directions: [number, number][] = [[2, 1],[2, -1],[-2, 1],[-2, -1],[1, 2],[1, -2],[-1, 2],[-1, -2]];

  const validMoves: PositionType[] = [];
  const [row, col] = position;
  const positionPiece = board[row][col];
  
  for (const [dRow, dCol] of directions) {
    const nextPosition: PositionType = [row + dRow, col + dCol]
    
    if (isInsideBoard(nextPosition)){
      if (isInsideBoard(nextPosition)) {
        const targetPiece = board[nextPosition[0]][nextPosition[1]];
  
        if (!targetPiece || targetPiece.color !== positionPiece?.color) {
          validMoves.push(nextPosition);
        }
      }
    }
  }      
  
  return validMoves;
}