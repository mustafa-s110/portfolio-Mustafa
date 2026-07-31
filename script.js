// ===== NAVBAR: HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== CONTACT FORM (UI ONLY - NO BACKEND) =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Thank you for reaching out! This is a UI demo — no message was actually sent.",
  );
  contactForm.reset();
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ===== PAGE LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 400);
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// ===== CURSOR GLOW (follows mouse) =====
// const cursorGlow = document.getElementById('cursorGlow');
// let mouseX = 0, mouseY = 0;
// let glowX = 0, glowY = 0;

// document.addEventListener('mousemove', (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
//   cursorGlow.style.opacity = '1';
// });

// document.addEventListener('mouseleave', () => {
//   cursorGlow.style.opacity = '0';
// });

// function animateGlow() {
//   glowX += (mouseX - glowX) * 0.1;
//   glowY += (mouseY - glowY) * 0.1;
//   cursorGlow.style.left = glowX + 'px';
//   cursorGlow.style.top = glowY + 'px';
//   requestAnimationFrame(animateGlow);
// }
// animateGlow();

// ===== CARD 3D TILT EFFECT =====
const tiltCards = document.querySelectorAll(".skill-card, .project-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ===== BUTTON RIPPLE EFFECT =====
const rippleButtons = document.querySelectorAll(".btn");

rippleButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    ripple.classList.add("ripple");
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== HERO SHAPES PARALLAX (mouse move) =====
const heroShapes = document.querySelectorAll(".shape");

document.querySelector(".hero")?.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  heroShapes.forEach((shape, index) => {
    const speed = (index + 1) * 15;
    shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// ===== STAGGERED GRID REVEAL (Skills & Projects) =====
const gridItems = document.querySelectorAll(".skill-card, .project-card");

const gridObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, i * 100);
        gridObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

gridItems.forEach((item) => gridObserver.observe(item));
