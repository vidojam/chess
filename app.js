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
    // console.log(playerGo)
    // console.log(e.target);
    
    const correctGo = draggedElement.firstChild.classList.contains('playerGo')
    const taken = e.target.classList.contains('piece');
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild.classList.contains(opponentGo);

    if (correctGo) {
        // must check this first
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            changePlayer();
            return;
        } 
        // then check this
        if (taken && !takenByOpponent) {
            infoDisplay.textContent = 'You cannot go here!';
            setTimeout(() => {
                infoDisplay.textContent = '';
            }, 2000); // 2 seconds
            return;
        }
        // then check this
        if (valid) {
            e.target.append(draggedElement);
            changePlayer();
            return;
        }
    }  
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    console.log(piece);
    console.log(startId);
    console.log(targetId);

    switch (piece) {
        case 'king':
            return checkKing(startId, targetId);
        case 'queen':
            return checkQueen(startId, targetId);
        case 'rook':
            return checkRook(startId, targetId);
        case 'bishop':
            return checkBishop(startId, targetId);
        case 'knight':
            return checkKnight(startId, targetId);
        case 'pawn':
            const starterRow = [8,9,10,11,12,13,14,15];
            if (
                starterRow.includes(startId) && startId + width * 2 === targetId 
                || (startId + width === targetId) 
                || (startId + width + 1 === targetId) && document.querySelector([squared-Id]) && document.querySelector(`[square-id = "${startId + width -1}"]`)
            ) {
                return true;    
            }
             
    }
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