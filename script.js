const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cell1 = gameBoard[condition[0]];
    const cell2 = gameBoard[condition[1]];
    const cell3 = gameBoard[condition[2]];

    if (cell1 && cell1 === cell2 && cell2 === cell3) {
      return cell1;
    }
  }

  return null;
}

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.dataset.cellIndex);

  // Check if the cell is already filled or the game is over
  if (gameBoard[cellIndex] === null && !checkWinner()) {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
      message.textContent = `Player ${winner} wins!`;
      cells.forEach(cell => cell.removeEventListener('click', handleCellClick)); // Disable clicks after win
    } else if (gameBoard.every(cell => cell !== null)) {
      message.textContent = `It's a tie!`;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick)); // Add click listener to cells

restartButton.addEventListener('click', () => { // Restart game functionality
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  message.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.addEventListener('click', handleCellClick)); // Re-enable clicks
});
