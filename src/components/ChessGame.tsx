import { useState } from "react";
import './ChessGame.css';
import Square from "./Square";
import type { BoardType, PieceType, PositionType } from "../types";
import { Piece } from "../types";

const createBoard = ():BoardType =>{
    const board: BoardType = []

    for (let row = 0; row < 8; row++) {
        let actualRow: (Piece | null)[] = [] 
        for (let col = 0; col < 8; col++) {
            if (row ===  0) {
                if (col === 0 || col === 7) actualRow.push(new Piece('black', 'rook'))
                if (col === 1 || col === 6) actualRow.push(new Piece('black', 'knight'))
                if (col === 2 || col === 5) actualRow.push(new Piece('black', 'bishop'))
                if (col === 3) actualRow.push(new Piece('black', 'queen'))
                if (col === 4) actualRow.push(new Piece('black', 'king'))
            } else if (row === 1){
                actualRow.push(new Piece('black', 'pawn'));
            } else if (row ===  6) {
                actualRow.push(new Piece('white', 'pawn'));
            } else if (row === 7){
                if (col === 0 || col === 7) actualRow.push(new Piece('white', 'rook'))
                if (col === 1 || col === 6) actualRow.push(new Piece('white', 'knight'))
                if (col === 2 || col === 5) actualRow.push(new Piece('white', 'bishop'))
                if (col === 3) actualRow.push(new Piece('white', 'queen'))
                if (col === 4) actualRow.push(new Piece('white', 'king'))
            } else {
                actualRow.push(null)
            }
        }
        board.push(actualRow)
    }
    return board
}

export default function ChessGame(){
    const [board, setBoard] = useState<BoardType>(createBoard)
    const [selected, setSelected] = useState<PositionType | null>(null)


    const clickFunction = (position: PositionType) => {

    } 

    return (
    <section className="ChessGameContainer">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <Square key={`${rowIndex}-${colIndex}`} position={[rowIndex, colIndex]}>{piece}</Square>
        ))
      )}
    </section>
  );
}