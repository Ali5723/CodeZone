const video = document.getElementById("myVideo");
const progressBar = document.getElementById("progressBar");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function restart() {
  video.currentTime = 0;
  video.play();
}

video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
});

function seek(e) {
  const progress = e.currentTarget;
  const clickX = e.offsetX;
  const width = progress.offsetWidth;
  video.currentTime = (clickX / width) * video.duration;
}
