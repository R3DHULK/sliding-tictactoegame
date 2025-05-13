document.addEventListener('DOMContentLoaded', () => {
    const gameSetup = document.getElementById('game-setup');
    const gameBoard = document.getElementById('game-board');
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset');
    const themeToggle = document.getElementById('theme-toggle');
    const xCountDisplay = document.getElementById('x-count');
    const oCountDisplay = document.getElementById('o-count');
    const vsPlayerBtn = document.getElementById('vs-player');
    const vsComputerBtn = document.getElementById('vs-computer');
    const startGameBtn = document.getElementById('start-game');

    let currentPlayer = 'x';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let againstComputer = false;
    let gameStarted = false;
    let gameOver = false;

    // Track player moves in order
    let xMoves = [];
    let oMoves = [];

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Game Mode Selection
    vsPlayerBtn.addEventListener('click', () => {
        vsPlayerBtn.classList.add('active');
        vsComputerBtn.classList.remove('active');
        againstComputer = false;
    });

    vsComputerBtn.addEventListener('click', () => {
        vsComputerBtn.classList.add('active');
        vsPlayerBtn.classList.remove('active');
        againstComputer = true;
    });

    startGameBtn.addEventListener('click', () => {
        gameSetup.style.display = 'none';
        gameBoard.style.display = 'block';
        gameStarted = true;
        resetGame();
    });

    // Cell click handler
    const handleCellClick = (event) => {
        if (!gameStarted) return;

        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // If cell is already filled or game is not active, return
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Handle the move
        handlePlayerMove(clickedCellIndex);

        // If playing against computer and no win/draw yet, make computer move
        if (againstComputer && gameActive && currentPlayer === 'o') {
            setTimeout(() => {
                makeComputerMove();
            }, 700);
        }
    };

    // Handle player move
    const handlePlayerMove = (cellIndex) => {
        gameState[cellIndex] = currentPlayer;

        // Add move to player's moves array
        if (currentPlayer === 'x') {
            xMoves.push(cellIndex);
        } else {
            oMoves.push(cellIndex);
        }

        // Update UI
        cells[cellIndex].classList.add(currentPlayer);
        updateMovesDisplay();
        
        // Check for win or draw before potentially removing oldest mark
        const gameResult = checkGameResult();
        
        // Only remove oldest mark if no win occurred and player has more than 2 marks
        if (!gameOver) {
            if (currentPlayer === 'x' && xMoves.length > 2) {
                // Remove oldest X mark
                const oldestCell = document.querySelector(`.cell[data-index="${xMoves[0]}"]`);
                oldestCell.classList.add('fade-out');

                setTimeout(() => {
                    gameState[xMoves[0]] = '';
                    oldestCell.classList.remove('x', 'fade-out');
                    oldestCell.classList.add('fade-in');

                    setTimeout(() => {
                        oldestCell.classList.remove('fade-in');
                    }, 500);

                    xMoves.shift();
                    updateMovesDisplay();
                    checkGameResult(); // Check again after removal
                }, 500);
            } else if (currentPlayer === 'o' && oMoves.length > 2) {
                // Remove oldest O mark
                const oldestCell = document.querySelector(`.cell[data-index="${oMoves[0]}"]`);
                oldestCell.classList.add('fade-out');

                setTimeout(() => {
                    gameState[oMoves[0]] = '';
                    oldestCell.classList.remove('o', 'fade-out');
                    oldestCell.classList.add('fade-in');

                    setTimeout(() => {
                        oldestCell.classList.remove('fade-in');
                    }, 500);

                    oMoves.shift();
                    updateMovesDisplay();
                    checkGameResult(); // Check again after removal
                }, 500);
            }
            
            // Switch player if game is still active
            if (gameActive) {
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
                updateStatus();
            }
        }
    };

    // Computer move
    const makeComputerMove = () => {
        if (!gameActive) return;

        // First try to win
        const winMove = findBestMove('o');
        if (winMove !== -1) {
            handlePlayerMove(winMove);
            return;
        }

        // Then try to block
        const blockMove = findBestMove('x');
        if (blockMove !== -1) {
            handlePlayerMove(blockMove);
            return;
        }

        // Try center
        if (gameState[4] === '') {
            handlePlayerMove(4);
            return;
        }

        // Try corners
        const corners = [0, 2, 6, 8].filter(i => gameState[i] === '');
        if (corners.length > 0) {
            const randomCorner = corners[Math.floor(Math.random() * corners.length)];
            handlePlayerMove(randomCorner);
            return;
        }

        // Try any available cell
        const availableCells = gameState.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
        if (availableCells.length > 0) {
            const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            handlePlayerMove(randomCell);
        }
    };

    // Find best move for winning or blocking
    const findBestMove = (player) => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;

            // Check if two cells are filled with player's mark and third is empty
            if (gameState[a] === player && gameState[b] === player && gameState[c] === '') {
                return c;
            }
            if (gameState[a] === player && gameState[c] === player && gameState[b] === '') {
                return b;
            }
            if (gameState[b] === player && gameState[c] === player && gameState[a] === '') {
                return a;
            }
        }

        return -1; // No winning move found
    };

    // Update moves display
    const updateMovesDisplay = () => {
        xCountDisplay.textContent = `${xMoves.length}/2`;
        oCountDisplay.textContent = `${oMoves.length}/2`;
    };

    // Update game status message
    const updateStatus = () => {
        status.className = 'status';
        status.classList.add(currentPlayer === 'x' ? 'x-turn' : 'o-turn');
        status.textContent = `${currentPlayer.toUpperCase()}'s turn`;
    };

    // Check for win or draw
    const checkGameResult = () => {
        let roundWon = false;
        let winningCombo;

        // Check for winning combinations
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                winningCombo = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            const winner = gameState[winningCombo[0]];
            status.textContent = `${winner.toUpperCase()} wins!`;
            status.className = 'status winner';
            gameActive = false;
            gameOver = true;

            // Highlight winning cells
            winningCombo.forEach(index => {
                cells[index].classList.add('winning');
            });

            return true;
        }

        // Check for draw
        const fullBoard = !gameState.includes('');
        if (fullBoard && xMoves.length === 2 && oMoves.length === 2) {
            status.textContent = "It's a draw!";
            status.className = 'status draw';
            gameActive = false;
            gameOver = true;
            return true;
        }

        return false;
    };

    // Reset game
    const resetGame = () => {
        currentPlayer = 'x';
        gameActive = true;
        gameOver = false;
        gameState = ['', '', '', '', '', '', '', '', ''];
        xMoves = [];
        oMoves = [];

        // Reset UI
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'fade-out', 'fade-in', 'winning');
        });

        updateStatus();
        updateMovesDisplay();

        // If playing against computer as O, computer goes first
        if (gameStarted && againstComputer && currentPlayer === 'o') {
            setTimeout(() => {
                makeComputerMove();
            }, 700);
        }
    };

    // Theme toggle
    const toggleTheme = () => {
        document.body.classList.toggle('light-theme');
    };

    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetBtn.addEventListener('click', () => {
        resetGame();
        if (!gameStarted) {
            gameSetup.style.display = 'block';
            gameBoard.style.display = 'none';
            gameStarted = false;
        }
    });

    themeToggle.addEventListener('change', toggleTheme);
});
