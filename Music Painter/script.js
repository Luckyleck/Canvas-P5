document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const audio = new Audio('HoliznaCC0 - Space!.mp3'); // replace with the path to your audio file
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let isPlaying = false;

    // Add a button to start playing the audio
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play();
            isPlaying = true;
            draw();
        }
    });

    audio.addEventListener('canplay', () => {
        // Optional: Auto-play the audio when it's ready
        // audio.play();
    });

    function draw() {
        analyser.getByteFrequencyData(dataArray);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw circles based on frequency data
        dataArray.forEach((value, index) => {
            const percent = value / 255;
            const radius = percent * 100;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 165, 0, ${percent})`; // Adjust color and opacity
            ctx.fill();
        });

        requestAnimationFrame(draw);

        // Check if audio has ended
        if (audio.currentTime >= audio.duration) {
            audio.pause();
            isPlaying = false;
        }
    }
});
