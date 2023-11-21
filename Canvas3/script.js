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
c.lineWidth = 2;

let lineStartX = centerX;
let lineStartY = centerY;

const increment = 10;

let length = 10;

async function draw() {
    for (let i = 1; i <= 100; i++) {
        const direction = ['up', 'upright', 'downright', 'down', 'downleft', 'upleft'][i % 6];

        c.beginPath();
        c.moveTo(lineStartX, lineStartY);

        switch (direction) {
            case 'up':
                c.lineTo(lineStartX, lineStartY -= length);
                break;
            case 'upright':
                c.lineTo(lineStartX += (length * Math.sqrt(3) / 2), lineStartY -= length / 2);
                break;
            case 'downright':
                c.lineTo(lineStartX += (length * Math.sqrt(3) / 2), lineStartY += length / 2);
                break;
            case 'down':
                c.lineTo(lineStartX, lineStartY += length);
                break;
            case 'downleft':
                c.lineTo(lineStartX -= (length * Math.sqrt(3) / 2), lineStartY += length / 2);
                break;
            case 'upleft':
                c.lineTo(lineStartX -= (length * Math.sqrt(3) / 2), lineStartY -= length / 2);
                break;
        }

        c.stroke();

        if (i % 2 === 0) {
            length += increment;
        }

        await sleep(100);
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

draw();