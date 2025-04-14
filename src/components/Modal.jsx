import { useCallback, useContext, useEffect, useState } from "react"
import Modal from "react-modal"
import GameContext from "../context/GameContext"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "80vh",
    borderRadius: "20px",
    backgroundColor: "rgb(10, 15, 44)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}

Modal.setAppElement("#root")

export default function ModalView({
  playerSymbol,
  setPlayerSymbol,
  playMode,
  setPlayMode,
  setCurrentPlayer,
  setShowModal,
  showModal,
  hasModalInitialized,
  setHasModalInitialized,
}) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [resetParams, setResetParams] = useState({
    btnText: "Reset",
    isBtnActive: false,
  })
  const { updateState } = useContext(GameContext)

  // to setup initial playMode and playerSymbol
  useEffect(() => {
    if (showModal && !hasModalInitialized) {
      setHasModalInitialized(true)
      setPlayerSymbol("X")
      setPlayMode("playerVScpu")
    }
  }, [
    setHasModalInitialized,
    hasModalInitialized,
    setPlayMode,
    setPlayerSymbol,
    showModal,
  ])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function afterOpenModal() {
    setCurrentPlayer(playerSymbol)
  }

  const startGame = useCallback(() => {
    if (playerSymbol && playMode) {
      setIsOpen(false)
      setShowModal(false)

      document.activeElement?.blur()
    }
  }, [playerSymbol, playMode, setIsOpen, setShowModal])

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter") startGame()
    },
    [startGame]
  )

  useEffect(() => {
    if (!showModal) return

    openModal()

    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [showModal, handleKeyUp])

  function changeSide(symbol) {
    setPlayerSymbol(symbol)
    setCurrentPlayer(symbol)
  }

  function selectPlayerVSplayerMode() {
    setPlayMode("playerVSplayer")
    setPlayerSymbol("X")
    setCurrentPlayer("X")
  }

  function resetRecord() {
    localStorage.setItem(
      "gameRecord",
      JSON.stringify({ win: 0, draw: 0, lose: 0 })
    )
    updateState((prev) => ({
      ...prev,
      gameRecord: { win: 0, draw: 0, lose: 0 },
    }))
    setResetParams({
      btnText: "Done",
      isBtnActive: true,
    })
    setTimeout(() => {
      setResetParams({
        btnText: "Reset",
        isBtnActive: false,
      })
    }, 1000)
  }

  useEffect(() => {
    if (!showModal) document.removeEventListener("keyup", handleKeyUp)
  }, [showModal, handleKeyUp])

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Select Side"
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
      >
        <div className="game-start-modal">
          <div className="reset-record">
            <p>Reset Game Record ?</p>
            <button
              onClick={resetRecord}
              className={resetParams.isBtnActive ? "active" : ""}
              tabIndex={1}
            >
              {resetParams.btnText}
            </button>
          </div>
          <div className="mode">
            <p>Select Game Mode</p>
            <div className="buttons">
              <button
                onClick={selectPlayerVSplayerMode}
                className={playMode === "playerVSplayer" ? "active" : ""}
                tabIndex={2}
              >
                Player vs Player
              </button>
              <button
                onClick={() => setPlayMode("playerVScpu")}
                className={playMode === "playerVScpu" ? "active" : ""}
                tabIndex={3}
              >
                Player vs CPU
              </button>
            </div>
          </div>
          <div className="side">
            <p>Select Your Side</p>
            <div className="buttons">
              <button
                onClick={() => changeSide("X")}
                className={playerSymbol === "X" ? "active" : ""}
                tabIndex={4}
              >
                X
              </button>
              <button
                onClick={() => changeSide("O")}
                className={playerSymbol === "O" ? "active" : ""}
                tabIndex={5}
              >
                O
              </button>
            </div>
          </div>
          <button className="start" onClick={startGame}>
            Start Game
          </button>
        </div>
      </Modal>
    </div>
  )
}
