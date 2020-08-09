//GAME BOARD VARIABLES
const gameBoard = {
    columns: 0,
    rows: 0,
    coordinates: {
        xAxis: [],
        yAxis: []
    },
    width: 0,
    height: 0
}

const tile= {
    posX: 0,
    posY: 0,
    style: '#B7E3BD',
    size: 50
}

//GAME BOARD METHODS
const initializeGameBoardValues = (canvas) => {
    //Initialize Board
    gameBoard.columns = canvas.width/tile.size;
    gameBoard.rows = canvas.height/tile.size;

    gameBoard.width = canvas.width;
    gameBoard.height = canvas.height;

    //Initialize Coordinates
    for(let i = 0; i <= gameBoard.rows; i++) {
        gameBoard.coordinates.yAxis.push(tile.size * i);
    } 
    for(let i = 0; i <= gameBoard.columns; i++) {
        gameBoard.coordinates.xAxis.push(tile.size * i);
    } 
}

const drawBoard = (rows, columns) => {
    //Draw Board
    let startingStyle = tile.style;
    for(let row = 0; row < rows; row++) {
        for(let col=0; col < columns; col++) {
            canvasContext.fillStyle = tile.style;
            canvasContext.fillRect(tile.posX + (tile.size * col),tile.posY + (tile.size * row),tile.size,tile.size);
            
            tile.style = tile.style === "#709E7C" ? "#B7E3BD":"#709E7C";
        }
        tile.posX = 0;
        tile.style = startingStyle==="#B7E3BD" ? "#709E7C": "#B7E3BD";
        startingStyle = tile.style;
    }
}