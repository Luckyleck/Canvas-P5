let sphereDetail = 25;
let bulgeStrength = 0.2;
let bulgePoints = [];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    // Generate random bulge points on the sphere
    for (let i = 0; i < 10; i++) {
        bulgePoints.push(createVector(random(-1, 1), random(-1, 1), random(-1, 1)).normalize());
    }
}

function draw() {
    background(0);

    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);

    // Display the jello-like sphere
    drawJelloSphere();
}

function drawJelloSphere() {
    beginShape(TRIANGLE_STRIP);

    for (let i = 0; i <= sphereDetail; i++) {
        for (let j = 0; j <= sphereDetail; j++) {
            let lat = map(i, 0, sphereDetail, 0, PI);
            let lon = map(j, 0, sphereDetail, 0, TWO_PI);

            let x = sin(lat) * cos(lon);
            let y = sin(lat) * sin(lon);
            let z = cos(lat);

            // Apply bulges to the sphere
            for (let bulge of bulgePoints) {
                let distance = dist(x, y, z, bulge.x, bulge.y, bulge.z);
                let bulgeFactor = map(distance, 0, 0.2, 1, 1.5);
                x += bulge.x * bulgeStrength * bulgeFactor;
                y += bulge.y * bulgeStrength * bulgeFactor;
                z += bulge.z * bulgeStrength * bulgeFactor;
            }

            let radius = 200;
            x *= radius;
            y *= radius;
            z *= radius;

            vertex(x, y, z);

            lat = map(i + 1, 0, sphereDetail, 0, PI);
            lon = map(j, 0, sphereDetail, 0, TWO_PI);

            x = sin(lat) * cos(lon);
            y = sin(lat) * sin(lon);
            z = cos(lat);

            // Apply bulges to the sphere
            for (let bulge of bulgePoints) {
                let distance = dist(x, y, z, bulge.x, bulge.y, bulge.z);
                let bulgeFactor = map(distance, 0, 0.2, 1, 1.5);
                x += bulge.x * bulgeStrength * bulgeFactor;
                y += bulge.y * bulgeStrength * bulgeFactor;
                z += bulge.z * bulgeStrength * bulgeFactor;
            }

            x *= radius;
            y *= radius;
            z *= radius;

            vertex(x, y, z);
        }
    }

    endShape();
}
