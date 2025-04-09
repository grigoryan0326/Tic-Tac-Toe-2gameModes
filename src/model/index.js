export function cpuPlayAsX(
  currentSquares,
  handlePlay,
  playerSymbol,
  setCpuPlaying
) {
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

  const cpuSymbol = playerSymbol === "X" ? "O" : "X"

  const nextSquares = currentSquares.slice()

  //! turn cases

  // if there is 2 cpuSymbol in a winning sequence

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      currentSquares[a] !== null &&
      currentSquares[a] === cpuSymbol &&
      currentSquares[b] === cpuSymbol
    ) {
      if (currentSquares[c] === null) {
        nextSquares[c] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[a] !== null &&
      currentSquares[a] === cpuSymbol &&
      currentSquares[c] === cpuSymbol
    ) {
      if (currentSquares[b] === null) {
        nextSquares[b] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[b] !== null &&
      currentSquares[b] === cpuSymbol &&
      currentSquares[c] === cpuSymbol
    ) {
      if (currentSquares[a] === null) {
        nextSquares[a] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    }
  }

  // if there is 2 playerSymbols in a winning sequence

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (currentSquares[a] !== null && currentSquares[a] === currentSquares[b]) {
      if (currentSquares[c] === null) {
        nextSquares[c] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[a] !== null &&
      currentSquares[a] === currentSquares[c]
    ) {
      if (currentSquares[b] === null) {
        nextSquares[b] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[b] !== null &&
      currentSquares[b] === currentSquares[c]
    ) {
      if (currentSquares[a] === null) {
        nextSquares[a] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    }
  }

  // if there is no symbol in a middle square

  if (currentSquares[4] === null) {
    nextSquares[4] = cpuSymbol
    setCpuPlaying(false)
    return handlePlay(nextSquares)
  }

  // in case there is cpuSymbol in the middle and in the corner
  if (currentSquares[4] === cpuSymbol) {
    const lines = [
      [0, 4, 1],
      [0, 4, 3],
      [2, 4, 1],
      [2, 4, 5],
      [6, 4, 3],
      [6, 4, 7],
      [8, 4, 5],
      [8, 4, 7],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        currentSquares[a] !== null &&
        currentSquares[a] === currentSquares[b]
      ) {
        if (currentSquares[c] === null) {
          nextSquares[c] = cpuSymbol
          setCpuPlaying(false)

          return handlePlay(nextSquares)
        }
      }
    }
  }

  // to put symbol in the corner
  const corners = [0, 2, 6, 8]
  const playerSymbolIndex = currentSquares.indexOf("O")
  const opositeCornerIndex =
    playerSymbolIndex === 0
      ? 8
      : playerSymbolIndex === 2
      ? 6
      : playerSymbolIndex === 6
      ? 2
      : 0
  if (currentSquares[opositeCornerIndex] === null) {
    nextSquares[opositeCornerIndex] = cpuSymbol
    setCpuPlaying(false)
    return handlePlay(nextSquares)
  }
  for (let i = 0; i < currentSquares.length; i++) {
    if (corners.includes(i) && currentSquares[i] === null) {
      nextSquares[i] = cpuSymbol
      setCpuPlaying(false)
      return handlePlay(nextSquares)
    }
  }

  // common case, put symbol in the first free square
  for (let j = 0; j < currentSquares.length - 1; j++) {
    if (currentSquares[j] === null) {
      nextSquares[j] = cpuSymbol
      setCpuPlaying(false)

      return handlePlay(nextSquares)
    }
  }
}

export function cpuPlayAsO(
  currentSquares,
  handlePlay,
  playerSymbol,
  setCpuPlaying
) {
  const cpuSymbol = playerSymbol === "X" ? "O" : "X"

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

  const nextSquares = currentSquares.slice()

  //! turn cases

  // if there is 2 cpuSymbol in a winning sequence

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      currentSquares[a] !== null &&
      currentSquares[a] === cpuSymbol &&
      currentSquares[b] === cpuSymbol
    ) {
      if (currentSquares[c] === null) {
        nextSquares[c] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[a] !== null &&
      currentSquares[a] === cpuSymbol &&
      currentSquares[c] === cpuSymbol
    ) {
      if (currentSquares[b] === null) {
        nextSquares[b] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[b] !== null &&
      currentSquares[b] === cpuSymbol &&
      currentSquares[c] === cpuSymbol
    ) {
      if (currentSquares[a] === null) {
        nextSquares[a] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    }
  }

  // if there is 2 playerSymbols in a winning sequence

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (currentSquares[a] !== null && currentSquares[a] === currentSquares[b]) {
      if (currentSquares[c] === null) {
        nextSquares[c] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[a] !== null &&
      currentSquares[a] === currentSquares[c]
    ) {
      if (currentSquares[b] === null) {
        nextSquares[b] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    } else if (
      currentSquares[b] !== null &&
      currentSquares[b] === currentSquares[c]
    ) {
      if (currentSquares[a] === null) {
        nextSquares[a] = cpuSymbol
        setCpuPlaying(false)
        return handlePlay(nextSquares)
      }
    }
  }

  // if the middle square is free

  if (currentSquares[4] === null) {
    nextSquares[4] = cpuSymbol
    setCpuPlaying(false)
    return handlePlay(nextSquares)
  }

  // in case there is cpuSymbol in the middle and in the corner
  if (currentSquares[4] === cpuSymbol) {
    const lines = [
      [0, 4, 1],
      [0, 4, 3],
      [2, 4, 1],
      [2, 4, 5],
      [6, 4, 3],
      [6, 4, 7],
      [8, 4, 5],
      [8, 4, 7],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        currentSquares[a] !== null &&
        currentSquares[a] === currentSquares[b]
      ) {
        if (currentSquares[c] === null) {
          nextSquares[c] = cpuSymbol
          setCpuPlaying(false)

          return handlePlay(nextSquares)
        }
      } else if (
        currentSquares[c] !== null &&
        currentSquares[c] === currentSquares[b]
      ) {
        if (currentSquares[a] === null) {
          nextSquares[a] = cpuSymbol
          setCpuPlaying(false)
          return handlePlay(nextSquares)
        }
      }
    }
  }

  // to put symbol in the corner where nearby is playerSymbols
  const playerCorners = [
    [1, 0, 3],
    [1, 2, 5],
    [3, 6, 7],
    [7, 8, 5],
  ]
  for (let i = 0; i < playerCorners.length; i++) {
    const [a, corner, c] = playerCorners[i]
    if (
      currentSquares[a] === playerSymbol &&
      currentSquares[c] === playerSymbol &&
      currentSquares[corner] === null
    ) {
      nextSquares[corner] = cpuSymbol
      setCpuPlaying(false)
      return handlePlay(nextSquares)
    }
  }

  // to put symbol in the corner
  const corners = [0, 2, 6, 8]
  for (let i = 0; i < currentSquares.length; i++) {
    if (corners.includes(i) && currentSquares[i] === null) {
      nextSquares[i] = cpuSymbol
      setCpuPlaying(false)
      return handlePlay(nextSquares)
    }
  }

  // common case, put symbol in the first free square
  for (let j = 0; j < currentSquares.length - 1; j++) {
    if (currentSquares[j] === null) {
      nextSquares[j] = cpuSymbol
      setCpuPlaying(false)

      return handlePlay(nextSquares)
    }
  }
}
