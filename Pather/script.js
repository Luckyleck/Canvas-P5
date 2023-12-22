const canvas = document.getElementById('canvas');
canvas.style.backgroundColor = '#D59B9B';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const squareSize = [50, 50];
const circleArgs = [5, 0, 2 * Math.PI];

let squareCords = [];
let directionsLog = [];

function getInitialDirection() {
    const directions = ['up', 'down', 'left', 'right'];
    return directions[Math.floor(Math.random() * directions.length)];
}

function draw(length) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawSquare() {
        if (!squareCords.length) {
            const initialDirection = getInitialDirection();
            const [x, y] = [centerX - squareSize[0] / 2, centerY - squareSize[1] / 2];
            c.fillRect(x, y, ...squareSize);
            squareCords.push([x, y]);
            directionsLog.push(initialDirection);
        }

        let i = 0;
        while (i < length) {
            const direction = directionsLog[directionsLog.length - 1];

            let lastX = squareCords[squareCords.length - 1][0];
            let lastY = squareCords[squareCords.length - 1][1];

            let nextX;
            let nextY;

            switch (direction) {
                case 'up':
                    nextX = lastX;
                    nextY = lastY - squareSize[1];
                    break;
                case 'down':
                    nextX = lastX;
                    nextY = lastY + squareSize[1];
                    break;
                case 'left':
                    nextX = lastX - squareSize[0];
                    nextY = lastY;
                    break;
                case 'right':
                    nextX = lastX + squareSize[0];
                    nextY = lastY;
                    break;
            }

            c.fillRect(nextX, nextY, ...squareSize);
            squareCords.push([nextX, nextY]);

            const directions = ['up', 'down', 'left', 'right'];
            let randomDirection = directions[Math.floor(Math.random() * directions.length)];
            while (randomDirection === directionsLog[directionsLog.length - 1]) {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
            }
            directionsLog.push(randomDirection);

            i++;
        }
    }

    drawSquare();

    // Center
    c.beginPath();
    c.arc(centerX, centerY, ...circleArgs);
    c.fillStyle = 'blue';
    c.fill();
    c.closePath();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    squareCords = [];
    directionsLog = [];
    draw(duration);
}

window.addEventListener('resize', resizeCanvas);

let duration = 10;
draw(duration);
