import { useState } from "react"

export default function Square({ value, onSquareClick, squareId }) {
  return (
    <button className="square" onClick={onSquareClick} data-id={squareId}>
      {value}
    </button>
  )
}
