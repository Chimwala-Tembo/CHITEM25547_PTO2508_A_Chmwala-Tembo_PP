const THEME_KEY = "theme";
const DARK_CLASS = "dark-mode";

/**
 * Set up the light/dark theme toggle.
 * Persists choice to localStorage and applies on load.
 */
export function setupTheme() {
  const toggle = document.getElementById("theme-toggle-btn");
  if (!toggle) return;

  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") {
    document.body.classList.add(DARK_CLASS);
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle(DARK_CLASS);
    const current = document.body.classList.contains(DARK_CLASS)
      ? "dark"
      : "light";
    localStorage.setItem(THEME_KEY, current);
  });
}
