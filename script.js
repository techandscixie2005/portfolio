(() => {
    const root = document.documentElement;
    const theme = document.querySelector(".theme-toggle");
    const system = matchMedia("(prefers-color-scheme: dark)");
    const dark = () => (root.dataset.theme ? root.dataset.theme === "dark" : system.matches);
    const label = () => {
        theme.setAttribute("aria-label", `Switch to ${dark() ? "light" : "dark"} theme`);
        theme.querySelector(".theme-label").textContent = dark() ? "Light" : "Dark";
    };
    if (theme) {
        theme.hidden = false;
        label();
        theme.addEventListener("click", () => {
            root.dataset.theme = dark() ? "light" : "dark";
            try {
                localStorage.setItem("portfolio-theme", root.dataset.theme);
            } catch (_) {
                /* Session-only choice. */
            }
            label();
        });
        system.addEventListener("change", label);
    }
    const menu = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#site-nav");
    const narrow = matchMedia("(max-width: 700px)");
    if (menu && nav) {
        const close = (restore = false) => {
            menu.setAttribute("aria-expanded", "false");
            nav.hidden = narrow.matches;
            if (restore) menu.focus();
        };
        const sync = () => {
            const focused = nav.contains(document.activeElement);
            menu.hidden = !narrow.matches;
            close(focused && narrow.matches);
        };
        menu.addEventListener("click", () => {
            const open = menu.getAttribute("aria-expanded") !== "true";
            menu.setAttribute("aria-expanded", String(open));
            nav.hidden = !open;
        });
        nav.addEventListener("click", (event) => {
            if (event.target.closest("a") && narrow.matches) close(true);
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") close(true);
        });
        document.addEventListener("click", (event) => {
            if (
                narrow.matches &&
                !event.target.closest(".nav-controls") &&
                menu.getAttribute("aria-expanded") === "true"
            )
                close(nav.contains(document.activeElement));
        });
        narrow.addEventListener("change", sync);
        sync();
    }
    document.addEventListener("DOMContentLoaded", () => {
        const copy = document.querySelector(".copy-email");
        if (!copy) return;
        copy.hidden = false;
        copy.addEventListener("click", async () => {
            const status = document.querySelector(".copy-status");
            try {
                await navigator.clipboard.writeText(copy.dataset.email);
                status.textContent = "Email address copied.";
            } catch (_) {
                status.textContent =
                    "Copy is unavailable. Select the email address above or open it in your mail app.";
            }
        });
    });
})();
