const validMove = ((lastMove, currentMove) => {
    const boardLength = 4;

    const validMoves = [lastMove + 1, lastMove - 1,
                        lastMove - boardLength, lastMove - boardLength + 1, lastMove - boardLength -1,
                        lastMove + boardLength, lastMove + boardLength + 1, lastMove + boardLength -1                        
                       ];
    return validMoves.includes(currentMove);
});

export default validMove;