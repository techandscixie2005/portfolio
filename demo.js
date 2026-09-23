(() => {
    const video = document.querySelector("#demo-video");
    const button = document.querySelector("#demo-play");
    const status = document.querySelector("#demo-status");
    if (!video || !button || !status) return;
    let pending = false;
    let failed = false;
    let timer;
    const clearPending = () => {
        clearTimeout(timer);
        pending = false;
        button.disabled = false;
    };
    const fail = () => {
        clearPending();
        failed = true;
        video.pause();
        button.hidden = false;
        button.textContent = "Retry playback";
        status.textContent = "The video could not be played. Retry, download the full MP4, or open the original WebM above.";
    };
    button.hidden = false;
    button.addEventListener("click", () => {
        if (pending) return;
        pending = true;
        // Disabling the button would otherwise drop keyboard focus to the body.
        video.focus();
        button.disabled = true;
        status.textContent = "Loading recording…";
        if (!video.hasAttribute("src") || failed) {
            failed = false;
            video.src = video.dataset.src;
            video.load();
        }
        timer = setTimeout(fail, 30000);
        video.play().catch(fail);
    });
    video.addEventListener("playing", () => {
        clearPending();
        failed = false;
        button.hidden = true;
        status.textContent = "";
    });
    video.addEventListener("error", fail);
})();
