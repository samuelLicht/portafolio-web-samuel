console.log("Portafolio cargado correctamente");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const heroBg = document.querySelector(".hero-bg");

if (heroBg) {
  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.15;
    heroBg.style.backgroundPosition = `center calc(60% + ${offset}px)`;
  });
}

const vangogh = document.querySelector(".profile-image-container");
const heroSection = document.querySelector(".hero");

if (vangogh && heroSection) {
  const updateVangoghFade = () => {
    const fadeDistance = heroSection.offsetHeight * 0.65;
    const progress = Math.min(window.scrollY / fadeDistance, 1);
    vangogh.style.opacity = String(1 - progress);
  };

  window.addEventListener("scroll", updateVangoghFade);
  updateVangoghFade();
}

document.querySelectorAll(".project-face").forEach((face) => {
  face.addEventListener("click", () => {
    const card = face.closest(".project-card");
    const isExpanded = face.getAttribute("aria-expanded") === "true";

    face.setAttribute("aria-expanded", String(!isExpanded));
    card.classList.toggle("expanded", !isExpanded);
  });
});

const links = document.querySelectorAll(".menu a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(`Navegando a la sección: ${link.textContent}`);
  });
});