import { useEffect, useRef } from "react"

export function useComboKeys(
  restartGame,
  addWins,
  excludeWins,
  addDraws,
  excludeDraws,
  addLoses,
  excludeLoses
) {
  const pressedKeys = useRef(new Set())

  useEffect(() => {
    const handleKeyDown = (e) => {
      pressedKeys.current.add(e.code)

      if (
        pressedKeys.current.has("ShiftLeft") ||
        pressedKeys.current.has("ShiftRight")
      ) {
        if (pressedKeys.current.has("KeyR")) {
          restartGame()
        } else if (
          pressedKeys.current.has("KeyW") &&
          pressedKeys.current.has("ArrowUp")
        ) {
          addWins()
        } else if (
          pressedKeys.current.has("KeyW") &&
          pressedKeys.current.has("ArrowDown")
        ) {
          excludeWins()
        } else if (
          pressedKeys.current.has("KeyD") &&
          pressedKeys.current.has("ArrowUp")
        ) {
          addDraws()
        } else if (
          pressedKeys.current.has("KeyD") &&
          pressedKeys.current.has("ArrowDown")
        ) {
          excludeDraws()
        } else if (
          pressedKeys.current.has("KeyL") &&
          pressedKeys.current.has("ArrowUp")
        ) {
          addLoses()
        } else if (
          pressedKeys.current.has("KeyL") &&
          pressedKeys.current.has("ArrowDown")
        ) {
          excludeLoses()
        }
      }
    }

    const handleKeyUp = (e) => {
      pressedKeys.current.delete(e.code)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [
    restartGame,
    addWins,
    excludeWins,
    addDraws,
    excludeDraws,
    addLoses,
    excludeLoses,
  ])
}
