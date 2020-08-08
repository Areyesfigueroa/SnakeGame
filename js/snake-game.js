//CANVAS VARIABLES
canvas = null;
canvasContext = null;

//MAIN METHOD
window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    initializeGameBoardValues(canvas);

    //Update Drawing
    const framesPerSecond = 5; //60;
    setInterval(() => {    
        drawBoard(gameBoard.rows, gameBoard.columns);
        drawSnake();
        // drawRotationTile();

    }, 1000/framesPerSecond);
}