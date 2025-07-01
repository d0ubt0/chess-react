import type { SquareType } from "../types";
import './Square.css';

const symbols = {
    black: {
      king: '♔',
      queen: '♕',
      rook: '♖',
      bishop: '♗',
      knight: '♘',
      pawn: '♙',
    },
    white: {
      king: '♚',
      queen: '♛',
      rook: '♜',
      bishop: '♝',
      knight: '♞',
      pawn: '♟',
    },
  };

export default function Square({children, position}: SquareType){
    if(!children) return <div className="SquareContainer"></div>

    const colorPiece = children.color
    const typePiece = children.type
    const repr = symbols[colorPiece][typePiece]

    console.log(position)

    return <div className="SquareContainer">{repr}</div>
}