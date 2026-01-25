document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('bgMusic');
  const hint = document.getElementById('hint');
  let isPlaying = false;
  function updateHint() {
    hint.textContent = isPlaying ? 'click to stop audio' : 'click to play audio';
  }
  audio.muted = false;
  audio.pause();
  isPlaying = false;
  updateHint();
  document.body.addEventListener('click', function(e) {
    if (window.getSelection && window.getSelection().toString()) return;
    if (e.target.closest('a[href="index.html"]')) return;
    if (audio.paused) {
      audio.muted = false;
      audio.play().then(() => {
        isPlaying = true;
        updateHint();
      }).catch(() => {
        isPlaying = false;
        updateHint();
      });
    } else {
      audio.pause();
      isPlaying = false;
      updateHint();
    }
  });
  audio.addEventListener('play', function() {
    isPlaying = true;
    updateHint();
  });
  audio.addEventListener('pause', function() {
    isPlaying = false;
    updateHint();
  });
});
