document.addEventListener("DOMContentLoaded", function () {
    let calendarEl = document.getElementById("calendar");

    let storedPomodoros = JSON.parse(localStorage.getItem("pomodoroData")) || {};

    function getPomodoroIcon(count) {
        if (count === 0) return "❌"; 
        if (count === 1) return "✔️";
        if (count === 2) return "✔️✔️";
        if (count === 3) return "✔️✔️✔️";
        if (count === 4) return "😀";
        if (count === 5) return "😄";
        if (count >= 6 && count <= 20) {
            const randomIcons = ["🔥", "💪", "✨", "⚡", "🏆", "🚀", "🎯", "🎉"];
            return randomIcons[Math.floor(Math.random() * randomIcons.length)];
        }
        return "🏳️‍🌈"; 
    }

    function updateCalendarEvents() {
        let events = Object.keys(storedPomodoros).map(date => ({
            title: getPomodoroIcon(storedPomodoros[date]), 
            start: date,
            backgroundColor: "transparent", 
            borderColor: "transparent",
            textColor: "#000", 
            classNames: ["custom-event"]
        }));

        let calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            events: events,
            height: "auto",
            contentHeight: "auto",
            fixedWeekCount: false,
            dayMaxEvents: true,
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,listWeek"
            }
        });

        calendar.render();
    }

 
    function resetDailyPomodoro() {
        let today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

        if (!(today in storedPomodoros)) {
            storedPomodoros[today] = 0; 
            localStorage.setItem("pomodoroData", JSON.stringify(storedPomodoros));
        }


        let now = new Date();
        let midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // Set to next 00:00
        let timeUntilMidnight = midnight - now;

        setTimeout(() => {
            storedPomodoros[today] = 0; // Reset today’s count
            localStorage.setItem("pomodoroData", JSON.stringify(storedPomodoros));
            updateCalendarEvents(); // Refresh calendar
        }, timeUntilMidnight);
    }

    resetDailyPomodoro();

    updateCalendarEvents();
});
