//VARIABLES
const DIRECTIONS = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
}

const snake = {
    body: [
        {x: 150, y: 100}, //Head
        {x: 100, y: 100},
        {x: 50, y: 100},
        {x: 50, y: 100} //Tail
    ],
    width: tile.size,
    height: tile.size,
    angle: 0,
    facingDirection: DIRECTIONS.RIGHT
};

let image = new Image();
image.src = './assets/snake-sprite.png';

let rotateSpeed=0;
let rotateTo=0;
let moveSpeed=2;

let nextTile = null;
let newDirection = null;

//DRAW METHODS
const drawSnake = () => {
    hasSnakeCollidedWithItself();
    //Update Rotation 
    rotateSnakeHead();

    moveSnakeBody();
    moveSnakeTail();
    drawSnakeBody();

    //Handle Collisions
    if(hasAppleCollided(snake.body[0])) {
        growSnakeBody();
    }

    if(hasSnakeCollidedWithItself()) {
        gameOverFlag = true;
    }

    //Draw and Update Rotation
    drawSnakeHead(rotateSpeed, rotateTo);
}

const drawSnakeHead = (angleSpeed, destAngle) => {
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
    if(snake.body.length <= 0) return;

    for(let i = 0; i < snake.body.length; i++) {

        canvasContext.fillStyle = "purple";
        canvasContext.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height);
    }
}

//MOVEMENT METHODS
const moveSnakeTail = () => {
    const tailParent = snake.body[snake.body.length - 2];
    const tail = snake.body[snake.body.length - 1];

    //If we are moving vertically
    if(tailParent.x === tail.x && tailParent.y !== tail.y) {
        //are we moving up or down. Check parent to know where. 
        if(tailParent.y > tail.y) tail.y += moveSpeed;
        if(tailParent.y < tail.y) tail.y -= moveSpeed;
    }

    //If we are moving horizontally
    if(tailParent.y === tail.y && tailParent.x !== tail.x) {
        //are we moving left or right. Check parent to know where. 
        if(tailParent.x > tail.x) tail.x += moveSpeed;
        if(tailParent.x < tail.x) tail.x -= moveSpeed;
    }
}

const moveSnakeBody = () => {
    if(snake.body.length <= 0) return;

    const head = snake.body[0];
    const headChild = snake.body[1];

    if(head.x - headChild.x == 50 
       || head.x - headChild.x == -50
       || head.y - headChild.y == 50
       || head.y - headChild.y == -50) {
           for(let i = snake.body.length - 2; i > 1; i--) {
               const parent = snake.body[i - 1];

               snake.body[i] = Object.assign({}, parent);
           }

           snake.body[1] = Object.assign({}, head);
       }

     handleMovement(snake.body[0], snake.facingDirection);  
}

const rotateSnakeHead = () => {

    // console.log(hasReachedNextTile());

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