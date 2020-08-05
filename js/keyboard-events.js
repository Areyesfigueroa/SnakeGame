//EVENT LISTENERS
document.addEventListener('keydown', (event) => {
    
    //Can the snake move in this direction.
    if(isInputValid(snake.facingDirection, event.keyCode)) {
        //Save latest direction.
        switch(event.keyCode) {
            case arrowKeys.up.code:
                newDirection = DIRECTIONS.UP;
                break;
            case arrowKeys.down.code:
                newDirection = DIRECTIONS.DOWN;
                break;
            case arrowKeys.left.code:
                newDirection = DIRECTIONS.LEFT;
                break;
            case arrowKeys.right.code:
                newDirection = DIRECTIONS.RIGHT;
                break;
            default:
                console.log("Keycode is not part of the arrow keys");
        }

        updateSnakeNextTileValues();
        
    }

    //TESTING - Spacebar
    if(event.keyCode === 32) {
        // debugger;
        console.log("Move");            
        moveSpeed = moveSpeed ? 0:3;
    }

    //TESTING - Shift
    if(event.keyCode === 16) {
        //Update Snake Body
        updateSnakeBodyValues();
    }
});