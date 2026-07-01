// ===============================
// CONFIGURACIÓN EDITABLE OH STUDIO
// ===============================

// AQUÍ CAMBIA EL LINK DE WHATSAPP
const WHATSAPP_LINK = "https://wa.me/5215512345678";

// AQUÍ CAMBIA EL LINK DE INSTAGRAM
const INSTAGRAM_LINK = "https://instagram.com/ohstudio.mx";

const CONTACT_INFO = {
  phone: "55 1234 5678",
  email: "hola@ohstudio.mx",
  instagram: "@ohstudio.mx",
  location: "Ciudad de México"
};

const PACKAGE_PRICES = {
  esencial: "$4,900",
  completo: "$9,900",
  premium: "$16,900"
};

const ECOSYSTEM_CONTENT = {
  marca: {
    kicker: "MARCA E IDENTIDAD",
    title: "Tu negocio se reconoce antes de que expliques qué haces.",
    text: "Definimos una base visual clara: concepto, colores, estilo, aplicaciones y detalles para que todo se vea coherente desde el primer vistazo.",
    image: "assets/mockups/ecosystem-scene.svg",
    alt: "Mockup de marca e identidad Oh Studio"
  },
  espacios: {
    kicker: "ESPACIOS",
    title: "Un lugar bien pensado cambia cómo te perciben.",
    text: "Creamos propuestas de distribución, ambientación, decoración y detalles visuales para que tu espacio se sienta más cuidado, funcional y especial.",
    image: "assets/images/gallery-02.svg",
    alt: "Propuesta visual de espacios Oh Studio"
  },
  impresos: {
    kicker: "IMPRESOS",
    title: "Lo físico también comunica profesionalismo.",
    text: "Diseñamos aplicaciones para lonas, viniles, tarjetas, menús, etiquetas, empaques y materiales impresos que elevan la presentación de tu proyecto.",
    image: "assets/images/gallery-03.svg",
    alt: "Material impreso diseñado por Oh Studio"
  },
  redes: {
    kicker: "REDES SOCIALES",
    title: "Tu presencia digital debe verse igual de clara que tu idea.",
    text: "Preparamos una línea visual para contenido, publicaciones, historias y lanzamientos, manteniendo coherencia entre lo digital y lo físico.",
    image: "assets/images/gallery-04.svg",
    alt: "Diseño para redes sociales Oh Studio"
  },
  senaletica: {
    kicker: "SEÑALÉTICA",
    title: "Guiar, anunciar y decorar también puede verse bonito.",
    text: "Creamos letreros, displays, pizarrones, anuncios y piezas de orientación que ayudan a que tu negocio se entienda y se vea más profesional.",
    image: "assets/images/gallery-05.svg",
    alt: "Señalética visual Oh Studio"
  },
  web: {
    kicker: "WEB",
    title: "Una primera impresión digital lista para compartir.",
    text: "Diseñamos páginas y estructuras visuales simples, claras y atractivas para que tu proyecto tenga una presencia más sólida desde el primer clic.",
    image: "assets/images/gallery-06.svg",
    alt: "Diseño web Oh Studio"
  }
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
  const email = document.querySelector("[data-contact-email]");
  const instagram = document.querySelector("[data-contact-instagram]");
  const location = document.querySelector("[data-contact-location]");

  if (phone) phone.textContent = CONTACT_INFO.phone;
  if (email) {
    email.textContent = `Correo: ${CONTACT_INFO.email}`;
    email.href = `mailto:${CONTACT_INFO.email}`;
  }
  if (instagram) instagram.textContent = `Instagram: ${CONTACT_INFO.instagram}`;
  if (location) location.textContent = `Ubicación: ${CONTACT_INFO.location}`;

  Object.entries(PACKAGE_PRICES).forEach(([key, value]) => {
    const price = document.querySelector(`[data-price="${key}"]`);
    if (price) price.innerHTML = `${value} <span>MXN</span>`;
  });

  const ecosystemButtons = document.querySelectorAll("[data-ecosystem]");
  const kicker = document.querySelector("[data-ecosystem-kicker]");
  const title = document.querySelector("[data-ecosystem-title]");
  const text = document.querySelector("[data-ecosystem-text]");
  const image = document.querySelector("[data-ecosystem-image]");

  ecosystemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = ECOSYSTEM_CONTENT[button.dataset.ecosystem];
      if (!content) return;

      ecosystemButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      if (kicker) kicker.textContent = content.kicker;
      if (title) title.textContent = content.title;
      if (text) text.textContent = content.text;
      if (image) {
        image.src = content.image;
        image.alt = content.alt;
      }
    });
  });
});
