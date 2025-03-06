
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00"

window.onload = () => {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        if (button.getAttribute('href') === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
};


window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}
document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.querySelector(".home-button");
  
    if (window.location.pathname.endsWith("index.html")) {
      homeButton.classList.add("active");
      homeButton.classList.remove("inactive");
    } else {
      homeButton.classList.add("inactive");
      homeButton.classList.remove("active");
    }
  });
  
// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = seconds - 1;

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1 ){
                if(breakCount % 2 === 0) {
                    // start break
                    workMinutes = breakMinutes;
                    breakCount++

                    // change the painel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                }else {
                    // continue work
                    workMinutes = workTime;
                    breakCount++

                    // change the painel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    setInterval(timerFunction, 1000); // 1000 = 1s
}

document.addEventListener("DOMContentLoaded", () => {
    let pomodoroCount = localStorage.getItem("pomodoroCount") || 0;
    document.getElementById("pomodoroCount").textContent = pomodoroCount;
});

function startPomodoroSession() {
    let minutes = 25;
    let seconds = 0;
    updateTimerDisplay(minutes, seconds);

    let countdown = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdown);
                completePomodoro();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateTimerDisplay(minutes, seconds);
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    let pomodoroCount = localStorage.getItem("pomodoroCount") || 0;
});

function startPomodoroSession() {
    let minutes = 25;
    let seconds = 0;
    updateTimerDisplay(minutes, seconds);

    let countdown = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdown);
                completePomodoro();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateTimerDisplay(minutes, seconds);
    }, 1000);
}

function updateTimerDisplay(minutes, seconds) {
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function completePomodoro() {
    alert("Pomodoro session completed!");

    let today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    
    let storedPomodoros = JSON.parse(localStorage.getItem("pomodoroData")) || {};

    // Increment Pomodoro count for today
    storedPomodoros[today] = (storedPomodoros[today] || 0) + 1;

    // Save back to localStorage
    localStorage.setItem("pomodoroData", JSON.stringify(storedPomodoros));

    // Force Dashboard Update
    updateDashboardPomodoroIcons();
}

// Notify the dashboard to update icons in real-time
function updateDashboardPomodoroIcons() {
    if (window.location.pathname.includes("dashboard.html")) {
        location.reload(); // Refresh dashboard to update the new icon
    }
}

function resetTimer() {
    if (isWorkSession) {
        minutes = 25; // Set work session back to 25 minutes
    } else {
        minutes = 5; // Set break session back to 5 minutes
    }
    seconds = 0;
    updateDisplay();
}

document.getElementById("cheatPomodoro").addEventListener("click", function () {
    let today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    
    let storedPomodoros = JSON.parse(localStorage.getItem("pomodoroData")) || {};

    // Instantly increase today's Pomodoro count
    storedPomodoros[today] = (storedPomodoros[today] || 0) + 1;

    // Save updated count
    localStorage.setItem("pomodoroData", JSON.stringify(storedPomodoros));

    alert("Cheat Activated: +1 Pomodoro Added!");
    
    // Update Dashboard
    updateDashboardPomodoroIcons();
});
