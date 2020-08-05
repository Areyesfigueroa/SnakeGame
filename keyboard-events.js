//EVENT LISTENERS
document.addEventListener('keydown', (event) => {
    
    //Can the snake move in this direction.
    if(isInputValid(snake.facingDirection, event.keyCode)) {
        //Save latest input. 
        latestInput = event.keyCode;

        updateSnakeNextTileValues();
        
    }

    //TESTING - Spacebar
    if(event.keyCode === 32) {
        console.log("Move");            
        moveSpeed = moveSpeed ? 0:3;
    }

    //TESTING - Shift
    if(event.keyCode === 16) {
        //Update Snake Body
        snake.unitLength += 1;
        updateSnakeBodyValues();
    }
});