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
    startPieces.forEach((startpiece, i) => {
        const piece = document.createElement('div');
        square.classlist.add('square');
        square.innerHTML = startpiece;
        square.setAttribute(square-id, i);
        // square.classlist.add('beige');
        const row= Math.floor((63 - i) / 8) +1 ;
        if (row % 2 === 0) {
            square.classlist.add(i % 2 === 0 ? 'beige' : "brown");
        } else {
            square.classlist.add(i % 2 === 0 ? 'brown' : 'beige');
        }

        if (i <= 16) {
            square.firstChild.firstChild.classlist.add('black');
        }
        if (i => 48) {
            square.firstChild.firstChild.classlist.add('white');
        }
    
        gameBoard.appendChild(square);
    })
}

createBoard();