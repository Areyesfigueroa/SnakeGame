canvas = null;
canvasContext = null;

const arrowKeys = {
    left: {code: 37, active: false},
    up: {code: 38, active: false},
    right: {code: 39, active: false},
    down: {code: 40, active: false}
}

const snake = {
    posX: 100,
    posY: 100,
    width: 20,
    height: 20,
    unitLength: 1,
    angle: 0,
};

const moveSnakeX = (speed=5) => {
    snake.posX += speed 
}

const growBody = (unitSize) => {
    snake.unitLength += unitSize;
}

const draw = () => {

    console.log("Draw");
    snake.angle += 5;
     
    //Background
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(0,0,canvas.width, canvas.height);

    //Rotate Snake Head
    canvasContext.save();
    canvasContext.translate((snake.posX + snake.width)/2, (snake.posY + snake.height)/2);
    canvasContext.rotate(Math.PI/180 * snake.angle);

    //Snake Head
    canvasContext.fillStyle = "purple";
    canvasContext.fillRect(-snake.width, -snake.height, 50, 50);
    canvasContext.restore();

    canvasContext.fillStyle = 'blue';
    canvasContext.fillRect((snake.posX + snake.width)/2, (snake.posY + snake.height)/2, 60, 60);
    // //Snake Body
    // for(let i = 1; i < snake.unitLength; i++) {
    //     canvasContext.fillStyle = "purple";
    //     canvasContext.fillRect(snake.posX - ((snake.width+5)*i), snake.posY, snake.width, snake.height);
    // }
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
        if(event.keyCode === arrowKeys.left.code) {
            arrowKeys.left.active = true;
            snake.angle += 1;
            console.log(snake.angle);
            draw();
        } 
        if(event.keyCode === arrowKeys.right.code) {
            arrowKeys.right.active = true;
        } 
        if(event.keyCode === arrowKeys.up.code) {
            arrowKeys.up.active = true;
        } 
        if(event.keyCode === arrowKeys.down.code) {
            arrowKeys.down.active = true;
        } 

        //TESTING
        if(event.keyCode === 16) {
            growBody(1);
        }
    });
    document.addEventListener('keyup', (event) => {
        if(event.keyCode === arrowKeys.left.code) {
            arrowKeys.left.active = false;
        } 
        if(event.keyCode === arrowKeys.right.code) {
            arrowKeys.right.active = false;
        } 
        if(event.keyCode === arrowKeys.up.code) {
            arrowKeys.up.active = false;
        } 
        if(event.keyCode === arrowKeys.down.code) {
            arrowKeys.down.active = false;
        } 
    });
}
    // //Controller
    // if(arrowKeys.left.active) {
    //     snake.moveX(-5);
    // }
    // if(arrowKeys.right.active) snake.moveX(5);
    // if(arrowKeys.up.active) snake.moveY(-5);
    // if(arrowKeys.down.active) snake.moveY(5);


    // let posX=200, posY=200, width=200, height=200;

    // canvasContext.save();
    // canvasContext.translate(posX, posY);
    // canvasContext.rotate(Math.PI/90);
    // canvasContext.fillStyle = "blue";
    // canvasContext.fillRect((-1*posX)/2,(-1*posY)/2,width, height);
    // canvasContext.restore();