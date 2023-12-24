// const frmRate = 60;
const numParticles = 500; // lower number of particles
let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // Use WEBGL mode for 3D rendering
    createParticles();
    // frameRate(frmRate);
}

function draw() {
    background(0);

    rotateX(frameCount * 0.01); // Rotate around the x-axis
    rotateY(frameCount * 0.01); // Rotate around the y-axis

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
}

class Particle {
    constructor(radius, theta, phi, particleColor) {
        this.radius = radius;
        this.theta = theta;
        this.phi = phi;
        this.particleColor = particleColor;

        this.draw = function () {
            push(); // Save the current transformation state
            fill(this.particleColor);
            noStroke();
            const x = this.radius * sin(this.theta) * cos(this.phi);
            const y = this.radius * sin(this.theta) * sin(this.phi);
            const z = this.radius * cos(this.theta);
            translate(x, y, z);
            sphere(5);
            pop(); // Restore the previous transformation state
        };

        this.update = function () {
            // Spin the globe
            this.theta += 0.005;
        };
    }
}

function createParticles() {
    for (let i = 0; i < numParticles; i++) {
        const theta = random(0, PI); // Polar angle
        const phi = random(0, TWO_PI); // Azimuthal angle
        const particleColor = color(random(255), random(255), random(255), random(100, 255));

        particles.push(new Particle(200, theta, phi, particleColor));
    }
}

function keyPressed() {
    if (key === 's') {
        saveGif('loop.gif', 5.2); // 1 sec
    }
}
