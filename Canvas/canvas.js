const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.imageSmoothingEnabled = true;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const circles = [];

class Circle {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z
        this.rad = 50;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.velocityX = (Math.random() - 0.5) * 5; // Initialize velocityX
        this.velocityY = (Math.random() - 0.5) * 5; // Initialize velocityY
        this.color = null;
        this.i = null;
        console.log(this)
    }

    draw() {
        c.globalCompositeOperation = 'source-over';
        c.beginPath();
        c.arc(this.x, this.y, this.rad, this.startAngle, this.endAngle);
        c.fillStyle = this.color
        c.fill();
        c.globalCompositeOperation = 'destination-over'; // Set to "destination-over" to leave a trail
        // c.fillStyle = 'black';
        // var font = "bold " + this.rad + "px arial";
        // c.font = font;
        // c.fillText(this.i, this.x, this.y)
    }

    updateVelocity() {
        if (this.x + this.rad > canvas.width || this.x - this.rad < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.rad > canvas.height || this.y - this.rad < 0) {
            this.velocityY = -this.velocityY;
        }
    }

    updatePosition() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

}



function createCircles() {
    for (let i = 0; i < 50; i++) {
        const circle = new Circle(centerX, centerY);
        circle.i = i
        circle.color = `rgb(
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)}
        )`
        circles.push(circle);
    }
}

function render() {
    circles.forEach(circle => {
        circle.updateVelocity();
        circle.updatePosition();
        circle.draw();
    });
}

function animate() {
    // c.clearRect(0, 0, canvas.width, canvas.height);
    render();
    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

window.addEventListener('resize', resizeCanvas);

createCircles();
animate();
