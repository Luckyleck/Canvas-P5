const canvas = document.getElementById('canvas');
canvas.style.backgroundColor = '#D59B9B';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

const c = canvas.getContext('2d');

const squareSize = [50, 50];
const circleArgs = [5, 0, 2 * Math.PI];

let squareCords = [];
let directionsLog = [];
const directions = ['up', 'down', 'left', 'right'];


function getInitialDirection() {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    directionsLog.push(direction);
    console.log(direction);
    return direction;
}

function draw(length) {

    function drawSquare() {
        if (!squareCords.length) {
            getInitialDirection();
            const [x, y] = [centerX - squareSize[0] / 2, centerY - squareSize[1] / 2];
            c.fillRect(x, y, ...squareSize);
            squareCords.push([x, y]);
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
            let nextDirection = directions[Math.floor(Math.random() * directions.length)];
            while (nextDirection === directionsLog[directionsLog.length - 1]) {
                nextDirection = directions[Math.floor(Math.random() * directions.length)];

                let nextX;
                let nextY;

                switch (nextDirection) {
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

                squareCords.any(cords => {
                    
                })
                
            }
            directionsLog.push(nextDirection);
            console.log(nextDirection)

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
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    
    // squareCords = [];
    // directionsLog = [];
    draw(duration);
}

window.addEventListener('resize', resizeCanvas);

let duration = 10;
draw(duration);
