import { createContext, useCallback, useEffect, useState } from "react"

const GameContext = createContext()

export function GameProvider({ children }) {
  const [state, setState] = useState(() => {
    const savedRecord = localStorage.getItem("gameRecord")
    return {
      winner: false,
      gameRecord: savedRecord
        ? JSON.parse(savedRecord)
        : { win: 0, draw: 0, lose: 0 },
    }
  })

  const updateState = useCallback((newState) => {
    setState((prev) => {
      const next =
        typeof newState === "function"
          ? newState(prev)
          : { ...prev, ...newState }
      return next
    })
  }, [])

  useEffect(() => {
    localStorage.setItem("gameRecord", JSON.stringify(state.gameRecord))
  }, [state.gameRecord])

  return (
    <GameContext.Provider value={{ state, updateState }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext
