
//Factory Function
const GameObject = (x, y, w, h) => { 
    return {
        posX: x,
        posY: y,
        width: w,
        height: h
    };
}

//VARIABLES
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
    body: [
        {x: 150, y: 100},
        {x: 100, y: 100},
        {x: 50, y: 100}
    ],
    width: tile.width,
    height: tile.height,
    angle: 0,
    facingDirection: DIRECTIONS.RIGHT
};

let image = new Image();
image.src = './snake-sprite.png';

let rotateSpeed=0;
let rotateTo=0;
let moveSpeed=3;

let nextTile = null;
let newDirection = null;

//DRAW METHODS
const drawSnake = () => {

    //Update Movement
    handleMovement(snake, snake.facingDirection);

    //Update Rotation 
    updateObjRotationValues();

    drawSnakeBody();

    //Draw and Update Rotation
    rotate(rotateSpeed, rotateTo);
}

const rotate = (angleSpeed, destAngle) => {
    if(angleSpeed > 0) {
        // console.log("right");
        if(snake.angle >= destAngle) {
            snake.angle = destAngle;
        } else {
            snake.angle += angleSpeed;
        }
    } else {
        // console.log("left");
        if(snake.angle <= destAngle) {
            snake.angle = destAngle;
        } else {
            snake.angle += angleSpeed;
        }
    }
    //Rotate Head
    canvasContext.save();
    canvasContext.translate(snake.width/2 + snake.body[0].x, snake.height/2 + snake.body[0].y);
    canvasContext.rotate(Math.PI/180 * snake.angle);

    //Head
    // canvasContext.fillRect(-snake.width/2, -snake.height/2, snake.width, snake.height);
    canvasContext.drawImage(image,-snake.width/2, -snake.height/2, snake.width, snake.height);
    canvasContext.restore();
}

const drawSnakeBody = () => {
    // debugger;
    if(snake.body.length <= 0) return;

    for(let i = 0; i < snake.body.length; i++) {
        // Update movements
        handleMovement(snake.body[i], snake.facingDirection);

        //Update our rotations
        // updateObjRotationValues(snake.body[i]);

        canvasContext.fillStyle = "purple";
        canvasContext.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height);
    }
}

//SNAKE DATA HANDLER METHODS
const updateObjRotationValues = () => {
    //Have reached
    if(newDirection && hasReachedNextTile() && !isSnakeRotating()) {
        
        //Update rotation values based on facing direction.
        switch(newDirection) {
            case DIRECTIONS.UP:
                rotateSpeed = snake.facingDirection === DIRECTIONS.RIGHT ? -20:20;
                rotateTo += snake.facingDirection === DIRECTIONS.RIGHT ? -90:90;

                snake.facingDirection = DIRECTIONS.UP;
                break;
            case DIRECTIONS.DOWN:
                rotateSpeed = snake.facingDirection === DIRECTIONS.RIGHT ? 20: -20;
                rotateTo += snake.facingDirection === DIRECTIONS.RIGHT ? 90: -90;

                snake.facingDirection = DIRECTIONS.DOWN;
                break;
            case DIRECTIONS.LEFT:
                rotateSpeed = snake.facingDirection === DIRECTIONS.UP ? -20:20;
                rotateTo += snake.facingDirection === DIRECTIONS.UP ? -90: 90;

                snake.facingDirection = DIRECTIONS.LEFT;
                break;
            case DIRECTIONS.RIGHT:
                rotateSpeed = snake.facingDirection === DIRECTIONS.UP ? 20:-20;
                rotateTo += snake.facingDirection === DIRECTIONS.UP ? 90: -90;

                snake.facingDirection = DIRECTIONS.RIGHT;
                break;
        }

        //Reset latest direction.
        newDirection = null;
    }
}

const handleMovement = (coord, facingDirection) => {
    // debugger;
    //Update Movement
    switch(facingDirection) {
        case DIRECTIONS.RIGHT:
            coord.x += moveSpeed;
            break;
        case DIRECTIONS.LEFT:
            coord.x -= moveSpeed;
            break;
        case DIRECTIONS.DOWN:
            coord.y += moveSpeed;
            break;
        case DIRECTIONS.UP:
            coord.y -= moveSpeed;
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
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.body[0].y) - 1;
            nextTile = gameBoard.coordinates.yAxis[idx];

            gameBoard.rotationTiles.push({ posX: snake.body[0].x, posY: nextTile, width: tile.width, height: tile.height});
            break;
        case DIRECTIONS.DOWN:
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.body[0].y); 
            nextTile = gameBoard.coordinates.yAxis[idx];

            gameBoard.rotationTiles.push({ posX: snake.body[0].x, posY: nextTile, width: tile.width, height: tile.height});
            break;
        case DIRECTIONS.LEFT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.body[0].x) - 1;
            nextTile = gameBoard.coordinates.xAxis[idx];

            gameBoard.rotationTiles.push({ posX: nextTile, posY: snake.body[0].y, width: tile.width, height: tile.height});
            break;
        case DIRECTIONS.RIGHT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.body[0].x); 
            nextTile = gameBoard.coordinates.xAxis[idx];

            gameBoard.rotationTiles.push({ posX: nextTile, posY: snake.body[0].y, width: tile.width, height: tile.height});
            break;
        default:
            console.log(`${snake.facingDirection} is not correct`);
    }
}

const updateSnakeBodyValues = () => {
    switch(snake.facingDirection) {
        case DIRECTIONS.RIGHT:
            snake.body.push(
            { 
                x: snake.body[0].x - (snake.width * snake.body.length),
                y: snake.body[0] 
            });
            break;
    }
}

//SNAKE HELPER METHODS
const hasReachedNextTile = () => {
    //There has to be a next tile and we have either gone past it on x or y axis. 
    if(!nextTile) return false;

    if(snake.facingDirection === DIRECTIONS.LEFT) {
        return snake.body[0].x <= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.RIGHT) {
        return snake.body[0].x >= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.UP) {
        return snake.body[0].y <= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.DOWN) {
        return snake.body[0].y >= nextTile;
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