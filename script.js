console.log("Portafolio cargado correctamente");

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 15px 35px rgba(88, 166, 255, 0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
  });
});

const links = document.querySelectorAll(".menu a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(`Navegando a la sección: ${link.textContent}`);
  });
});