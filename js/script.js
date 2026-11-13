// Phrases the typing effect cycles through
const phrases = [
  "an IT enthusiast.",
  "a future software engineer.",
  "a web developer.",
  "a computer science student."
];

const typedElement = document.getElementById("typed-text");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    // Add one character at a time
    typedElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      // Pause at the full word, then start deleting
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    // Remove one character at a time
    typedElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Move to the next phrase
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 120);
}

if (typedElement) {
  typeEffect();
}

// Scroll reveal: add the "visible" class when an element enters the screen
const revealElements = document.querySelectorAll(".reveal");
const skillFills = document.querySelectorAll(".skill-fill");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Fill any skill bars inside this block to their set level
      entry.target.querySelectorAll(".skill-fill").forEach((fill) => {
        fill.style.width = fill.dataset.level + "%";
      });

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach((el) => observer.observe(el));

// Contact form: open WhatsApp with the visitor's message filled in
const whatsappForm = document.getElementById("whatsapp-form");

if (whatsappForm) {
  whatsappForm.addEventListener("submit", (event) => {
    // Stop the page from reloading
    event.preventDefault();

    const name = document.getElementById("sender-name").value.trim();
    const message = document.getElementById("sender-message").value.trim();

    // Combine the name and message into one text string
    const text = `Hi Yamiko, I'm ${name}.\n\n${message}`;

    // encodeURIComponent makes spaces and line breaks safe inside a URL
    const url = `https://wa.me/265885552906?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener");
  });
}