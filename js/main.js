import { runIntro } from "./intro.js";
import { initScroll } from "./scroll.js";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

runIntro();
initScroll();

/* ---------- Navegación: fondo al hacer scroll + volver arriba + parallax ---------- */
const nav = document.querySelector(".nav");
const toTop = document.querySelector(".to-top");
const hero = document.querySelector(".hero");
let ticking = false;

const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle("is-scrolled", y > 24);
  toTop.classList.toggle("is-visible", y > 700);
  if (hero && !reduceMotion && y < window.innerHeight) {
    hero.style.setProperty("--py", String(Math.round(y * 0.07)));
  }
  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true }
);
onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

/* ---------- Sección activa ---------- */
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        const active = a.getAttribute("href") === `#${entry.target.id}`;
        a.toggleAttribute("aria-current", active);
        if (active) a.setAttribute("aria-current", "true");
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ---------- Menú móvil ---------- */
const toggle = document.querySelector(".nav-toggle");
const panel = document.getElementById("menu");
const mobileQuery = window.matchMedia("(max-width: 1040px)");

const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  panel.classList.toggle("is-open", open);
  root.classList.toggle("scroll-locked", open);
  if (open) panel.querySelector("a").focus();
};

const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

toggle.addEventListener("click", () => setMenu(!isOpen()));

panel.querySelectorAll("a").forEach((a, i) => {
  a.style.setProperty("--i", String(i));
  a.addEventListener("click", () => isOpen() && setMenu(false));
});

document.addEventListener("keydown", (e) => {
  if (!isOpen()) return;
  if (e.key === "Escape") {
    setMenu(false);
    toggle.focus();
  } else if (e.key === "Tab") {
    // Trampa de foco mientras el menú está abierto
    const items = [toggle, ...panel.querySelectorAll("a")];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

mobileQuery.addEventListener("change", (e) => {
  if (!e.matches && isOpen()) setMenu(false);
});

/* ---------- Reveal al hacer scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);
document.querySelectorAll("[class~=stagger]").forEach((group) =>
  [...group.children].forEach((child, i) => child.style.setProperty("--i", String(i)))
);
document.querySelectorAll(".reveal, .stagger").forEach((el) => revealObserver.observe(el));
