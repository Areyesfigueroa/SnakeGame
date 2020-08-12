//CANVAS VARIABLES
canvas = null;
canvasContext = null;

const DOMstrings = {
    appleScore: "apple-score",
    trophyScore: "trophy-score",
    gameOverModal: "game-over-modal",
    gameOverScore: "game-over-score",
    leaderboard: ".leaderboard",
    lbAppleScore: 'lb-apple-score',
    lbTrophyScore: 'lb-trophy-score',
    active: "active",
    playAgainBtn: "play-again-btn"
};

//GAME VARIABLES
let gameOverFlag = false;

//MAIN METHOD
window.onload = () => {
    canvas = document.getElementById('game-canvas');
    canvasContext = canvas.getContext('2d');

    initializeGameBoardValues(canvas);

    gameLoop();
}

const gameLoop = () => {
    //Update Drawing
    let framesPerSecond = 60; //60;

    let gameInterval = setInterval(() => {  
        if(gameOverFlag) gameOver(gameInterval);

        drawBoard(gameBoard.rows, gameBoard.columns);
        drawSnake();
        drawScoreBoard();
        drawApple();
    }, 1000/framesPerSecond);
}

const playAgainBtnEl = document.getElementById(DOMstrings.playAgainBtn);
playAgainBtnEl.addEventListener('click', () => {
    console.log('Reset');
    //Remove GameOverScreen
    const gameOverModalEl = document.getElementById(DOMstrings.gameOverModal);
    gameOverModalEl.classList.toggle(DOMstrings.active);

    //Reset snake
    resetSnake();

    //Reset apple
    resetApple();

    //Reset scoreboard
    resetScoreboard();

    //Remove GameOver State
    gameOverFlag = false;

    //Start gameLoop
    gameLoop();
});

const gameOver = (interval) => {
    //Stop the game
    clearInterval(interval);

    //Add gameOver Score
    updateGameOverScore();

    //Add score to leaderboard
    updateLeaderboard();

    //Load the gameOver modal.
    const gameOverModalEl = document.getElementById(DOMstrings.gameOverModal);
    gameOverModalEl.classList.toggle(DOMstrings.active);
}