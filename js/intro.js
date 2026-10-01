// Intro SL: ~2.6 s. Se muestra una vez por sesión y se puede saltar con clic o Esc.
const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finish = () => {
  root.classList.add("ready");
  root.classList.remove("scroll-locked");
};

export function runIntro() {
  const intro = document.getElementById("intro");

  if (!root.classList.contains("intro-on") || !intro) {
    finish();
    return;
  }

  try {
    sessionStorage.setItem("sl-intro", "1");
  } catch (_) {
    /* sin almacenamiento: la intro simplemente se repetirá */
  }

  let leaving = false;
  const timers = [];

  const leave = () => {
    if (leaving) return;
    leaving = true;
    timers.forEach(clearTimeout);
    intro.classList.add("is-leaving");
    setTimeout(finish, reduceMotion ? 150 : 250);
    setTimeout(() => {
      intro.remove();
      root.classList.remove("intro-on");
    }, reduceMotion ? 350 : 750);
  };

  timers.push(setTimeout(leave, reduceMotion ? 700 : 2600));

  intro.addEventListener("click", leave);
  window.addEventListener("keydown", (e) => e.key === "Escape" && leave(), { once: true });
}
