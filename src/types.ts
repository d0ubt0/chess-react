export type PositionType = [number, number];

export type ColorType = 'black' | 'white';

export type SquareType = {
    children: Piece | null, 
    position: PositionType
};

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export class Piece {
    color: ColorType;
    type: PieceType;
    hasMoved: Boolean;

    constructor(color: ColorType, type: PieceType) {
        this.color = color;
        this.type = type;
        this.hasMoved = false;
    }
};

export type BoardType = (Piece | null)[][];