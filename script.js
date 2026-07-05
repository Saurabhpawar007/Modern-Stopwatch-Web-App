let startTime = 0;
let elapsedTime = 0;
let interval = null;
let running = false;
let lapCount = 1;

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const clearBtn = document.getElementById("clear");
const laps = document.getElementById("laps");

function updateDisplay() {

    const hrs = Math.floor(elapsedTime / 3600000);
    const mins = Math.floor((elapsedTime % 3600000) / 60000);
    const secs = Math.floor((elapsedTime % 60000) / 1000);
    const millis = elapsedTime % 1000;

    hours.textContent = String(hrs).padStart(2, "0");
    minutes.textContent = String(mins).padStart(2, "0");
    seconds.textContent = String(secs).padStart(2, "0");
    milliseconds.textContent = String(millis).padStart(3, "0");
}

function startStopwatch() {

    if (running) return;

    running = true;

    startTime = Date.now() - elapsedTime;

    startBtn.textContent = "⏸ Pause";

    interval = setInterval(() => {

        elapsedTime = Date.now() - startTime;

        updateDisplay();

    }, 16);

}

function pauseStopwatch() {

    running = false;

    clearInterval(interval);

    startBtn.textContent = "▶ Start";

}

startBtn.addEventListener("click", () => {

    if (running) {

        pauseStopwatch();

    } else {

        startStopwatch();

    }

});

resetBtn.addEventListener("click", () => {

    pauseStopwatch();

    elapsedTime = 0;

    lapCount = 1;

    updateDisplay();

    laps.innerHTML = '<li class="empty">No laps recorded.</li>';

});

lapBtn.addEventListener("click", () => {

    if (!running) return;

    const empty = document.querySelector(".empty");

    if (empty) empty.remove();

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapCount++}</span>
        <span>${hours.textContent}:${minutes.textContent}:${seconds.textContent}.${milliseconds.textContent}</span>
    `;

    laps.prepend(li);

});

clearBtn.addEventListener("click", () => {

    lapCount = 1;

    laps.innerHTML = '<li class="empty">No laps recorded.</li>';

});

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        startBtn.click();

    }

    if (e.key === "l" || e.key === "L") {

        lapBtn.click();

    }

    if (e.key === "r" || e.key === "R") {

        resetBtn.click();

    }

});

updateDisplay();