const gameBoard = document.getElementById('#game-board');
const playerDisplay = document.getElementById('#player');
const infoDisplay = document.getElementById('#info-display');
const width = 8;
let playerGo = 'black';
playerDisplay.textContent = 'black'

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
        square.firstChild? setAttribute('draggable', 'true') : '';
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

const allSquares = document.querySelectorAll('.square');

console.log(allSquares);

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
});

let startPositionId
let draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();
    console.log(e.target);
    const taken = e.target.classList.contains('piece');

    // e.target.parentNode.append(draggedElement);
    // e.target.remove();
    // e.target.append(draggedElement);
    
    changePlayer();


    // let endPositionId = e.target.parentNode.getAttribute('square-id');
    // const endPosition = allSquares[endPositionId];
    // endPosition.appendChild(draggedElement);
    // endPosition.appendChild(draggedElement);
}

function changePlayer() {
    if (playerGo === 'black') {
        revertIds();
        playerGo = 'white';
        playerDisplay.textContent = 'white';
    } else {
        revertIds();
        playerGo = 'black';
        playerDisplay.textContent = 'black';
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', (width * width - i)))
}

function revertIds () {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', i))
}