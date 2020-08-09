const apple = {
    x: 250,//550,
    y: 200//300
};

const drawApple = () => {
    drawTestCube(apple.x, apple.y, tile.size, tile.size);
}

const moveApple = () => {
    apple.x = generateMultiple(tile.size, gameBoard.width);
    apple.y = generateMultiple(tile.size, gameBoard.height);
    apple.collision = false;
    console.log(apple.x, apple.y);
}

const hasAppleCollided = (obj) => {
    //From the right
    if((apple.x + tile.size) - moveSpeed === obj.x && apple.y === obj.y) {
        console.log("Right Collision");
        moveApple();
        return true;
    }

    //From the left
    if(apple.x + moveSpeed === obj.x + tile.size && apple.y === obj.y) {
        console.log("Left Collision");
        moveApple();
        return true;
    }

    //From the top
    if(apple.y + moveSpeed === obj.y + tile.size && apple.x === obj.x) {
        console.log("Top Collision");
        moveApple();
        return true;
    }

    //From the bottom
    if((apple.y + tile.size) - moveSpeed === obj.y && apple.x === obj.x) {
        console.log("Bottom Collision");
        moveApple();
        return true;
    }
}