
//Factory Function
const GameObject = (x, y, w, h) => { 
    return {
        posX: x,
        posY: y,
        width: w,
        height: h
    };
}

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
    width: tile.width,
    height: tile.height,
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

//SNAKE DATA HANDLER METHODS
//TESTING
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

//TODO: Testing how to store next tile coordinates. 
const updateSnakeNextTileValues = () => {

    //Get the turning point coordinates so that we can draw them. 

    //Update target
    let idx = 0;
    switch(snake.facingDirection) {
        case DIRECTIONS.UP:
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.posY) - 1;
            nextTile = gameBoard.coordinates.yAxis[idx];

            gameBoard.rotationTiles.push({ posX: snake.posX, posY: nextTile, width: tile.width, height: tile.height});
            break;
        case DIRECTIONS.DOWN:
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.posY); 
            nextTile = gameBoard.coordinates.yAxis[idx];

            gameBoard.rotationTiles.push({ posX: snake.posX, posY: nextTile, width: tile.width, height: tile.height});
            break;
        case DIRECTIONS.LEFT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.posX) - 1;
            nextTile = gameBoard.coordinates.xAxis[idx];

            gameBoard.rotationTiles.push({ posX: nextTile, posY: snake.posY, width: tile.width, height: tile.height});
            break;
        case DIRECTIONS.RIGHT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.posX); 
            nextTile = gameBoard.coordinates.xAxis[idx];

            gameBoard.rotationTiles.push({ posX: nextTile, posY: snake.posY, width: tile.width, height: tile.height});
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

const isSnakeRotating = () => {
    return snake.angle !== rotateTo;
}

const setArrowKeys = (active) => {
    for(key in arrowKeys) {
        arrowKeys[key].active = active;
    }
}