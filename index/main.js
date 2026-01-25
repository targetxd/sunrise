const hint = document.getElementById('hint');
window.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bgMusic');
  if(bgMusic){
    bgMusic.volume = 0.5;
    bgMusic.muted = true;
    bgMusic.play().catch(()=>{});
    bgMusic.addEventListener('error', (e) => {
      console.error('❌ Ошибка загрузки аудио:', bgMusic.error?.message);
    });
    bgMusic.addEventListener('canplay', () => {
      console.log('✓ Аудио готово к проигрыванию');
    });
    let musicPlaying = false;
    document.addEventListener('click', () => {
      if (!musicPlaying) {
        try{
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          if(audioContext.state === 'suspended'){
            audioContext.resume().then(() => {
              console.log('✓ AudioContext активирован');
            });
          }
        }catch(e){}
        bgMusic.muted = false;
        hint.textContent = 'click to stop audio';
        bgMusic.play().catch(()=>{});
        musicPlaying = true;
      } else {
        bgMusic.pause();
        hint.textContent = 'click to play audio';
        musicPlaying = false;
      }
    });
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typewriter');
  if(!el) return;
  const lyrics = [
    "I have more",
    "To live for",
    "There's a note in a bottle",
    "Washed ashore",
    "I hear waves",
    "Sing my name",
    "Saying no matter how hard",
    "There's a way",
    "Though I cry",
    "All the time",
    "And struggle out of bed",
    "I'm alive",
    "And I'll live",
    "For myself",
    "For the ones that I love",
    "For the ones that I lost",
    "Dragging my foot forward",
    "Laced with scars and wounds that still hurt",
    "It's so unfair that I'm still here",
    "But I know you'd tell me if you were here",
    "To get up and start moving, what do you fear",
    "Everything is as you left it",
    "Brush off the dust, make a wish",
    "Though I cry",
    "All the time",
    "And struggle out of bed",
    "I'm alive",
    "I'm alive",
    "I'm alive",
    "I'm alive",
    "And I'll live (as you left it— you left it)",
    "For myself (everything is as you left it— you left it)",
    "For the ones that I love (everything is as you left it— you left it)",
    "For the ones that I lost (brush off the dust, make a wish)"
  ];
  const defaultShowSpeed = 90;
  const slowShowSpeed = 160;
  const hideSpeed = 22;
  const pause = 600;
  let cursorInterval = null;
  let showCursor = true;

  function setTypewriterText(text) {
    el.textContent = text + '|';
  }

  function typeLine(line, cb) {
    let i = 0;
    el.textContent = '';
    const showSpeed = line.length < 18 ? slowShowSpeed : defaultShowSpeed;
    function type() {
      if (i < line.length) {
        setTypewriterText(line.slice(0, i));
        i++;
        setTimeout(type, showSpeed);
      } else {
        setTypewriterText(line);
        setTimeout(cb, pause);
      }
    }
    type();
  }

  function eraseLine(cb) {
    let str = el.textContent.replace('|', '').replace('\u200B', '');
    function erase() {
      if (str.length > 0) {
        str = str.slice(0, -1);
        setTypewriterText(str.length === 0 ? '\u200B' : str);
        setTimeout(erase, hideSpeed);
      } else {
        el.textContent = '\u200B';
        cb();
      }
    }
    erase();
  }
  function runLyrics(idx = 0) {
    if (idx >= lyrics.length) {
      typeLine("i'm alive", ()=>{});
      return;
    }
    typeLine(lyrics[idx], () => {
      eraseLine(() => runLyrics(idx + 1));
    });
  }
  setTimeout(() => runLyrics(0), 600);
});
window.addEventListener('DOMContentLoaded', () => {
  const lyrics = [
    "I have more",
    "To live for",
    "There's a note in a bottle",
    "Washed ashore",
    "I hear waves",
    "Sing my name",
    "Saying no matter how hard",
    "There's a way",
    "Though I cry",
    "All the time",
    "And struggle out of bed",
    "I'm alive",
    "And I'll live",
    "For myself",
    "For the ones that I love",
    "For the ones that I lost",
    "Dragging my foot forward",
    "Laced with scars and wounds that still hurt",
    "It's so unfair that I'm still here",
    "But I know you'd tell me if you were here",
    "To get up and start moving, what do you fear",
    "Everything is as you left it",
    "Brush off the dust, make a wish",
    "Though I cry",
    "All the time",
    "And struggle out of bed",
    "I'm alive",
    "I'm alive",
    "I'm alive",
    "I'm alive",
    "And I'll live (as you left it— you left it)",
    "For myself (everything is as you left it— you left it)",
    "For the ones that I love (everything is as you left it— you left it)",
    "For the ones that I lost (brush off the dust, make a wish)"
  ];
  const randomZone = document.getElementById('lyricsRandomized');
  if(!randomZone) return;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=,.<>/?|[]{}~';
  let idx = 0;
  let currentLine = lyrics[0];
  let animInterval = null;
  let lineInterval = null;
  const maxLen = Math.max(...lyrics.map(l => l.length));
  function getObfuscated(str) {
    let padded = str.padEnd(maxLen, ' ');
    return padded.split('').map((ch, i) => {
      if (' (),.—\''.includes(ch)) return ch;
      if (i >= str.length) return ' ';
      if (Math.random() < 0.7) return chars[Math.floor(Math.random() * chars.length)];
      return ch;
    }).join('');
  }
  function startObfuscation(line) {
    if (animInterval) clearInterval(animInterval);
    animInterval = setInterval(() => {
      randomZone.textContent = getObfuscated(line);
    }, 60);
  }
  function nextLine() {
    currentLine = lyrics[idx];
    idx = (idx + 1) % lyrics.length;
    startObfuscation(currentLine);
  }
  nextLine();
  if (lineInterval) clearInterval(lineInterval);
  lineInterval = setInterval(nextLine, 2000);
});
(function animateTitle() {
  const base = "XDXDXD";
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=,.<>/?|[]{}~';
  let visible = true;
  setInterval(() => {
    let out = '';
    for (let i = 0; i < base.length; ++i) {
      out += Math.random() < 0.7 ? chars[Math.floor(Math.random() * chars.length)] : base[i];
    }
    document.title = out;
  }, 90);
})();
