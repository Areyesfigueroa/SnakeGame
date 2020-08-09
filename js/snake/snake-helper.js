
const hasReachedNextTile = () => {
    //There has to be a next tile and we have either gone past it on x or y axis. 
    if(nextTile === null || nextTile < 0) return false;

    if(snake.facingDirection === DIRECTIONS.LEFT) {
        console.log(snake.body[0].x, nextTile);
        return snake.body[0].x <= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.RIGHT) {
        console.log(snake.body[0].x, nextTile);
        return snake.body[0].x >= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.UP) {
        console.log(snake.body[0].y, nextTile);

        return snake.body[0].y <= nextTile;
    }

    if(snake.facingDirection === DIRECTIONS.DOWN) {
        console.log(snake.body[0].y, nextTile);

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