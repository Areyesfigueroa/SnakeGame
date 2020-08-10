//CANVAS VARIABLES
canvas = null;
canvasContext = null;

const DOMstrings = {
    appleScore: "apple-score",
    trophyScore: "trophy-score",
    gameOverModal: "game-over-modal",
    gameOverScore: "game-over-score",
    leaderboard: ".leaderboard",
    active: "active"
};

//GAME VARIABLES
const gameState = {
    gameOver: false,
    paused: false
}

//MAIN METHOD
window.onload = () => {
    canvas = document.getElementById('game-canvas');
    canvasContext = canvas.getContext('2d');

    initializeGameBoardValues(canvas);

    //Update Drawing
    let framesPerSecond = 60; //60;

    let gameInterval = setInterval(() => {  
        if(gameState.gameOver) gameOver(gameInterval);

        drawBoard(gameBoard.rows, gameBoard.columns);
        drawSnake();
        drawScoreBoard();
        drawApple();

    }, 1000/framesPerSecond);
}

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