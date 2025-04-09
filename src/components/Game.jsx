import { useCallback, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

import Board from "./Board"
import ModalView from "../components/Modal"
import GameContext from "../context/GameContext"
import { cpuPlayAsX } from "../model"

import "../styles/Game.scss"
import { useComboKeys } from "../hooks/useComboKeys"

export default function Game() {
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentView, setCurrentView] = useState(0)
  const [winningSquares, setWinningSquares] = useState([null, null, null])
  const [cpuPlaying, setCpuPlaying] = useState(false)
  const [playMode, setPlayMode] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [showModal, setShowModal] = useState(true)
  const [hasModalInitialized, setHasModalInitialized] = useState(false)

  const { state, updateState } = useContext(GameContext)
  const currentSquares = history[currentView]

  const handlePlay = useCallback(
    (nextSquares) => {
      const nextHistory = [...history.slice(0, currentView + 1), nextSquares]
      setHistory(nextHistory)
      setCurrentView(nextHistory.length - 1)
      if (playMode === "playerVSplayer")
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    },
    [currentView, history, currentPlayer, playMode]
  )

  const onRestart = useCallback(() => {
    setHistory([Array(9).fill(null)])
    setCurrentView(0)
    setWinningSquares([null, null, null])
    setCpuPlaying(false)
    setShowModal(true)
    updateState({ winner: false })
  }, [updateState])

  useComboKeys(
    () => onRestart(),
    () =>
      updateState({
        gameRecord: {
          win: (state.gameRecord.win += 33),
          draw: state.gameRecord.draw,
          lose: state.gameRecord.lose,
        },
      }),
    () =>
      updateState({
        gameRecord: {
          win: (state.gameRecord.win -= 19),
          draw: state.gameRecord.draw,
          lose: state.gameRecord.lose,
        },
      }),
    () =>
      updateState({
        gameRecord: {
          win: state.gameRecord.win,
          draw: (state.gameRecord.draw += 7),
          lose: state.gameRecord.lose,
        },
      }),
    () =>
      updateState({
        gameRecord: {
          win: state.gameRecord.win,
          draw: (state.gameRecord.draw -= 4),
          lose: state.gameRecord.lose,
        },
      }),
    () =>
      updateState({
        gameRecord: {
          win: state.gameRecord.win,
          draw: state.gameRecord.draw,
          lose: (state.gameRecord.lose += 7),
        },
      }),
    () =>
      updateState({
        gameRecord: {
          win: state.gameRecord.win,
          draw: state.gameRecord.draw,
          lose: (state.gameRecord.lose -= 4),
        },
      })
  )

  useEffect(() => {
    if (
      playerSymbol === "O" &&
      currentView === 0 &&
      playMode === "playerVScpu" &&
      !showModal
    ) {
      setCpuPlaying(true)
      setTimeout(() => {
        cpuPlayAsX(currentSquares, handlePlay, playerSymbol, setCpuPlaying)
      }, 250)
    }
  }, [
    playerSymbol,
    currentView,
    currentSquares,
    handlePlay,
    playMode,
    showModal,
  ])

  useEffect(() => {
    if (!showModal) {
      document.activeElement?.blur()
    }
  }, [showModal])

  function jumpTo(nextMove) {
    if (currentView !== 0 && currentView !== nextMove) {
      setWinningSquares([null, null, null])
    }
    setCurrentView(nextMove)
    setCpuPlaying(false)
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
          disabled={state.winner}
        >
          {description}
        </button>
      </li>
    )
  })

  return (
    <>
      <div className="record">
        <span>
          {state.gameRecord.win > 1 ? "Wins:" : "Win:"} {state.gameRecord.win}
        </span>
        <span>
          {state.gameRecord.draw > 1 ? "Draws:" : "Draw:"}{" "}
          {state.gameRecord.draw}
        </span>
        <span>
          {state.gameRecord.lose > 1 ? "Losses:" : "Loss:"}{" "}
          {state.gameRecord.lose}
        </span>
        <div className="info">
          <FontAwesomeIcon icon={faCircleInfo} className="info-image" />
          <div className="tooltip">
            <p>
              The game record tracks your performance only in
              <span> Player vs CPU </span>
              mode. Each win, loss, or draw counts as <span>one point. </span>
              Matches played in Player vs Player mode are not included in the
              statistics.
            </p>
            <p>
              Want to start fresh? You can reset your game record anytime using
              the <span>Restart Game</span> button.
            </p>
          </div>
        </div>
      </div>
      <div className="game">
        {showModal && (
          <ModalView
            playerSymbol={playerSymbol}
            setPlayerSymbol={setPlayerSymbol}
            setPlayMode={setPlayMode}
            setCurrentPlayer={setCurrentPlayer}
            playMode={playMode}
            setShowModal={setShowModal}
            showModal={showModal}
            setHasModalInitialized={setHasModalInitialized}
            hasModalInitialized={hasModalInitialized}
          />
        )}
        <div className="game-board">
          <Board
            playMode={playMode}
            ceils={currentSquares}
            squares={currentSquares}
            onPlay={handlePlay}
            winningSquares={winningSquares}
            setWinningSquares={setWinningSquares}
            onRestart={onRestart}
            playerSymbol={playerSymbol}
            cpuPlaying={cpuPlaying}
            setCpuPlaying={setCpuPlaying}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        </div>
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>
    </>
  )
}
