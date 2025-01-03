function getTheme(): string {
  return (
    localStorage?.getItem("theme") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

function toggleTheme() {
  const theme = getTheme();
  localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  applyTheme();
}

function applyTheme() {
  const theme = getTheme();
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
}

applyTheme();

document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeButton = document.querySelector("#theme-toggle");
  toggleThemeButton?.addEventListener("click", toggleTheme);
});
