export type PositionType = [number, number];

export type ColorType = "black" | "white";

export type SquareType = {
  children: Piece | null;
  position: PositionType;
  onClickFunction: (position: PositionType) => void;
  isSelected: boolean;
  isValidMove: boolean;
};

export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";

export class Piece {
  color: ColorType;
  type: PieceType;
  hasMoved: boolean;

  constructor(color: ColorType, type: PieceType) {
    this.color = color;
    this.type = type;
    this.hasMoved = false;
  }
}

export type BoardType = (Piece | null)[][];
