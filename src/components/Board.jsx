import { useEffect, useMemo, useState } from "react"
import Square from "./Square"

export default function Board({
  ceils,
  currentMove,
  setCurrentMove,
  squares,
  onPlay,
  winningSquares,
  setWinningSquares,
  onRestart,
  playerSelected,
  setPlayerSelected,
}) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = currentMove

    onPlay(nextSquares)
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winningSquares: [a, b, c] }
      }
    }
    return null
  }

  const winner = useMemo(() => calculateWinner(squares), [squares])
  let status
  if (winner) {
    status = (
      <>
        Winner: <span>{winner.winner}</span>
      </>
    )
  } else if (squares.every((square) => square !== null)) {
    status = <>Draw</>
  } else {
    status = (
      <>
        Current player: <span>{currentMove}</span>
      </>
    )
  }

  useEffect(() => {
    setWinningSquares(winner?.winningSquares)
  }, [winner])



  return (
    <>
      <div className="game-actions">
        
        <div className="status">{status}</div>
        <button className="restart" onClick={onRestart}>
          Restart Game
        </button>
      </div>
      <div className="board-row">
        {ceils.map((ceil, i) => {
          return (
            <Square
              value={squares[i]}
              onSquareClick={() => handleClick(i)}
              winningSquares={winningSquares}
              squareId={i}
              key={i}
            />
          )
        })}
      </div>
    </>
  )
}
