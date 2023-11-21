const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

const centerX = WINDOW_WIDTH / 2;
const centerY = WINDOW_HEIGHT / 2;

const squareWidth = 10;
const squareHeight = 10;

c.fillRect(centerX - (squareWidth / 2), centerY - (squareHeight / 2), squareWidth, squareHeight);
c.lineWidth = 2

let lineStartX = centerX;
let lineStartY = centerY;

const increment = 15;

let length = 15;


async function draw() {
    for (let i = 1; i <= 100; i++) {
        const direction = ['up', 'right', 'down', 'left'][i % 4];
        c.beginPath();
        c.moveTo(lineStartX, lineStartY) // These variable are updated in the lineTo function

        switch (direction) {
            case 'right':
                c.lineTo(lineStartX += length, lineStartY) // Shorthand reassignment
                break;
            case 'down':
                c.lineTo(lineStartX, lineStartY += length);
                break;
            case 'left':
                c.lineTo(lineStartX -= length, lineStartY);
                break;
            case 'up':
                c.lineTo(lineStartX, lineStartY -= length);
                break;
        }

        c.stroke();

        

        if (i % 2 === 0) {
            length += increment;
        }

        await sleep(1)
    }
}



const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

draw();


