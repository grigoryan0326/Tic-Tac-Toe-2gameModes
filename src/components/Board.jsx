import { useCallback, useContext, useEffect, useMemo } from "react"
import Square from "./Square"
import { cpuPlayAsX, cpuPlayAsO } from "../model"
import GameContext from "../context/GameContext.jsx"

export default function Board({
  playMode,
  onRestart,
  playerSymbol,
  ceils,
  squares,
  onPlay,
  winningSquares,
  setWinningSquares,
  cpuPlaying,
  setCpuPlaying,
  currentPlayer,
}) {
  const { state, updateState } = useContext(GameContext)
  const cpuSymbol = playerSymbol === "X" ? "O" : "X"

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] =
      playMode === "playerVSplayer" ? currentPlayer : playerSymbol
    onPlay(nextSquares)

    if (playMode === "playerVScpu" && !calculateWinner(nextSquares)) {
      setCpuPlaying(true)
      if (playerSymbol === "X") {
        setTimeout(() => {
          cpuPlayAsX(nextSquares, onPlay, playerSymbol, setCpuPlaying)
        }, 250)
      }
      if (playerSymbol === "O") {
        setTimeout(() => {
          cpuPlayAsX(nextSquares, onPlay, playerSymbol, setCpuPlaying)
        }, 250)
      } else {
        setTimeout(() => {
          cpuPlayAsO(nextSquares, onPlay, playerSymbol, setCpuPlaying)
        }, 250)
      }
    }
  }

  const calculateWinner = useCallback(
    (squares) => {

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

      if (
        squares.every((square) => square !== null) &&
        playMode === "playerVScpu"
      ) {
        return { winner: "draw", winningSquares: null }
      }
      return null
    },
    [playMode]
  )

  const winner = useMemo(
    () => calculateWinner(squares),
    [squares, calculateWinner]
  )
  let status

  if (winner && playMode === "playerVSplayer") {
    status = (
      <>
        <span>{currentPlayer === "X" ? "O" : "X"} wins!</span>
      </>
    )
  } else if (winner?.winner === "draw" && playMode === "playerVSplayer") {
    status = <span className="final">Draw</span>
  } else if (playMode === "playerVSplayer") {
    console.log('current', currentPlayer);

    status = (
      <>
        Current player: <span>{currentPlayer}</span>
      </>
    )
  }

  if (winner && playMode === "playerVScpu") {
    status = (
      <>
        {winner.winner === playerSymbol ? (
          <span className="final">You win!</span>
        ) : winner.winner === cpuSymbol ? (
          <span className="final">CPU wins!</span>
        ) : (
          <span className="final">Draw</span>
        )}
      </>
    )
  } else if (playMode === "playerVScpu") {
    status = (
      <>
        Your symbol: <span>{playerSymbol}</span>
      </>
    )
  }

  useEffect(() => {
    if (winner && playMode === "playerVScpu") {
      if (winner.winner === cpuSymbol) {
        updateState((prev) => ({
          gameRecord: {
            ...prev.gameRecord,
            lose: prev.gameRecord.lose + 1,
          },
        }))
      } else if (winner.winner === playerSymbol) {
        updateState((prev) => ({
          gameRecord: {
            ...prev.gameRecord,
            win: prev.gameRecord.win + 1,
          },
        }))
      } else if (winner.winner === "draw") {
        updateState((prev) => ({
          gameRecord: {
            ...prev.gameRecord,
            draw: prev.gameRecord.draw + 1,
          },
        }))
      }

      updateState({ winner: true })
    }
  }, [winner, playMode, cpuSymbol, playerSymbol, updateState])

  useEffect(() => {
    localStorage.setItem("gameRecord", JSON.stringify(state.gameRecord))
  }, [state.gameRecord])

  useEffect(() => {
    setWinningSquares(winner?.winningSquares)
  }, [winner, setWinningSquares])



  return (
    <>
      <div className="game-actions">
        <div className="status">{status}</div>
        <button className="restart" onClick={onRestart}>
          Restart Game {state.winner}
        </button>
      </div>
      <div className="board-row">
        {ceils.map((ceil, i) => {
          return (
            <Square
              value={squares[i]}
              onSquareClick={() => handleClick(i)}
              playerSymbol={playerSymbol}
              winningSquares={winningSquares}
              squareId={i}
              key={i}
              cpuPlaying={cpuPlaying}
            />
          )
        })}
      </div>
    </>
  )
}
