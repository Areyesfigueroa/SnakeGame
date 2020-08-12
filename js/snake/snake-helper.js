
const hasReachedNextTile = () => {
    //There has to be a next tile and we have either gone past it on x or y axis. 
    if(nextTile === null || nextTile < 0) return false;

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

const isSnakeRotating = () => {
    return snake.angle !== rotateTo;
}

const handleMovement = (coord, facingDirection) => {
    // Update Head
    if(facingDirection === DIRECTIONS.RIGHT) {
        coord.x += moveSpeed;
    }
    if(facingDirection === DIRECTIONS.LEFT){
        coord.x -= moveSpeed;
    }
    if(facingDirection === DIRECTIONS.DOWN){
        coord.y += moveSpeed;
    }
    if(facingDirection === DIRECTIONS.UP){
        coord.y -= moveSpeed;
    }
}

const updateSnakeNextTileValues = () => {

    //Update target
    let idx = 0;
    switch(snake.facingDirection) {

        case DIRECTIONS.UP:
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.body[0].y) - 1;
            nextTile = gameBoard.coordinates.yAxis[idx];

            break;
        case DIRECTIONS.DOWN:
            idx = gameBoard.coordinates.yAxis.findIndex((yPlot) => yPlot > snake.body[0].y); 
            nextTile = gameBoard.coordinates.yAxis[idx];

            break;
        case DIRECTIONS.LEFT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.body[0].x) - 1;
            nextTile = gameBoard.coordinates.xAxis[idx];

            break;
        case DIRECTIONS.RIGHT:
            idx = gameBoard.coordinates.xAxis.findIndex((xPlot) => xPlot > snake.body[0].x); 
            nextTile = gameBoard.coordinates.xAxis[idx];

            break;
        default:
            console.log(`${snake.facingDirection} is not correct`);
    }
}

const growSnakeBody = () => {
    //Grow in the direction of the tail.
    const tailParent = snake.body[snake.body.length - 2];
    const tail = snake.body[snake.body.length - 1];

        //If we are moving vertically
        if(tailParent.x === tail.x && tailParent.y !== tail.y) {
            //are we moving up or down. Check parent to know where. 
            if(tailParent.y > tail.y) {
                //Going Down
                // console.log("Grow Up");
                snake.body.push({x: tailParent.x, y: tailParent.y - snake.height});
            };
            if(tailParent.y < tail.y) {
                //Going Up
                // console.log("Grow Down");
                snake.body.push({x: tailParent.x, y: tailParent.y + snake.height});
            };
        }
    
        //If we are moving horizontally
        if(tailParent.y === tail.y && tailParent.x !== tail.x) {
            //are we moving left or right. Check parent to know where. 
            if(tailParent.x > tail.x) {
                //Going Right
                // console.log("Grow Left");
                snake.body.push({x: tailParent.x - snake.width, y: tailParent.y});
            };
            if(tailParent.x < tail.x)  {
                //Going Left
                // console.log("Grow Right");
                snake.body.push({x: tailParent.x + snake.width, y: tailParent.y});
            }
        }
}

const hasSnakeBodyCollided = (obj) => {

    //Ignore the head and initial body.
    for(let i = 2; i < snake.body.length; i++) {

        let bodyLeft = snake.body[i].x;
        let bodyRight = snake.body[i].x + snake.width;
        let bodyTop = snake.body[i].y;
        let bodyBottom = snake.body[i].y + snake.height;

        let headLeft = obj.x;
        let headRight = obj.x + tile.size;
        let headTop = obj.y;
        let headBottom = obj.y + tile.size;

        if(headRight > bodyLeft && headLeft < bodyRight && bodyTop === headTop) {
            console.log("Horizontal Hit - " + i);
            return true;
        }

        if(headBottom > bodyTop && headTop < bodyBottom && bodyLeft === headLeft) {
            console.log("Vertical hit - " + i);
            return true;
        }
    }
}

const resetSnake = () => {
    snake.body = [
            {x: 150, y: 100}, //Head
            {x: 100, y: 100},
            {x: 50, y: 100},
            {x: 50, y: 100} //Tail
        ];
    snake.angle = 0;
    snake.facingDirection = DIRECTIONS.RIGHT;
    
    rotateSpeed=0;
    rotateTo=0;
    moveSpeed=5;
    nextTile = null;
    newDirection = null;
}