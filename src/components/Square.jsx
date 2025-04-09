export default function Square({
  value,
  onSquareClick,
  squareId,
  winningSquares,
  cpuPlaying,
}) {
  return (
    <button
      className={`square ${
        winningSquares?.includes(squareId) ? "winningSquare" : ""
      }`}
      onClick={onSquareClick}
      data-id={squareId}
      disabled={cpuPlaying}
    >
      {value}
    </button>
  )
}
