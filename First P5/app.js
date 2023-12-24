const frmRate = 120;

let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Initialize particles
    createParticles();
    smooth();
    frameRate(frmRate);
}

function draw() {
    // Clear the canvas
    background(0);

    // Update and draw each particle
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
}

class Particle {
    constructor(x, y, radius, particleColor, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = particleColor; // Rename the parameter to avoid conflict
        this.speed = speed;

        this.draw = function () {
            fill(this.color);
            noStroke();
            ellipse(this.x, this.y, this.radius * 2);
        };

        this.update = function () {
            this.x += cos(this.speed) * 2;
            this.y += sin(this.speed) * 2;
            this.speed += 0.02;
        };
    }
}

function createParticles() {
    const numParticles = 75;
    for (let i = 0; i < numParticles; i++) {
        const x = width / 2;
        const y = height / 2;
        const radius = random(10, 30);
        const particleColor = color(random(255), random(255), random(255), random(100,1000));
        const speed = random(TWO_PI);

        particles.push(new Particle(x, y, radius, particleColor, speed));
    }
}

// Resize canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    particles.length = 0; // Clear existing particles
    createParticles(); // Recreate particles after resizing
}

function keyPressed() {
    if (key === 's') {
        saveGif('loop.gif', 5.2); // 1 sec
    }
}
