const gameBoard = document.getElementById('#game-board');
const playerDisplay = document.getElementById('#player');
const infoDisplay = document.getElementById('#info-display');
const width = 8;

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
    
]

function createBoard() {
    startPieces.forEach((startpiece) => {
        const piece = document.createElement('div');
        square.classlist.add('square');
        square.classlist.add('beige');
        gameBoard.append(square);
    })
}

createBoard();