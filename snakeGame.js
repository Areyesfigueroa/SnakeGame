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

const draw = () => {

    //Update Rotation
    rotate(rotateSpeed, rotateTo, snake);

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

    //Snake Body
    for(let i = 1; i < snake.unitLength; i++) {
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(snake.posX - ((snake.width)*i), snake.posY, snake.width, snake.height);
    }
}


window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const gameBoard ={
        columns: canvas.width/tile.width,
        rows: canvas.height/tile.height
    }
    
    //Draw Board
    let startingStyle = tile.style;
    for(let row = 0; row < gameBoard.rows; row++) {
        for(let col=0; col < gameBoard.columns; col++) {
            // debugger;
            canvasContext.fillStyle = tile.style;
            canvasContext.fillRect(tile.posX + (tile.width * col),tile.posY + (tile.height * row),tile.width,tile.height);
    
            tile.style = tile.style === "#709E7C" ? "#B7E3BD":"#709E7C";
        }
        tile.posX = 0;
        tile.style = startingStyle==="#B7E3BD" ? "#709E7C": "#B7E3BD";
        startingStyle = tile.style;
    }

    const framesPerSecond = 60;
    setInterval(() => {    
        draw();
    }, 1000/framesPerSecond);
    
    //EVENT LISTENERS
    document.addEventListener('keydown', (event) => {


        if(snake.facingDirection === DIRECTIONS.RIGHT) {
            if(event.keyCode === arrowKeys.up.code && !isSnakeRotating()) {
                rotateSpeed =-20;
                rotateTo += -90;

                snake.facingDirection = DIRECTIONS.UP;
            } 
            if(event.keyCode === arrowKeys.down.code && !isSnakeRotating()) {
                rotateSpeed =20;
                rotateTo += 90;

                snake.facingDirection = DIRECTIONS.DOWN;
            } 
        }

        if(snake.facingDirection === DIRECTIONS.LEFT) {
            if(event.keyCode === arrowKeys.up.code && !isSnakeRotating()) {
                rotateSpeed =20;
                rotateTo += 90;

                snake.facingDirection = DIRECTIONS.UP;
            } 
            if(event.keyCode === arrowKeys.down.code && !isSnakeRotating()) {
                rotateSpeed =-20;
                rotateTo += -90;

                snake.facingDirection = DIRECTIONS.DOWN;
            } 
        }

        if(snake.facingDirection === DIRECTIONS.UP) {
            if(event.keyCode === arrowKeys.left.code && !isSnakeRotating()) {
                rotateSpeed =-20;
                rotateTo += -90;

                snake.facingDirection = DIRECTIONS.LEFT;
            } 
            if(event.keyCode === arrowKeys.right.code && !isSnakeRotating()) {
                rotateSpeed =20;
                rotateTo += 90;

                snake.facingDirection = DIRECTIONS.RIGHT;
            }     
        }

        if(snake.facingDirection === DIRECTIONS.DOWN) {
            if(event.keyCode === arrowKeys.left.code && !isSnakeRotating()) {
                rotateSpeed =20;
                rotateTo += 90;

                snake.facingDirection = DIRECTIONS.LEFT;
            } 
            if(event.keyCode === arrowKeys.right.code && !isSnakeRotating()) {
                rotateSpeed =-20;
                rotateTo += -90;

                snake.facingDirection = DIRECTIONS.RIGHT;
            }     
        }

        //TESTING
        if(event.keyCode === 32) {
            console.log("Move");
            moveSpeed = 1;
        }

        //TESTING
        if(event.keyCode === 16) {
            snake.unitLength += 1;
        }
    });

    //TESTING
    document.addEventListener('keyup', (event) => {
        if(event.keyCode === 32) {
            // moveSpeed = 0;
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

        
