document.addEventListener('DOMContentLoaded', function() {
    fetch('frequencies.json')
        .then(response => response.json())
        .then(data => {
            const dropdownOptions = document.getElementById('dropdownOptions');
            data.forEach(item => {
                const optionDiv = document.createElement('div');
                optionDiv.innerHTML = `${item.svg} ${item.label}`;
                optionDiv.dataset.value = item.value;
                optionDiv.addEventListener('click', function() {
                    selectFrequency(item.value, item.svg, item.label);
                });
                dropdownOptions.appendChild(optionDiv);
            });
        })
        .catch(error => console.error('Error loading frequencies:', error));

    const modeToggle = document.getElementById('modeToggle');
    const frequencyDropdownContainer = document.getElementById('frequencyDropdownContainer');
    const manualFrequencyContainer = document.getElementById('manualFrequencyContainer');
    
    modeToggle.addEventListener('change', function() {
        if (modeToggle.value === 'dropdown') {
            frequencyDropdownContainer.style.display = 'block';
            manualFrequencyContainer.style.display = 'none';
        } else if (modeToggle.value === 'manual') {
            frequencyDropdownContainer.style.display = 'none';
            manualFrequencyContainer.style.display = 'block';
        }
    });

    document.getElementById('selectedValue').addEventListener('click', function() {
        document.getElementById('dropdownOptions').style.display = 
            document.getElementById('dropdownOptions').style.display === 'none' ? 'block' : 'none';
    });

    function selectFrequency(value, svg, label) {
        document.getElementById('selectedValue').innerHTML = `${svg} ${label}`;
        document.getElementById('dropdownOptions').style.display = 'none';
        document.getElementById('selectedValue').dataset.value = value;
    }
});

document.getElementById('playButton').addEventListener('click', function() {
    const modeToggle = document.getElementById('modeToggle');
    let frequency;

    if (modeToggle.value === 'dropdown') {
        frequency = parseFloat(document.getElementById('selectedValue').dataset.value);
    } else if (modeToggle.value === 'manual') {
        frequency = parseFloat(document.getElementById('manualFrequency').value);
    }

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
