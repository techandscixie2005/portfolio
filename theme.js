(() => {
    try {
        const saved = localStorage.getItem("portfolio-theme");
        if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
    } catch (_) {
        /* CSS follows the system if storage is blocked. */
    }
})();
