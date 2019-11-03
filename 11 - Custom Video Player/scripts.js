const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');

let mousedown = false;

function togglePlay () {
    if (video.paused) {
        video.play();
    } else 
        video.pause();
}

function toggleButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function updateRange() {
    video[this.name] = this.value;
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const position = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = position;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);
video.addEventListener('timeupdate', updateProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', updateRange));
progress.addEventListener('mousemove', (e) => {mousedown && scrub(e)});
progress.addEventListener('mousedown', () => { mousedown = true;});
progress.addEventListener('mouseup', () => { mousedown = false});
