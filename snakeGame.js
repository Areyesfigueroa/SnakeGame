
canvas = null;
canvasContext = null;

const snake = {
    posX: 100,
    posY: 100,
    width: 50,
    height: 50,


    move: function(speed=5) {
        this.posX += speed 
    }
};

const arrowKeys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
}

//TESTING
let keyPressed = false;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 60;
    setInterval(() => {    
        if(keyPressed) snake.move();
        console.log(keyPressed);
        draw();
    }, 1000/framesPerSecond);
    
    //EVENT LISTENERS
    document.addEventListener('keydown', (event) => {
        if(event.keyCode === arrowKeys.right) {
            keyPressed=true;
        } 
    });
    document.addEventListener('keyup', (event) => {
        if(event.keyCode === arrowKeys.right) {
           keyPressed=false;
        } 
    });
}

const draw = () => {

    console.log("Draw");

    //Background
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(0,0,canvas.width, canvas.height);
    
    //Ball
    canvasContext.fillStyle = "purple";
    canvasContext.fillRect(snake.posX, snake.posY, snake.width, snake.height);
}

