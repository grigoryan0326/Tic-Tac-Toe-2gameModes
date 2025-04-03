import { useState } from "react"
import Board from "./Board"
import ModalView from "../components/Modal"

import "../styles/Game.scss"

export default function Game() {
  const [currentMove, setCurrentMove] = useState("X")
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentView, setCurrentView] = useState(0)
  const [winningSquares, setWinningSquares] = useState([null, null, null])
  const currentSquares = history[currentView]
  const [playerSelected, setPlayerSelected] = useState(false)

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentView + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentView(nextHistory.length - 1)
    setCurrentMove(currentMove === "X" ? "O" : "X")
  }

  function onRestart() {
    setCurrentMove("X")
    setHistory([Array(9).fill(null)])
    setCurrentView(0)
    setWinningSquares([null, null, null])
    setPlayerSelected(false)
  }

  function jumpTo(nextMove) {
    if (currentView !== 0 && currentView !== nextMove) {
      document
        .querySelectorAll(".winningSquare")
        .forEach((el) => el.classList.remove("winningSquare"))
      setWinningSquares([null, null, null])
    }
    setCurrentView(nextMove)
    setCurrentMove(nextMove % 2 === 0 ? "X" : "O")
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = "Go to move #" + move
    } else {
      description = "Go to game start"
    }
    return (
      <li key={move} className="move">
        <button
          onClick={() => jumpTo(move)}
          className={move === currentView ? "active" : ""}
        >
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <ModalView
        playerSelected={playerSelected}
        setPlayerSelected={setPlayerSelected}
        setCurrentMove={setCurrentMove}
      />
      <div className="game-board">
        <Board
          ceils={currentSquares}
          currentMove={currentMove}
          squares={currentSquares}
          onPlay={handlePlay}
          winningSquares={winningSquares}
          setWinningSquares={setWinningSquares}
          onRestart={onRestart}
          setCurrentMove={setCurrentMove}
          playerSelected={playerSelected}
          setPlayerSelected={setPlayerSelected}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
