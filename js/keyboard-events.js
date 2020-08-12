const KEYCODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

/*------------------
---- Controller ----
-------------------*/
const isInputValid = (facingDirection, keyCode) => {
    if(facingDirection === DIRECTIONS.RIGHT) {
        return (keyCode === KEYCODES.UP || keyCode === KEYCODES.DOWN);
    }

    if(facingDirection === DIRECTIONS.LEFT) {
        return (keyCode === KEYCODES.UP || keyCode === KEYCODES.DOWN);
    }

    if(facingDirection === DIRECTIONS.UP) {
        return (keyCode === KEYCODES.LEFT || keyCode === KEYCODES.RIGHT); 
    }

    if(facingDirection === DIRECTIONS.DOWN) {
        return (keyCode === KEYCODES.LEFT || keyCode === KEYCODES.RIGHT);   
    }
}

//EVENT LISTENERS
document.addEventListener('keydown', (event) => {
    
    //Can the snake move in this direction.
    if(isInputValid(snake.facingDirection, event.keyCode)) {
        //Save latest direction.
        switch(event.keyCode) {
            case KEYCODES.UP:
                newDirection = DIRECTIONS.UP;
                break;
            case KEYCODES.DOWN:
                newDirection = DIRECTIONS.DOWN;
                break;
            case KEYCODES.LEFT:
                newDirection = DIRECTIONS.LEFT;
                break;
            case KEYCODES.RIGHT:
                newDirection = DIRECTIONS.RIGHT;
                break;
            default:
                console.log("Keycode is not part of the arrow keys");
        }

        updateSnakeNextTileValues();
        
    }
});