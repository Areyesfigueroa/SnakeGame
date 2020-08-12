const drawTestCube = (x, y, w, h) => {
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(x, y, w, h);
}

const generateMultiple = (multiple, range) => {
    return (multiple * (Math.floor(Math.random() * (range/multiple) + 1))) - multiple;
}