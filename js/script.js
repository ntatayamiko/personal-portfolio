// Short original blockchain-themed lines for the typing effect.
const phrases = [
  "Blockchain makes trust verifiable, not invisible.",
  "Decentralization brings control closer to people.",
  "Smart contracts turn rules into code.",
  "Open networks let anyone verify the record."
];

const typedElement = document.getElementById("typed-text");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typedElement) return;

  const current = phrases[phraseIndex];

  if (!deleting) {
    typedElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 2200);
      return;
    }
  } else {
    typedElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeEffect, deleting ? 35 : 65);
}

if (typedElement) {
  typeEffect();
}

// Scroll reveal: add the "visible" class when an element enters the screen.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Fill skill bars inside a revealed block to their configured level.
        entry.target.querySelectorAll(".skill-fill").forEach((fill) => {
          fill.style.width = fill.dataset.level + "%";
        });

        observer.unobserve(entry.target);
      }
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
