import type { PositionType, BoardType, Piece } from "./types";

function isInsideBoard(position: PositionType): boolean {
  const [y, x] = position;
  return (0 <= x && x <= 7) && (0 <= y && y <= 7);
}

function isSafePosition(position: PositionType, board: BoardType): boolean {
  return true
}


function auxiliarDiagonalAndStraightMoves(position: PositionType, board: BoardType, directions: [number, number][]): PositionType[] {
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

function getDiagonalMoves(position: PositionType, board: BoardType): PositionType[] {
  const directions: [number, number][] = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
  return auxiliarDiagonalAndStraightMoves(position, board, directions)
}

function getStraightMoves(position: PositionType, board: BoardType): PositionType[] {
  const directions: [number, number][] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  return auxiliarDiagonalAndStraightMoves(position, board, directions)
}

function getKnightMoves(position: PositionType, board: BoardType): PositionType[]{
  const directions: PositionType[] = [[2, 1],[2, -1],[-2, 1],[-2, -1],[1, 2],[1, -2],[-1, 2],[-1, -2]];

  const validMoves: PositionType[] = [];
  const [row, col] = position;
  const knightActual = board[row][col];
  
  for (const [dRow, dCol] of directions) {
    const nextPosition: PositionType = [row + dRow, col + dCol]
    
    if(!isInsideBoard(nextPosition)) continue;

    const targetPiece = board[nextPosition[0]][nextPosition[1]];

    if (!targetPiece || targetPiece.color !== knightActual?.color) {
      validMoves.push(nextPosition);
    }
  }
       
  return validMoves;
}

function getPawnMoves(position: PositionType, board: BoardType): PositionType[]{
  const validMoves: PositionType[] = []; 

  const pawn = board[position[0]][position[1]] as Piece;

  let directions: PositionType[] ;

  if(pawn.color === 'white'){
    directions =  [[-1,0],[-2,0]];
  } else {
    directions = [[1,0],[2,0]];
  }

  const firstStep: PositionType = [position[0] + directions[0][0], position[1]];

  if (isInsideBoard(firstStep) && !board[firstStep[0]][firstStep[1]]){
    
    validMoves.push(firstStep);
    const secondStep: PositionType = [position[0] + directions[1][0], position[1]];

    if(!pawn.hasMoved && !board[secondStep[0]][secondStep[1]]){
      validMoves.push(secondStep);
    }
  }
  
  return validMoves;
}

function getKingMoves(position: PositionType, board: BoardType): PositionType[]{
  const validMoves: PositionType[] = []; 

  const king = board[position[0]][position[1]] as Piece;

  const directions: PositionType[] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];

  for(const [dRow,dCol] of directions){
    const nextPosition: PositionType = [position[0] + dRow, position[1] + dCol]

    if(!isInsideBoard(nextPosition)) continue;

    const targetPiece = board[nextPosition[0]][nextPosition[1]];

    if (!targetPiece || targetPiece.color !== king.color) {
        validMoves.push(nextPosition);
    }
  }
  
  return validMoves;
}

type MoveFunction = (position: PositionType, board: BoardType) => PositionType[];

const moveFunctions: Record<string, MoveFunction> = {
  king: getKingMoves,
  queen: (pos, board) => [
    ...getDiagonalMoves(pos, board),
    ...getStraightMoves(pos, board),
  ],
  bishop: getDiagonalMoves,
  rook: getStraightMoves,
  knight: getKnightMoves,
  pawn: getPawnMoves,
};



export function getMoves(position: PositionType, board: BoardType): PositionType[]{
  const piece = board[position[0]][position[1]]

  if (!piece) return [];
  const fn = moveFunctions[piece.type];
  return fn(position, board);
}
