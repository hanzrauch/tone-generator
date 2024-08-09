document.getElementById('playButton').addEventListener('click', function() {
    const frequency = parseFloat(document.getElementById('frequency').value);
    const duration = parseFloat(document.getElementById('duration').value);

    if (frequency >= 20 && frequency <= 20000 && duration > 0) {
        playTone(frequency, duration);
    } else {
        alert('Please enter a valid frequency (20-20000 Hz) and duration (>0 seconds).');
    }
});

function playTone(frequency, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}
