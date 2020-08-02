canvas = null;
canvasContext = null;

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
    unitLength: 1,
    angle: 0,
    facingDirection: DIRECTIONS.RIGHT
};

const tile= {
    posX: 0,
    posY: 0,
    style: '#B7E3BD',
    width: snake.width,
    height: snake.height
}

let image = new Image();
image.src = './snake-sprite.png';

let rotateSpeed=0;
let rotateTo=0;
let moveSpeed=0;
let nextTile = null;
let latestInput = null;

const gameBoard = {
    columns: 0,
    rows: 0,
    coordinates: {
        xAxis: [],
        yAxis: []
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

const drawSnake = () => {

    //Update Movement
    switch(snake.facingDirection) {
        case DIRECTIONS.RIGHT:
            snake.posX += moveSpeed;
            break;
        case DIRECTIONS.LEFT:
            snake.posX -= moveSpeed;
            break;
        case DIRECTIONS.DOWN:
            snake.posY += moveSpeed;
            break;
        case DIRECTIONS.UP:
            snake.posY -= moveSpeed;
            break;
        default:
            moveSpeed = 0;
    }

    //Update Rotation
    updateRotationValues();

    //Snake Body
    for(let i = 1; i < snake.unitLength; i++) {
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(snake.posX - ((snake.width)*i), snake.posY, snake.width, snake.height);
    }
    //Draw Snake and Update Rotation
    rotate(rotateSpeed, rotateTo, snake);
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

const hasReachedNextTile = () => {
    //There has to be a next tile and we have either gone past it on x or y axis. 
    if(!nextTile) return false;

    if(snake.facingDirection === DIRECTIONS.LEFT) {
        return snake.posX <= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.RIGHT) {
        return snake.posX >= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.UP) {
        return snake.posY <= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.DOWN) {
        return snake.posY >= nextTile;
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

const updateRotationValues = () => {
    //Have reached
    if(latestInput && hasReachedNextTile() && !isSnakeRotating()) {
        
        //Update rotation values based on facing direction.
        switch(latestInput) {
            case arrowKeys.up.code:
                rotateSpeed = snake.facingDirection === DIRECTIONS.RIGHT ? -20:20;
                rotateTo += snake.facingDirection === DIRECTIONS.RIGHT ? -90:90;

                snake.facingDirection = DIRECTIONS.UP;
                break;
            case arrowKeys.down.code:
                rotateSpeed = snake.facingDirection === DIRECTIONS.RIGHT ? 20: -20;
                rotateTo += snake.facingDirection === DIRECTIONS.RIGHT ? 90: -90;

                snake.facingDirection = DIRECTIONS.DOWN;
                break;
            case arrowKeys.left.code:
                rotateSpeed = snake.facingDirection === DIRECTIONS.UP ? -20:20;
                rotateTo += snake.facingDirection === DIRECTIONS.UP ? -90: 90;

                snake.facingDirection = DIRECTIONS.LEFT;
                break;
            case arrowKeys.right.code:
                rotateSpeed = snake.facingDirection === DIRECTIONS.UP ? 20:-20;
                rotateTo += snake.facingDirection === DIRECTIONS.UP ? 90: -90;

                snake.facingDirection = DIRECTIONS.RIGHT;
                break;
        }

        //Reset latest input.
        latestInput = null;

        //Update the next target.
        nextTile = snake.posX + tile.width;
    }
}

const drawNextTile = (x, y, w, h) => {
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(x, y, w, h);
}

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

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

    //Update Drawing
    const framesPerSecond = 60;
    setInterval(() => {    
        drawBoard(gameBoard.rows, gameBoard.columns);
        drawSnake();
    }, 1000/framesPerSecond);
    

    //EVENT LISTENERS
    document.addEventListener('keydown', (event) => {
        
        //Can the snake move in this direction.
        if(isInputValid(snake.facingDirection, event.keyCode)) {
            //Save latest input. 
            latestInput = event.keyCode;

            //Update target
            let idx = 0;
            switch(snake.facingDirection) {
                case DIRECTIONS.UP:
                    idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.posY) - 1;
                    nextTile = gameBoard.coordinates.yAxis[idx];
                    drawNextTile(snake.posX, gameBoard.coordinates.yAxis[idx], 10, 10);
                    break;
                case DIRECTIONS.DOWN:
                    idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.posY); 
                    nextTile = gameBoard.coordinates.yAxis[idx];
                    drawNextTile(snake.posX, gameBoard.coordinates.yAxis[idx], 10, 10);
                    break;
                case DIRECTIONS.LEFT:
                    idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.posX) - 1;
                    nextTile = gameBoard.coordinates.xAxis[idx];
                    drawNextTile(gameBoard.coordinates.xAxis[idx], snake.posY, 10, 10);
                    break;
                case DIRECTIONS.RIGHT:
                    idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.posX); 
                    nextTile = gameBoard.coordinates.xAxis[idx];
                    drawNextTile(gameBoard.coordinates.xAxis[idx], snake.posY, 10, 10);
                    break;
                default:
                    console.log(`${latestInput} is not correct`);
            }
            console.log(nextTile);
            
        }

        //TESTING
        if(event.keyCode === 32) {
            console.log("Move");            
            moveSpeed = 3;
        }

        //TESTING
        if(event.keyCode === 16) {
            snake.unitLength += 1;
        }
    });
}



    // let posX=200, posY=200, width=200, height=200;

    // canvasContext.save();
    // canvasContext.translate(posX, posY);
    // canvasContext.rotate(Math.PI/90);
    // canvasContext.fillStyle = "blue";
    // canvasContext.fillRect((-1*posX)/2,(-1*posY)/2,width, height);
    // canvasContext.restore();

        // document.addEventListener('keyup', (event) => {
    //     if(event.keyCode === arrowKeys.left.code) {
    //         // arrowKeys.left.active = false;
    //     } 
    //     if(event.keyCode === arrowKeys.right.code) {
    //         arrowKeys.right.active = false;
    //     } 
    //     if(event.keyCode === arrowKeys.up.code) {
    //         arrowKeys.up.active = false;
    //     } 
    //     if(event.keyCode === arrowKeys.down.code) {
    //         arrowKeys.down.active = false;
    //     } 
    // });

    // if(snake.facingDirection === DIRECTIONS.RIGHT) {

    //     //Rotate once we reach the target
    //     if(event.keyCode === arrowKeys.up.code && !isSnakeRotating()) {

    //         //Update latest input
    //         latestInput = DIRECTIONS.UP;

    //         rotateSpeed =-20;
    //         rotateTo += -90;

    //         snake.facingDirection = DIRECTIONS.UP;
    //     } 
    //     if(event.keyCode === arrowKeys.down.code && !isSnakeRotating()) {
    //         rotateSpeed =20;
    //         rotateTo += 90;

    //         snake.facingDirection = DIRECTIONS.DOWN;
    //     } 
    // }

    // if(snake.facingDirection === DIRECTIONS.LEFT) {
    //     if(event.keyCode === arrowKeys.up.code && !isSnakeRotating()) {
    //         rotateSpeed =20;
    //         rotateTo += 90;

    //         snake.facingDirection = DIRECTIONS.UP;
    //     } 
    //     if(event.keyCode === arrowKeys.down.code && !isSnakeRotating()) {
    //         rotateSpeed =-20;
    //         rotateTo += -90;

    //         snake.facingDirection = DIRECTIONS.DOWN;
    //     } 
    // }

    // if(snake.facingDirection === DIRECTIONS.UP) {
    //     if(event.keyCode === arrowKeys.left.code && !isSnakeRotating()) {
    //         rotateSpeed =-20;
    //         rotateTo += -90;

    //         snake.facingDirection = DIRECTIONS.LEFT;
    //     } 
    //     if(event.keyCode === arrowKeys.right.code && !isSnakeRotating()) {
    //         rotateSpeed =20;
    //         rotateTo += 90;

    //         snake.facingDirection = DIRECTIONS.RIGHT;
    //     }     
    // }

    // if(snake.facingDirection === DIRECTIONS.DOWN) {
    //     if(event.keyCode === arrowKeys.left.code && !isSnakeRotating()) {
    //         rotateSpeed =20;
    //         rotateTo += 90;

    //         snake.facingDirection = DIRECTIONS.LEFT;
    //     } 
    //     if(event.keyCode === arrowKeys.right.code && !isSnakeRotating()) {
    //         rotateSpeed =-20;
    //         rotateTo += -90;

    //         snake.facingDirection = DIRECTIONS.RIGHT;
    //     }     
    // }

    // //TESTING
    // if(event.keyCode === 32) {
    //     console.log("Move");
        
    //     nextTile = snake.posX + tile.width;
    //     moveSpeed = moveSpeed ? 0:1;
    // }

    // //TESTING
    // if(event.keyCode === 16) {
    //     snake.unitLength += 1;
    // }
        
