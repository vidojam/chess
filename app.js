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
            checkForWin ()
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
            checkForWin ()
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

     
        case 'pawn':
            const starterRow = [8,9,10,11,12,13,14,15];
            if (
                starterRow.includes(startId) && 
                startId + width * 2 === targetId ||
                startId + width === targetId ||
                startId + width + 1 === targetId && document.querySelector([squared-Id]) && document.querySelector(`[square-id = "${startId + width -1}"]`).firstChild

            ) {
                return true;    
            }
          break;
        case 'knight': 
            if (
                startId + width * 2 + 1 === targetId ||
                startId + width * 2 - 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId 
            ) {
                return true;
            }
            break;
        case 'bishop':
            if (
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 6 + 6}"]`).firstChild ||
                // --
                startId - width - 1 === targetId ||
                startId - width * 2 - 2  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3  === targetId  && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 - 4}"]`).firstChild || 
                startId - width * 6 - 6  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 6 - 6}"]`).firstChild ||
                // --
                startId - width + 1 === targetId ||
                startId - width * 2 + 2  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 + 4}"]`).firstChild || 
                startId - width * 6 + 6  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 6 + 6}"]`).firstChild ||
                // --
                startId + width - 1 === targetId ||
                startId + width * 2 - 2  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 - 4}"]`).firstChild || 
                startId + width * 6 - 6  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 6 - 6}"]`).firstChild
            ) {
                return true;
            }
            break;

        case 'rook':
            if (
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 6}"]`).firstChild ||
                //--
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 6}"]`).firstChild ||
                //--
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 6}"]`).firstChild ||
                //--
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 6}"]`).firstChild
            ) {
                return true;
            }
            break;
        case 'queen':
            if (
                startId + width + 1 === targetId ||
                startId + width * 2 + 2  === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3  === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4  === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 5 + 5  === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 6 + 6  === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7  === targetId && !document.querySelector(`[square-id]= "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 6 + 6}"]`).firstChild ||
                // --
                startId - width - 1 === targetId ||
                startId - width * 2 - 2  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 - 4}"]`).firstChild || 
                startId - width * 6 - 6  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7  === targetId && !document.querySelector(`[square-id]= "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 6 - 6}"]`).firstChild ||
                // --
                startId - width + 1 === targetId ||
                startId - width * 2 + 2  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 + 4}"]`).firstChild || 
                startId - width * 6 + 6  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7  === targetId && !document.querySelector(`[square-id]= "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId - width * 6 + 6}"]`).firstChild ||
                // --
                startId + width - 1 === targetId ||
                startId + width * 2 - 2  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild || 
                startId + width * 5 - 5  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 - 4}"]`).firstChild || 
                startId + width * 6 - 6  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7  === targetId && !document.querySelector(`[square-id]= "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id]= "${startId + width * 6 - 6}"]`).firstChild ||
                // --
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + width * 6}"]`).firstChild ||
                //--
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id] = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - width * 6}"]`).firstChild ||
                //--
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id] = "${startId + 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId + 6}"]`).firstChild ||
                //--
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id] = "${startId - 1 }"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 5}"]`).firstChild && !document.querySelector(`[square-id] = "${startId - 6}"]`).firstChild

            ) {
                return true;
            }
            break;
        case 'king':
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId    
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

function checkForWin () {
    const kings = Array.from (document.querySelectorAll('#king'))
    if (!kings.some(king => king.firstChild.classList.contains('white'))) {
        infoDisplay.innerHTML('Black player wins!')
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square.firstChild?.setAttribute('draggable', 'false'))
    } 
    if (!kings.some(king => king.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML('White player wins!')
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square.firstChild?.setAttribute('draggable', 'false'))
    } 
}