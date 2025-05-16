document.getElementById('surprise-btn').addEventListener('click', function() {
  const rickroll = document.getElementById('rickroll');
  rickroll.style.display = 'block';
  const iframe = rickroll.querySelector('iframe');
  iframe.src = 'https://www.youtube.com/embed/GBIIQ0kP15E?autoplay=1';
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  }
});