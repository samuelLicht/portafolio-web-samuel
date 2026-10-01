// Animaciones ligadas al scroll: títulos por palabra, texto que se ilumina,
// venas doradas (kintsugi), progreso de línea de tiempo, parallax y foco del cursor.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/* Divide un elemento en palabras (conserva <em> y demás etiquetas internas) */
function splitWords(root) {
  let n = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(" ");
            return;
          }
          const outer = document.createElement("span");
          const inner = document.createElement("span");
          outer.className = "w";
          inner.className = "wi";
          inner.style.setProperty("--wi", String(n++));
          inner.textContent = part;
          outer.append(inner);
          frag.append(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(root);
  root.dataset.words = String(n);
  return root.querySelectorAll(".wi");
}

export function initScroll() {
  const titles = document.querySelectorAll(".section h2");
  titles.forEach((h) => {
    h.setAttribute("aria-label", h.textContent.replace(/\s+/g, " ").trim());
    splitWords(h).forEach((w) => w.setAttribute("aria-hidden", "true"));
  });

  const scrubEl = document.querySelector("[data-scrub-words]");
  const scrubWords = scrubEl ? [...splitWords(scrubEl)] : [];

  // Etiquetas de tecnologías: retraso en cascada dentro de cada grupo
  document.querySelectorAll(".tech-group li").forEach((li, i, all) => {
    const group = li.closest(".tech-group");
    const j = [...group.querySelectorAll("li")].indexOf(li);
    li.style.setProperty("--j", String(j));
  });

  // Foco dorado que sigue al cursor
  document.querySelectorAll("[data-spot]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  const progressBar = document.querySelector(".scroll-progress");
  const veins = [...document.querySelectorAll(".vein path")];
  const veinBox = document.querySelector(".vein");
  const windows = [
    [0, 1],
    [0.2, 0.34],
    [0.37, 0.52],
    [0.57, 0.72],
    [0.77, 0.92],
  ];
  const scrubbed = [...document.querySelectorAll("[data-scrub]")];
  const parallax = [...document.querySelectorAll("[data-parallax]")];

  if (reduceMotion) {
    veins.forEach((p) => (p.style.strokeDashoffset = "0"));
    scrubWords.forEach((w) => (w.style.opacity = "1"));
    scrubbed.forEach((el) => el.style.setProperty("--p", "1"));
    return;
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - vh;

    if (progressBar) progressBar.style.setProperty("--sp", String(clamp(y / Math.max(docH, 1))));

    if (veinBox && veins.length) {
      const top = veinBox.offsetTop;
      const p = clamp((y + vh * 0.75 - top) / veinBox.offsetHeight);
      veins.forEach((path, i) => {
        const [s, e] = windows[i] || [0, 1];
        path.style.strokeDashoffset = String(1 - clamp((p - s) / (e - s)));
      });
    }

    // Texto que se ilumina palabra por palabra
    if (scrubEl) {
      const r = scrubEl.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
      const lit = p * scrubWords.length * 1.15;
      scrubWords.forEach((w, i) => {
        w.style.opacity = String(0.2 + 0.8 * clamp(lit - i));
      });
    }

    scrubbed.forEach((el) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--p", String(clamp((vh * 0.8 - r.top) / (r.height + vh * 0.1))));
    });

    parallax.forEach((el) => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      const k = parseFloat(el.dataset.parallax) || 0.1;
      el.style.setProperty("--par", String(Math.round(-center * k)));
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update);
  update();
}
