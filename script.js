const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status')
const resetButton = document.getElementById('restart')

let currentPlayer = 'X';
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];


function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if(boardState[index] !== "" || !gameActive) { 
        return;
     }

     boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    checkWinners();
}

function checkWinners() {
    let roundWon = false;

    for(let condition of winCondition) {
        const [a,b,c] = condition;
        if(boardState[a] === boardState[b] && boardState[b] === boardState[c] && boardState[a]!== "") {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if(!boardState.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function resetGame(){
    currentPlayer = "X";
    gameActive = true;
    boardState = ["", "", "", "", "", "", "", "", "",];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    })
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

resetButton.addEventListener('click', resetGame);