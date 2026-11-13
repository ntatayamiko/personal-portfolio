// Blockchain quotes displayed with the shared typing-and-erasing effect.
const phrases = [
  'I call the blockchain the “Internet of value” and the “Internet of trust.” Because everything becomes trustless. It’s a big distributed ledger. Think of it like an Excel file that’s being maintained and updated and managed by millions of computers around the world.',
  'Vitalik Buterin (Ethereum) on decentralization: “Whereas most technologies tend to automate workers on the periphery... blockchains automate away the center... and lets the taxi drivers work with the customer directly.”'
];

const typedElement = document.getElementById("typed-text");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typedElement) return;

  const current = phrases[phraseIndex];
  typedElement.textContent = current.substring(0, deleting ? charIndex - 1 : charIndex + 1);
  charIndex += deleting ? -1 : 1;

  if (!deleting && charIndex === current.length) {
    deleting = true;
    // Leave the complete quotation visible long enough to read.
    window.setTimeout(typeEffect, 4500);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  window.setTimeout(typeEffect, deleting ? 12 : 28);
}

if (typedElement) typeEffect();

// Apply a gentle floating motion to interactive controls and cards.
const floatingStyles = document.createElement("style");
floatingStyles.textContent = `
  @keyframes portfolio-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  .button, header nav a, .project-card, .demo-card, .high-card,
  .home-gallery, .message-box, .gallery-control {
    animation: portfolio-float 4s ease-in-out infinite;
  }
  .button:hover, header nav a:hover, .project-card:hover, .demo-card:hover,
  .high-card:hover, .home-gallery:hover, .message-box:hover, .gallery-control:hover {
    animation-play-state: paused;
  }
  .blockchain-quote {
    max-width: 900px;
    margin-top: 1.25rem;
    font-size: clamp(1rem, 2vw, 1.3rem);
  }
  .quote-label {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .animations-page #typed-text {
    display: inline-block;
    max-width: 100%;
    overflow-wrap: anywhere;
    line-height: 1.8;
  }
  @media (prefers-reduced-motion: reduce) {
    .button, header nav a, .project-card, .demo-card, .high-card,
    .home-gallery, .message-box, .gallery-control {
      animation: none;
    }
  }
`;
document.head.append(floatingStyles);

// Reveal elements when they enter the viewport; show them immediately in older browsers.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".skill-fill").forEach((fill) => {
        fill.style.width = `${fill.dataset.level}%`;
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Contact form: open WhatsApp with the visitor's message filled in.
const whatsappForm = document.getElementById("whatsapp-form");
if (whatsappForm) {
  whatsappForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("sender-name").value.trim();
    const message = document.getElementById("sender-message").value.trim();
    const text = `Hi Yamiko, I'm ${name}.\n\n${message}`;
    const url = `https://wa.me/265885552906?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  });
}
