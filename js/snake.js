
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
        {x: 50, y: 100},
        {x: 0, y: 100}
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
let moveSpeed=2;

let nextTile = null;
let newDirection = null;

//DRAW METHODS
const drawSnake = () => {

    //Update Rotation 
    updateObjRotationValues();

    moveSnakeBody();
    moveSnakeTail();
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

const moveSnakeTail = () => {

}

const moveSnakeBody = () => {

    //create copy of snake
    var snakeCopy = [];
    //loop through snake
    // if(snake.body[0].x >= snake.body[1].x + tile.width || snake.body[0].y >= snake.body[0].y + tile.height) {
    // {
        for (var i = 0; i < snake.body.length; i++) {
            //for each iteration, add snake body to snake copy
            snakeCopy.push({
                x: snake.body[i].x,
                y: snake.body[i].y
            });
        }
    // }
    for(let i = 0; i < snake.body.length; i++) {

        if(i === 0) {
            // Update Head
            if(snake.facingDirection === DIRECTIONS.RIGHT) {
                snake.body[i].x += moveSpeed;
            }
            if(snake.facingDirection === DIRECTIONS.LEFT){
                snake.body[i].x -= moveSpeed;
            }
            if(snake.facingDirection === DIRECTIONS.DOWN){
                snake.body[i].y += moveSpeed;
            }
            if(snake.facingDirection === DIRECTIONS.UP){
                snake.body[i].y -= moveSpeed;
            }
        } else {
            //Update Body
            const parent = snake.body[i - 1];
            const child = snake.body[i];

            if(parent.x > child.x + tile.width || parent.y > child.y + tile.height) {
                // console.log("Going Right");
                child.x = snakeCopy[i - 1].x;
                child.y = snakeCopy[i - 1].y;
            }

            if(parent.x < child.x - tile.width || parent.y < child.y - tile.height) {
                // console.log("Going Right");
                child.x = snakeCopy[i - 1].x;
                child.y = snakeCopy[i - 1].y;
            }



            // if(parent.x + tile.width > child.x + tile.width) {
            // console.log("Going Right");
            // child.x += moveSpeed;
            // }
            // if(parent.y > child.y + tile.width) {
            // console.log("Going Down");
            // child.y += moveSpeed;
            // }

        }
    }
}



const drawSnakeBody = () => {
    // debugger;
    if(snake.body.length <= 0) return;

    for(let i = 0; i < snake.body.length; i++) {

        canvasContext.fillStyle = "purple";
        canvasContext.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height);
    }
}

// function moveSnake() {
//     //create copy of snake
//     var snakeCopy = [];
//     //loop through snake
//     for (var i = 0; i < snake.length; i++) {
//         //for each iteration, add snake body to snake copy
//         snakeCopy.push({
//             x: snake[i].x,
//             y: snake[i].y
//         });
//     }
//     for (var i = 0; i < snake.length; i++) {
//         if (i === 0) {
//             if (snakeDirection === DIRECTION.EAST) {
//                 snake[i].x += dx;
//             }
//             if (snakeDirection === DIRECTION.WEST) {
//                 snake[i].x -= dx;
//             }
//             if (snakeDirection === DIRECTION.NORTH) {
//                 snake[i].y -= dy;
//             }
//             if (snakeDirection === DIRECTION.SOUTH) {
//                 snake[i].y += dy;
//             }
//         } else {
//             snake[i].x = snakeCopy[i - 1].x;
//             snake[i].y = snakeCopy[i - 1].y;
//         }
//     }
// }

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