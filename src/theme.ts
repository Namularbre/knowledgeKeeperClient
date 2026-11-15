/**
 * Keeps the Bootstrap theme (data-bs-theme) in sync with the OS theme.
 */
export function syncThemeWithOS() {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () =>
        document.documentElement.setAttribute("data-bs-theme", media.matches ? "dark" : "light");

    applyTheme();
    media.addEventListener("change", applyTheme);
}
