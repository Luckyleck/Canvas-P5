const canvas = document.createElement('canvas');
document.body.appendChild(canvas)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

class Player {
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    constructor(x, y) {
        this.x = 20 + 20;
        this.y = canvas.height - 40;
        this.radiusX = 20;
        this.radiusY = 40;
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.jumpHeight = 100;
        this.jumpCount = 0;
    }

    draw() {
        c.fillStyle = 'orange'
        c.beginPath();
        c.ellipse(
            this.x,
            this.y,
            this.radiusX,
            this.radiusY,
            this.rotation,
            this.startAngle,
            this.endAngle
        )
        c.fill();
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpCount = 0;
        }
    }

    update() {
        if (!this.isJumping) {
            this.y -= 5;
            this.jumpCount += 5;

            if (this.jumpCount >= this.jumpHeight) {
                this.isJumping = false;
            }
        } else if (this.y < canvas.height - this.height) {
            this.y += 5;
        }
    }

}

const player = new Player

function gameLoop() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    requestAnimationFrame(gameLoop); 
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        player.jump();
    }
});

gameLoop();







