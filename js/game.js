//CANVAS VARIABLES
canvas = null;
canvasContext = null;

//MAIN METHOD
window.onload = () => {
    canvas = document.getElementById('game-canvas');
    canvasContext = canvas.getContext('2d');

    initializeGameBoardValues(canvas);

    //Update Drawing
    const framesPerSecond = 60; //60;
    setInterval(() => {    
        drawBoard(gameBoard.rows, gameBoard.columns);
        drawSnake();
        drawApple();

    }, 1000/framesPerSecond);
}