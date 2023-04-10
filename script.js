const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const board = document.querySelector('.board');

startBtn.addEventListener('click', () => {
    board.style.display = 'grid';
    startBtn.style.display = 'none';
    restartBtn.style.display = 'block';
})