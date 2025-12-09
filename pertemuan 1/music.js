(function () {
    function setBtnTextAndState(btn, audio) {
        if (!btn) return;
        const isPlaying = audio && !audio.paused;
        btn.textContent = isPlaying ? 'Pause Music' : 'Play Music';
        btn.classList.toggle('playing', isPlaying);
    }

    window.toggleMusicByIds = function (audioId, btnId) {
        const audio = document.getElementById(audioId);
        const btn = document.getElementById(btnId);
        if (!audio) { console.warn('toggleMusicByIds: audio element not found:', audioId); return; }
        if (!btn)  { console.warn('toggleMusicByIds: button element not found:', btnId);  /* still toggle audio */ }

        if (audio.paused) {
            audio.play().catch((err) => {
                console.warn('Audio play failed:', err);
            });
        } else {
            audio.pause();
        }
        setBtnTextAndState(btn, audio);
    };

    // Backward compatible function - smarter fallback if called without IDs
    window.toggleMusic = function (audioId, btnId) {
        if (audioId && btnId) {
            return window.toggleMusicByIds(audioId, btnId);
        }
        // Attempt to find a button with data-audio or an element with default IDs
        const btn = document.getElementById('musicBtn') || document.querySelector('[data-audio]');
        const detectedAudioId = audioId || (btn && (btn.dataset ? btn.dataset.audio : btn.getAttribute('data-audio'))) || 'music1';
        const detectedBtnId = btn ? (btn.id || 'musicBtn') : 'musicBtn';
        window.toggleMusicByIds(detectedAudioId, detectedBtnId);
    };

    // Initialize buttons found with data-audio attribute and add safe event listeners
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-audio]').forEach(function (btn) {
            const audioId = btn.dataset.audio;
            const audio = document.getElementById(audioId);
            if (!audio) {
                console.warn('music.js: audio not found for btn', btn, 'expected id', audioId);
                return;
            }
            setBtnTextAndState(btn, audio);
            audio.addEventListener('play', function () { setBtnTextAndState(btn, audio); });
            audio.addEventListener('pause', function () { setBtnTextAndState(btn, audio); });
            audio.addEventListener('ended', function () { setBtnTextAndState(btn, audio); });
        });
    });
})();
