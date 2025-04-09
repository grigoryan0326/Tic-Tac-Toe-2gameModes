import { GameProvider } from "./context/GameContext.jsx"
import Game from "./components/Game"
import "./App.css"

function App() {
  return (
    <GameProvider>
      <h1>
        Are you ready to <span>lose</span> !? 🙈
      </h1>
      <Game />
    </GameProvider>
  )
}

export default App
