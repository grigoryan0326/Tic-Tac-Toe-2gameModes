import { useEffect, useState } from "react"
import Modal from "react-modal"

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
  playerSelected,
  setPlayerSelected,
  setCurrentMove,
}) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (playerSelected) return
    openModal()
  }, [playerSelected])

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false)
  }

  function changeSide(symbol) {
    if (!playerSelected) {
      setPlayerSelected(true)
      setCurrentMove(symbol)
    }
    setIsOpen(false)
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Select Side"
      >
        <div className="side">
          <p>Select Your Side</p>
          <div className="buttons">
            <button onClick={() => changeSide("X")} disabled={playerSelected}>
              X
            </button>
            <button onClick={() => changeSide("O")} disabled={playerSelected}>
              O
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
