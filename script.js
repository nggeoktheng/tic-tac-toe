const gameBoard = (() => {
    const displayMessageElement = document.getElementById('display-message-element');
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.getElementById('restart-btn');

    const CIRCLE = 'circle';
    const CROSS = 'cross';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let currentPlayer = CIRCLE;
    let count = 0;

    cells.forEach(cell => cell.addEventListener('click', handleClick));

    function handleClick(e) {
        const index = e.target.id;
        const selectedSpot = e.target;
    
        // can't mark the same spot
        if (selectedSpot.classList.contains(CIRCLE) || selectedSpot.classList.contains(CROSS)) {
            return;
        }
    
        // place mark
        if (!cells[index].classList.contains(currentPlayer) && count < 9) {
            cells[index].classList.add(currentPlayer);
            count++;
        }
    
        // switch turn
        currentPlayer = currentPlayer === CIRCLE ? CROSS : CIRCLE;
    
        // check for win
        checkResult();
    
        // check for draw
        if (count === 9 && displayMessageElement.innerText === 'START GAME') {
            displayMessageElement.innerText = `It's a draw!`;
        }
    }

    function checkResult() {        
        winningCombinations.forEach(combination => {
            const circleWins = combination.every(index => cells[index].classList.contains('circle'));
            const crossWins = combination.every(index => cells[index].classList.contains('cross'));
    
            if (circleWins) {
                displayMessageElement.innerText = 'Circle wins!';
                return;
            } else if (crossWins) {
                displayMessageElement.innerText = 'Cross wins!';
                return;
            }
        });
    }

    restartBtn.addEventListener('click', restart)

    function restart() {
        cells.forEach(cell => {
            cell.classList.remove(CIRCLE);
            cell.classList.remove(CROSS);
        });

        displayMessageElement.innerText = 'START GAME';

        currentPlayer = CIRCLE;
        count = 0;
    }

    return {
        handleClick,
        checkResult,
        restart
    }
})();