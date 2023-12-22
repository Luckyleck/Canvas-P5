const canvas = document.getElementById('canvas');
canvas.style.backgroundColor = '#D59B9B'

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const squareSize = 50
const circleArgs = [5, 0, 2 * Math.PI]

function draw() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    c.fillRect(centerX, centerY, squareSize, squareSize);

    c.beginPath();
    c.arc(centerX, centerY, ...circleArgs);
    c.fillStyle = 'blue';
    c.fill();
    c.closePath();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    draw();
}

window.addEventListener('resize', resizeCanvas);

draw();


