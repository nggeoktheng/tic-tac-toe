const displayController = (() => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const board = document.querySelector('.board');

    // start game
    startBtn.addEventListener('click', startGameDisplay);

    function startGameDisplay() {
        board.style.display = 'grid';
        startBtn.style.display = 'none';
        restartBtn.style.display = 'block';

        // make the players' name input hidden once the players press start
        const player1_div = document.querySelector('.player1');
        const player2_div = document.querySelector('.player2');
        player1_div.style.display = 'none';
        player2_div.style.display = 'none';

        // store the players' name in object
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;

        // display players' name on the browser
        const displayMessage = document.getElementById('display-message-element');
        displayMessage.innerText = `${player1} (O) vs ${player2} (X)`;
    }
})();

const gameBoard = (() => {
    const cells = document.querySelectorAll('.cell');
    const displayResult = document.getElementById('display-result-element');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 5, 8]
    ];
    let turn = 'circle';
    let round = 0;

    cells.forEach(cell => cell.addEventListener('click', handleClick));

    function handleClick(e) {
        const selectedSpot = e.target;

        // if existing spot is marked, that spot can't be clicked
        if (selectedSpot.classList.contains('circle') || selectedSpot.classList.contains('cross')) {
            return;
        }

        // place mark
        if (turn) {
            selectedSpot.classList.add('circle');
        } else {
            selectedSpot.classList.add('cross');
        }

        // switch turn
        switchTurn();

        // check for win
        checkResult();
    }

    function switchTurn() {
        turn = !turn;
    }

    function checkResult() {        
        winningCombinations.forEach(combination => {
            const circleWins = combination.every(index => cells[index].classList.contains('circle'));
            const crossWins = combination.every(index => cells[index].classList.contains('cross'));

            if (circleWins) {
                displayResult.style.display = 'block';
                displayResult.innerText = 'Circle wins!';
                // remove addEventListener
                cells.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
                return;
            } else if (crossWins) {
                displayResult.style.display = 'block';
                displayResult.innerText = 'Cross wins!';
                // remove addEventListener
                cells.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
                return;
            }
        });
    }
})();
