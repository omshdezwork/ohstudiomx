// ===============================
// CONFIGURACIÓN EDITABLE OH STUDIO
// ===============================

// AQUÍ CAMBIA EL LINK DE WHATSAPP
const WHATSAPP_LINK = "https://wa.me/525667607325";

// AQUÍ CAMBIA EL LINK DE INSTAGRAM
const INSTAGRAM_LINK = "https://www.instagram.com/ohstudio_mx/";

const CONTACT_INFO = {
  phone: "+52 56 6760 7325",
  instagram: "@ohstudio_mx",
  location: "Ciudad de México"
};

const PACKAGE_PRICES = {
  esencial: "$4,900",
  completo: "$9,900",
  premium: "$16,900"
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navPanel = document.querySelector("[data-nav-panel]");

  const closeMenu = () => {
    navPanel?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#" || !targetId.startsWith("#")) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      const headerOffset = (header?.offsetHeight || 0) + 18;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll(".js-whatsapp").forEach((button) => {
    const packageName = button.dataset.package;
    const message = packageName
      ? `Hola Oh Studio, me interesa cotizar ${packageName}.`
      : "Hola Oh Studio, quiero contactarlos para transformar mi proyecto.";
    button.href = `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".js-instagram").forEach((link) => {
    link.href = INSTAGRAM_LINK;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const phone = document.querySelector("[data-contact-phone]");
  const instagram = document.querySelector("[data-contact-instagram]");
  const location = document.querySelector("[data-contact-location]");

  if (phone) phone.textContent = CONTACT_INFO.phone;
  if (instagram) instagram.textContent = `Instagram: ${CONTACT_INFO.instagram}`;
  if (location) location.textContent = `Ubicación: ${CONTACT_INFO.location}`;

  Object.entries(PACKAGE_PRICES).forEach(([key, value]) => {
    const price = document.querySelector(`[data-price="${key}"]`);
    if (price) price.innerHTML = `${value} <span>MXN</span>`;
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    document.querySelectorAll("[data-gallery-card]").forEach((card, cardIndex) => {
      const images = Array.from(card.querySelectorAll("img"));
      if (images.length < 2) return;

      let activeIndex = images.findIndex((image) => image.classList.contains("is-active"));
      if (activeIndex < 0) activeIndex = 0;

      window.setTimeout(() => {
        window.setInterval(() => {
          images[activeIndex].classList.remove("is-active");
          activeIndex = (activeIndex + 1) % images.length;
          images[activeIndex].classList.add("is-active");
        }, 5200);
      }, cardIndex * 900);
    });
  }
});
