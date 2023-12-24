import * as THREE from 'https://threejs.org/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const radius = 50;
const widthSegments = 32;
const heightSegments = 16;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'aqua', wireframe: true });

// Create the sphere mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Set camera position
camera.position.z = 100;

// Add latitude and longitude lines
const latitudeLines = 12;
const longitudeLines = 24;

for (let lat = 0; lat <= latitudeLines; lat++) {
    const phi = (lat / latitudeLines) * Math.PI - Math.PI / 2;
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-radius * Math.PI, radius * Math.sin(phi), radius * Math.cos(phi)),
        new THREE.Vector3(radius * Math.PI, radius * Math.sin(phi), radius * Math.cos(phi))
    ]);
    const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
    scene.add(line);
}

for (let long = 0; long <= longitudeLines; long++) {
    const theta = (long / longitudeLines) * (Math.PI * 2);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(radius * Math.sin(theta), radius * Math.cos(theta), -radius),
        new THREE.Vector3(radius * Math.sin(theta), radius * Math.cos(theta), radius)
    ]);
    const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
    scene.add(line);
}

const capturer = new CCapture({
    format: 'gif',
    workersPath: 'js/', // Change this path to the location of the CCapture worker scripts
    verbose: true,
    framerate: 30,
    timeLimit: 10, // Set the time limit for recording in seconds
});

function animate() {
    capturer.capture(renderer.domElement);
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
}

function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

window.addEventListener('resize', resizeCanvas);

capturer.start();
animate();

// Stop the recording after a certain duration
function download(data, filename) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Stop the recording after a certain duration
setTimeout(() => {
    capturer.stop();
    capturer.save(blob => {
        download(blob, 'animation.gif');
    });
}, 5000); // Adjust the duration as needed // Adjust the duration as needed
