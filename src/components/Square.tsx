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

export default function Square({ children, position, onClickFunction, isSelected, isValidMove }: SquareType) {
  let SquareClassName = "SquareContainer";
  const [y, x] = position;
  const colorSquare = (y + x) % 2 === 0 ? " whiteSquare" : " blackSquare";
  SquareClassName += colorSquare;

  if (isSelected) {
    SquareClassName += " isSelected";
  } else if (isValidMove) {
    SquareClassName += " isValidMove";
  }



  let repr = '';
  if (children) {
    const colorPiece = children.color;
    const typePiece = children.type;
    repr = symbols[colorPiece][typePiece];
  }

  return <button className={SquareClassName} onClick={() => onClickFunction(position)}>{repr}</button>;
}