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

const moveSnakeX = (speed=5) => {
    snake.posX += speed 
}

const isSnakeRotating = () => {
    return snake.angle !== rotateTo;
}

const rotateSnakeHead = (angleSpeed, destAngle) => {
    // console.log(snake.angle,destAngle);

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


    //Rotate Snake Head
    canvasContext.save();
    canvasContext.translate(snake.width/2 + snake.posX, snake.height/2 + snake.posY);
    canvasContext.rotate(Math.PI/180 * snake.angle);

    //Snake Head
    canvasContext.drawImage(image, -snake.width/2, -snake.height/2, snake.width, snake.height);
    canvasContext.restore();
}

const growBody = (unitSize) => {
    snake.unitLength += unitSize;
}

const draw = () => {

    //Background
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(0,0,canvas.width, canvas.height);

    //Update Rotation
    rotateSnakeHead(rotateSpeed, rotateTo);

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

    console.log(snake.facingDirection);
    // canvasContext.drawImage(image, snake.posX, snake.posY, snake.width, snake.height);

    // console.log(rotateSpeed);
    // if(isSnakeRotating()) return;

    // //Snake Head
    // canvasContext.fillStyle = "purple";
    // canvasContext.fillRect(snake.posX, snake.posY, snake.width, snake.height);

    // //Snake eyes
    // canvasContext.fillStyle = "blue";
    // canvasContext.fillRect(snakeEyes.posX, snakeEyes.posY, snakeEyes.width, snakeEyes.height);

    // canvasContext.drawImage(image, snake.posX, snake.posY, snake.width, snake.height);
}


window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

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
            growBody(1);
        }
    });
        //TESTING
        document.addEventListener('keyup', (event) => {
        if(event.keyCode === 32) {
            moveSpeed = 0;
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

        
    // //Snake Body
    // for(let i = 1; i < snake.unitLength; i++) {
    //     canvasContext.fillStyle = "purple";
    //     canvasContext.fillRect(snake.posX - ((snake.width+5)*i), snake.posY, snake.width, snake.height);
    // }