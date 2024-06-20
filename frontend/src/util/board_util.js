const validMove = ((lastMove, currentMove) => {
    const boardLength = 4;
    const boardSize = boardLength * boardLength;
    const onTop = lastMove < boardLength;
    const onBottom = lastMove >= boardSize - boardLength;
    const onLeft = lastMove % boardLength === 0;
    const onRight = lastMove % boardLength === boardLength - 1;

    const validMoves = [];
    
    // Add moves if last move not on top row
    if (!onTop) {
      validMoves.push(lastMove - boardLength);
      if (!onLeft)
        validMoves.push(lastMove - boardLength - 1);
      if (!onRight)
        validMoves.push(lastMove - boardLength + 1);
    }
    // Add moves if last move not on bottom row
    if (!onBottom) {
      validMoves.push(lastMove + boardLength);
      if (!onLeft)
        validMoves.push(lastMove + boardLength - 1);
      if (!onRight)
        validMoves.push(lastMove + boardLength + 1);
    }
    // Add moves if not on sides
    if (!onLeft)
      validMoves.push(lastMove - 1);
    if (!onRight)
      validMoves.push(lastMove + 1);

    return validMoves.includes(currentMove);
});

export default validMove;
