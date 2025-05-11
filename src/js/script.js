const body = document.querySelector("body")
const btnMode = document.getElementById("mode")
const icon = document.getElementById("icon")

let totalSeconds = 0
let interval = null
let isPaused = false

const inputMinutos = document.getElementById("inputMinutos")
const btnStart = document.getElementById("btnStart")
const btnPause = document.getElementById("btnPause")
const btnReset = document.getElementById("btnReset")

const hourDisplay = document.getElementById("hour")
const minuteDisplay = document.getElementById("minute")
const secondDisplay = document.getElementById("second")
const messageStatus = document.getElementById("messageStatus")


btnMode.addEventListener("click", () => {
  body.classList.toggle("dark")
  const isDark = body.classList.contains("dark")

  icon.classList = isDark ? "ph-fill ph-sun" : "ph-fill ph-moon"
})

// Update the watch
function updateDisplay() {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  hourDisplay.textContent = String(hours).padStart(2, "0")
  minuteDisplay.textContent = String(minutes).padStart(2, "0")
  secondDisplay.textContent = String(seconds).padStart(2, "0")
}

// Initial countdown
function startTimer() {
  if (interval || totalSeconds <= 0) return

  messageStatus.textContent = "Contando... Foco no objetivo!"
  isPaused = false

  interval = setInterval(() => {
    if (!isPaused) {
      totalSeconds--
      updateDisplay()

      if (totalSeconds <= 0) {
        clearInterval(interval)
        interval = null
        messageStatus.textContent = "Tempo esgotado! Missão cumprida?"
      }
    }
  }, 1000)
}

// Pause the countdown
function pauseTimer() {
  if (!interval) return;

  isPaused = !isPaused;
  messageStatus.textContent = isPaused ? "Pausado." : "Contando... Foco no objetivo!";
}

// All reset 
function resetTimer() {
  clearInterval(interval);
  interval = null;
  totalSeconds = 0;
  isPaused = false;
  updateDisplay();
  inputMinutos.value = "";
  messageStatus.textContent = "";
}

// Start time
btnStart.addEventListener("click", () => {
  if (interval) return;

  const minutos = parseInt(inputMinutos.value);

  if (isNaN(minutos) || minutos <= 0) {
    messageStatus.textContent = "Digite um valor válido em minutos.";
    return;
  }

  totalSeconds = minutos * 60;
  updateDisplay();
  startTimer();
});

btnPause.addEventListener("click", pauseTimer);
btnReset.addEventListener("click", resetTimer);

// Initial display
updateDisplay();