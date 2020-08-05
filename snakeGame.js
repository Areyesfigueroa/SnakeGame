
//Factory Function
const GameObject = (x, y, w, h) => {
    
    return {
        posX: x,
        posY: y,
        width: w,
        height: h
    };
}

//CANVAS VARIABLES
canvas = null;
canvasContext = null;

//SNAKE VARIABLES
const DIRECTIONS = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
}

const arrowKeys = {
    left: {code: 37, active: false},
    up: {code: 38, active: false},
    right: {code: 39, active: false},
    down: {code: 40, active: false}
}

const snake = {
    posX: 100,
    posY: 100,
    width: 50,
    height: 50,
    unitLength: 0,
    angle: 0,
    facingDirection: DIRECTIONS.RIGHT
};

let snakeBodyParts = [];

let image = new Image();
image.src = './snake-sprite.png';

let rotateSpeed=0;
let rotateTo=0;
let moveSpeed=0;
let nextTile = null;
let latestInput = null;

//SNAKE DRAW METHODS
const drawSnake = () => {

    //Update Movement
    updateObjMovementValues(snake);

    //Update Rotation 
    updateObjRotationValues(snake);

    drawSnakeBody();

    //Draw Snake and Update Rotation
    rotate(rotateSpeed, rotateTo, snake);
}

const rotate = (angleSpeed, destAngle, drawingObj) => {
    if(angleSpeed > 0) {
        // console.log("right");
        if(drawingObj.angle >= destAngle) {
            drawingObj.angle = destAngle;
        } else {
            drawingObj.angle += angleSpeed;
        }
    } else {
        // console.log("left");
        if(drawingObj.angle <= destAngle) {
            drawingObj.angle = destAngle;
        } else {
            drawingObj.angle += angleSpeed;
        }
    }
    //Rotate Snake Head
    canvasContext.save();
    canvasContext.translate(drawingObj.width/2 + drawingObj.posX, drawingObj.height/2 + drawingObj.posY);
    canvasContext.rotate(Math.PI/180 * drawingObj.angle);

    //Snake Head
    canvasContext.drawImage(image, -drawingObj.width/2, -drawingObj.height/2, drawingObj.width, drawingObj.height);
    canvasContext.restore();
    // canvasContext.drawImage(image, drawingObj.posX, drawingObj.posY, drawingObj.width, drawingObj.height);
}

const drawSnakeBody = () => {

    if(!snake.unitLength) return;

    for(let i = 0; i < snakeBodyParts.length; i++) {
        //Update movements
        updateObjMovementValues(snakeBodyParts[i]);

        //Update our rotations
        // updateObjRotationValues(snakeBodyParts[i]);

        canvasContext.fillStyle = "purple";
        canvasContext.fillRect(snakeBodyParts[i].posX, snakeBodyParts[i].posY, snakeBodyParts[i].width, snakeBodyParts[i].height);
    }
}

const updateSnakeBodyRotationValues = () => {

    // //Update rotation values based on facing direction.
    // switch(latestInput) {
    //     case arrowKeys.up.code:
    //         rotateSpeed = obj.facingDirection === DIRECTIONS.RIGHT ? -20:20;
    //         rotateTo += obj.facingDirection === DIRECTIONS.RIGHT ? -90:90;

    //         obj.facingDirection = DIRECTIONS.UP;
    //         break;
    //     case arrowKeys.down.code:
    //         rotateSpeed = obj.facingDirection === DIRECTIONS.RIGHT ? 20: -20;
    //         rotateTo += obj.facingDirection === DIRECTIONS.RIGHT ? 90: -90;

    //         obj.facingDirection = DIRECTIONS.DOWN;
    //         break;
    //     case arrowKeys.left.code:
    //         rotateSpeed = obj.facingDirection === DIRECTIONS.UP ? -20:20;
    //         rotateTo += obj.facingDirection === DIRECTIONS.UP ? -90: 90;

    //         obj.facingDirection = DIRECTIONS.LEFT;
    //         break;
    //     case arrowKeys.right.code:
    //         rotateSpeed = obj.facingDirection === DIRECTIONS.UP ? 20:-20;
    //         rotateTo += obj.facingDirection === DIRECTIONS.UP ? 90: -90;

    //         obj.facingDirection = DIRECTIONS.RIGHT;
    //         break;
    // }

}

//SNAKE DATA HANDLER METHODS
const updateObjRotationValues = (obj) => {
    //Have reached
    if(latestInput && hasReachedNextTile(obj) && !isSnakeRotating()) {
        
        //Update rotation values based on facing direction.
        switch(latestInput) {
            case arrowKeys.up.code:
                rotateSpeed = obj.facingDirection === DIRECTIONS.RIGHT ? -20:20;
                rotateTo += obj.facingDirection === DIRECTIONS.RIGHT ? -90:90;

                obj.facingDirection = DIRECTIONS.UP;
                break;
            case arrowKeys.down.code:
                rotateSpeed = obj.facingDirection === DIRECTIONS.RIGHT ? 20: -20;
                rotateTo += obj.facingDirection === DIRECTIONS.RIGHT ? 90: -90;

                obj.facingDirection = DIRECTIONS.DOWN;
                break;
            case arrowKeys.left.code:
                rotateSpeed = obj.facingDirection === DIRECTIONS.UP ? -20:20;
                rotateTo += obj.facingDirection === DIRECTIONS.UP ? -90: 90;

                obj.facingDirection = DIRECTIONS.LEFT;
                break;
            case arrowKeys.right.code:
                rotateSpeed = obj.facingDirection === DIRECTIONS.UP ? 20:-20;
                rotateTo += obj.facingDirection === DIRECTIONS.UP ? 90: -90;

                obj.facingDirection = DIRECTIONS.RIGHT;
                break;
        }

        //Reset latest input.
        latestInput = null;
    }
}

