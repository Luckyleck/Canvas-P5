const canvas = document.getElementById('canvas');
canvas.style.backgroundColor = '#D59B9B';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const SQUARE_SIZE = 50;
const DIRECTIONS = ['up', 'down', 'left', 'right'];

const attempts = 0;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const directionMap = {
    'left': [-SQUARE_SIZE, 0],
    'right': [SQUARE_SIZE, 0],
    'up': [0, -SQUARE_SIZE],
    'down': [0, SQUARE_SIZE],
};

function getRandomDirection(excludeDirection) {
    const availableDirections = DIRECTIONS.filter(direction => direction !== excludeDirection);
    return availableDirections[Math.floor(Math.random() * availableDirections.length)];
}

function isValidCoordinate(nextX, nextY, visitedCoordinates) {
    const roundedX = Math.round(nextX);
    const roundedY = Math.round(nextY);
    const key = `${roundedX}-${roundedY}`;
    return !visitedCoordinates.has(key);
}

function drawSquare(x, y) {
    c.fillStyle = getRandomColor();
    c.strokeStyle = 'black';
    c.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
    c.strokeRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
}

function drawPath(length) {
    const visitedCoordinates = new Set([`${Math.round(canvas.width / 2)}-${Math.round(canvas.height / 2)}`]);
    const squaresToDraw = [];

    for (let i = 0; i < length; i++) {
        const lastDirection = squaresToDraw.length > 0 ? squaresToDraw[squaresToDraw.length - 1][2] : null;
        const nextDirection = getRandomDirection(lastDirection);

        let [nextX, nextY] = squaresToDraw.length > 0 ? squaresToDraw[squaresToDraw.length - 1].slice(0, 2) : [canvas.width / 2, canvas.height / 2];
        const directionChange = directionMap[nextDirection];
        nextX += directionChange[0];
        nextY += directionChange[1];

        if (isValidCoordinate(nextX, nextY, visitedCoordinates)) {
            squaresToDraw.push([nextX, nextY, nextDirection]);
            visitedCoordinates.add(`${Math.round(nextX)}-${Math.round(nextY)}`);
        } else {
            attempts += 1;
            i--; // try again with the same index
            console.log(i, 'trying to find valid square');
        }
    }

    squaresToDraw.forEach(coords => drawSquare(coords[0], coords[1]));
    console.log(visitedCoordinates);
}

drawPath(40);
