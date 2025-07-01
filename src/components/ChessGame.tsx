import { useState } from "react";
import './ChessGame.css';
import Square from "./Square";
import type { BoardType, ColorType, PieceType, PositionType } from "../types";
import { Piece } from "../types";
import { getDiagonalMoves, getStraightMoves } from "../chessLogic";

const createBoard = (): BoardType => {
  const board: BoardType = []

  for (let row = 0; row < 8; row++) {
    let actualRow: (Piece | null)[] = [];
    for (let col = 0; col < 8; col++) {
      if (row === 0) {
        if (col === 0 || col === 7) actualRow.push(new Piece('black', 'rook'));
        if (col === 1 || col === 6) actualRow.push(new Piece('black', 'knight'));
        if (col === 2 || col === 5) actualRow.push(new Piece('black', 'bishop'));
        if (col === 3) actualRow.push(new Piece('black', 'queen'));
        if (col === 4) actualRow.push(new Piece('black', 'king'));
      } else if (row === 1) {
        actualRow.push(new Piece('black', 'pawn'));
      } else if (row === 6) {
        actualRow.push(new Piece('white', 'pawn'));
      } else if (row === 7) {
        if (col === 0 || col === 7) actualRow.push(new Piece('white', 'rook'));
        if (col === 1 || col === 6) actualRow.push(new Piece('white', 'knight'));
        if (col === 2 || col === 5) actualRow.push(new Piece('white', 'bishop'));
        if (col === 3) actualRow.push(new Piece('white', 'queen'));
        if (col === 4) actualRow.push(new Piece('white', 'king'));
      } else {
        actualRow.push(null);
      }
    }
    board.push(actualRow);
  }
  return board;
}

export default function ChessGame() {
  const [board, setBoard] = useState<BoardType>(createBoard);
  const [selected, setSelected] = useState<PositionType | null>(null);
  const [turn, setTurn] = useState<ColorType>('white');

  let validMoves: PositionType[] = [];

  if (selected) {
    validMoves = [...getDiagonalMoves(selected, board), ...getStraightMoves(selected, board)]
  }

  const clickFunction = (position: PositionType) => {
    const pieceClick = board[position[0]][position[1]];

    if (!selected && !pieceClick) return; //Si no tienes nada seleccionado, y no hay nada  en la posicion seleccionada. No hacer nada
    if (!selected && pieceClick?.color !== turn) return;

    const newBoard = board.map(row => row.slice());

    if (selected) {
      const pieceSelected = board[selected[0]][selected[1]];

      newBoard[selected[0]][selected[1]] = null;
      newBoard[position[0]][position[1]] = pieceSelected;

      setBoard(newBoard);
      setSelected(null);
      const newTurn = turn == "black" ? 'white' : 'black';
      setTurn(newTurn);
    } else {
      setSelected(position);
    }
  }

  return (
    <section className="ChessGameContainer">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isSelectedActual = selected?.[0] === rowIndex && selected?.[1] === colIndex;
          const isValidMoveActual = validMoves.some(([row, col]) => row === rowIndex && col === colIndex);
          return <Square key={`${rowIndex}-${colIndex}`} position={[rowIndex, colIndex]} onClickFunction={clickFunction} isSelected={isSelectedActual} isValidMove={isValidMoveActual}>{piece}</Square>
        })
      )}
    </section>
  );
}