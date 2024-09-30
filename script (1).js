// Variables for the stopwatch
let startTime;
let elapsedTime = 0;
let timerInterval;

// DOM elements
const display = document.getElementById('display');
const lapsList = document.getElementById('laps-list');

// Format time (milliseconds to mm:ss:ms)
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedMM}:${formattedSS}.${formattedMS}`;
}

// Start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 10);
    showButton('PAUSE');
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    showButton('START');
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00.00";
    elapsedTime = 0;
    lapsList.innerHTML = ''; // Clear lap records
    showButton('START');
}

// Record a lap time
function lapTimer() {
    const lapTime = timeToString(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

// Show button depending on state
function showButton(buttonKey) {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');

    if (buttonKey === 'START') {
        startButton.style.display = 'block';
        pauseButton.style.display = 'none';
    } else {
        startButton.style.display = 'none';
        pauseButton.style.display = 'block';
    }
}

// Button event listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);

// Initial button state
showButton('START');