const updateObjMovementValues = (obj) => {
    //Update Movement
    switch(obj.facingDirection) {
        case DIRECTIONS.RIGHT:
            obj.posX += moveSpeed;
            break;
        case DIRECTIONS.LEFT:
            obj.posX -= moveSpeed;
            break;
        case DIRECTIONS.DOWN:
            obj.posY += moveSpeed;
            break;
        case DIRECTIONS.UP:
            obj.posY -= moveSpeed;
            break;
        default:
            moveSpeed = 0;
    }
}

const updateSnakeNextTileValues = () => {

    //Get the turning point coordinates so that we can draw them. 

    //Update target
    let idx = 0, direction = null;
    switch(snake.facingDirection) {
        case DIRECTIONS.UP:
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.posY) - 1;
            nextTile = gameBoard.coordinates.yAxis[idx];

            gameBoard.rotationTiles.push({posX: snake.posX, posY: nextTile});
            break;
        case DIRECTIONS.DOWN:
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.posY); 
            nextTile = gameBoard.coordinates.yAxis[idx];

            gameBoard.rotationTiles.push({posX: snake.posX, posY: nextTile});
            break;
        case DIRECTIONS.LEFT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.posX) - 1;
            nextTile = gameBoard.coordinates.xAxis[idx];

            gameBoard.rotationTiles.push({posX: nextTile - tile.height, posY: nextTile});
            break;
        case DIRECTIONS.RIGHT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.posX); 
            nextTile = gameBoard.coordinates.xAxis[idx];
            direction = DIRECTIONS.RIGHT;
            break;
        default:
            console.log(`${snake.facingDirection} is not correct`);
    }

    //Update rotationTiles for snake body to use
}

const updateSnakeBodyValues = () => {
    let newBodyPart = null;
    switch(snake.facingDirection) {
        case DIRECTIONS.RIGHT:
            newBodyPart = GameObject(snake.posX - (snake.width * snake.unitLength), snake.posY, snake.width, snake.height);
            newBodyPart.facingDirection = DIRECTIONS.RIGHT;
            snakeBodyParts.push(newBodyPart);
            break;
    }
}


//SNAKE HELPER METHODS
const hasReachedNextTile = (obj) => {
    //There has to be a next tile and we have either gone past it on x or y axis. 
    if(!nextTile) return false;

    if(obj.facingDirection === DIRECTIONS.LEFT) {
        return obj.posX <= nextTile;
    }

    if(obj.facingDirection === DIRECTIONS.RIGHT) {
        return obj.posX >= nextTile;
    }

    if(obj.facingDirection === DIRECTIONS.UP) {
        return obj.posY <= nextTile;
    }

    if(obj.facingDirection === DIRECTIONS.DOWN) {
        return obj.posY >= nextTile;
    }
}

const isInputValid = (facingDirection, keyCode) => {
    if(facingDirection === DIRECTIONS.RIGHT) {
        return (keyCode === arrowKeys.up.code || keyCode === arrowKeys.down.code);
    }

    if(facingDirection === DIRECTIONS.LEFT) {
        return (keyCode === arrowKeys.up.code || keyCode === arrowKeys.down.code);
    }

    if(facingDirection === DIRECTIONS.UP) {
        return (keyCode === arrowKeys.left.code || keyCode === arrowKeys.right.code); 
    }

    if(facingDirection === DIRECTIONS.DOWN) {
        return (keyCode === arrowKeys.left.code || keyCode === arrowKeys.right.code);   
    }

}

const setArrowKeys = (active) => {
    for(key in arrowKeys) {
        arrowKeys[key].active = active;
    }
}

const isSnakeRotating = () => {
    return snake.angle !== rotateTo;
}

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
    width: snake.width,
    height: snake.height
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
const drawTestCube = (x, y, w, h) => {
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(x, y, w, h);
}

const drawRotationTile = () => {
    for(key in gameBoard.rotationTiles) {
        drawTestCube(gameBoard.rotationTiles[key], snake.posY, 50, 50);

        // drawTestCube(gameBoard.rotationTiles[key].posX, gameBoard.rotationTiles[key].posY, gameBoard.rotationTiles[key].width, gameBoard.rotationTiles[key].height);
    }
}

//MAIN METHOD
window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    initializeGameBoardValues(canvas);

    //Update Drawing
    const framesPerSecond = 60;
    setInterval(() => {    
        drawBoard(gameBoard.rows, gameBoard.columns);
        drawSnake();
        drawRotationTile();


    }, 1000/framesPerSecond);
    
    //EVENT LISTENERS
    document.addEventListener('keydown', (event) => {
        
        //Can the snake move in this direction.
        if(isInputValid(snake.facingDirection, event.keyCode)) {
            //Save latest input. 
            latestInput = event.keyCode;

            updateSnakeNextTileValues();
            
        }

        //TESTING - Spacebar
        if(event.keyCode === 32) {
            console.log("Move");            
            moveSpeed = moveSpeed ? 0:3;
        }

        //TESTING - Shift
        if(event.keyCode === 16) {
            //Update Snake Body
            snake.unitLength += 1;
            updateSnakeBodyValues();
        }
    });
}