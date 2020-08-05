//GAME BOARD VARIABLES
const gameBoard = {
    columns: 0,
    rows: 0,
    coordinates: {
        xAxis: [],
        yAxis: []
    },
    rotationTiles: []
}
const tile= {
    posX: 0,
    posY: 0,
    style: '#B7E3BD',
    width: 50,
    height: 50
}

//GAME BOARD METHODS
const initializeGameBoardValues = (canvas) => {
    //Initialize Board
    gameBoard.columns = canvas.width/tile.width;
    gameBoard.rows = canvas.height/tile.height;

    //Initialize Coordinates
    for(let i = 0; i <= gameBoard.rows; i++) {
        gameBoard.coordinates.yAxis.push(tile.height * i);
    } 
    for(let i = 0; i <= gameBoard.columns; i++) {
        gameBoard.coordinates.xAxis.push(tile.width * i);
    } 
}

const drawBoard = (rows, columns) => {
    //Draw Board
    let startingStyle = tile.style;
    for(let row = 0; row < rows; row++) {
        for(let col=0; col < columns; col++) {
            canvasContext.fillStyle = tile.style;
            canvasContext.fillRect(tile.posX + (tile.width * col),tile.posY + (tile.height * row),tile.width,tile.height);
            
            tile.style = tile.style === "#709E7C" ? "#B7E3BD":"#709E7C";
        }
        tile.posX = 0;
        tile.style = startingStyle==="#B7E3BD" ? "#709E7C": "#B7E3BD";
        startingStyle = tile.style;
    }
}

//GAME BOARD TESTING METHODS
const drawRotationTile = () => {
    for(key in gameBoard.rotationTiles) {
        drawTestCube(gameBoard.rotationTiles[key], snake.posY, 50, 50);

        // drawTestCube(gameBoard.rotationTiles[key].posX, gameBoard.rotationTiles[key].posY, gameBoard.rotationTiles[key].width, gameBoard.rotationTiles[key].height);
    }
}