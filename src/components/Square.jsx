import { useState } from "react"

export default function Square({
  value,
  onSquareClick,
  squareId,
  winningSquares,
}) {
  return (
    <button
      className={`square ${
        winningSquares?.includes(squareId) ? "winningSquare" : ""
      }`}
      onClick={onSquareClick}
      data-id={squareId}
    >
      {value}
    </button>
  )
}
