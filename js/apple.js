const apple = {
    x: 550,//550,
    y: 300//300
};

const appleImg = new Image();
appleImg.src = './assets/apple.png';
const drawApple = () => {
    if(hasAppleCollided(snake.body[0])) moveApple();

    canvasContext.drawImage(appleImg, apple.x, apple.y, tile.size, tile.size);
}

const moveApple = () => {
    apple.x = generateMultiple(tile.size, gameBoard.width);
    apple.y = generateMultiple(tile.size, gameBoard.height);
    
    if(hasSnakeBodyCollided(apple)) {
        moveApple();
    }
}

const hasAppleCollided = (obj) => {
    //From the right
    if((apple.x + tile.size) - moveSpeed === obj.x && apple.y === obj.y) {
        return true;
    }

    //From the left
    if(apple.x + moveSpeed === obj.x + tile.size && apple.y === obj.y) {
        return true;
    }

    //From the top
    if(apple.y + moveSpeed === obj.y + tile.size && apple.x === obj.x) {
        return true;
    }

    //From the bottom
    if((apple.y + tile.size) - moveSpeed === obj.y && apple.x === obj.x) {
        return true;
    }
}

const resetApple = () => {
    //Set to initial coord
    [apple.x, apple.y] = [250, 100];
}