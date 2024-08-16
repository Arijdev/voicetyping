// Access DOM elements
const transcription = document.getElementById('transcription');
const startStopButton = document.getElementById('startStopButton');
const languageSelect = document.getElementById('languageSelect');
const status = document.getElementById('status');

// Speech recognition object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = languageSelect.value;
recognition.interimResults = true;

// Event listeners
startStopButton.addEventListener('click', () => {
    if (startStopButton.textContent === 'Start') {
        startRecognition();
    } else {
        stopRecognition();
    }
});

languageSelect.addEventListener('change', () => {
    recognition.lang = languageSelect.value;
    status.textContent = `Language set to ${languageSelect.selectedOptions[0].textContent}`;
});

// Functions
function startRecognition() {
    recognition.start();
    startStopButton.textContent = 'Stop';
    status.textContent = 'Listening...';
}

function stopRecognition() {
    recognition.stop();
    startStopButton.textContent = 'Start';
    status.textContent = 'Click "Start" to begin speech recognition';
}

recognition.onresult = function(event) {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
    transcription.value = transcript;
}

recognition.onend = function() {
    startStopButton.textContent = 'Start';
    status.textContent = 'Speech recognition stopped.';
}

recognition.onerror = function(event) {
    status.textContent = `Error occurred: ${event.error}`;
}
