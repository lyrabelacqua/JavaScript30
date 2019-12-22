let countdown;
const displayTimer = document.querySelector('.display__time-left');
const displayEndTimer = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearTimeout(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor(seconds % (60 * 60) / 60);
    const secondsLeft = seconds % 60;
    const displayString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
    document.title = displayString;
    displayTimer.textContent = displayString;
}

function displayEndTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    displayEndTimer.textContent = `Be back at ${hours}: ${minutes.toString().padStart(2, '0')}`;  
}

function startTimer() {
    timer(+this.dataset.time);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = +this.minutes.value;
    this.reset();
    timer( mins * 60);
});