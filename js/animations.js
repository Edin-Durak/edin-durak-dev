// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Page Load Animation
window.addEventListener("load", () => {
  // Hide loader
  const loader = document.querySelector(".loader");
  loader.style.display = "none";

  // Initial hero animation
  gsap.from("#hero h1", {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: "power4.out",
  });

  gsap.from("#hero p", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    delay: 0.2,
  });

  gsap.from("#hero .btn", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    delay: 0.4,
  });

  gsap.from("#hero .hero-main-image", {
    duration: 1.2,
    x: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.6,
  });

  // Initialize scroll-based animations
  initScrollAnimations();
});

function initScrollAnimations() {
  // Skill Cards Animation
  const skillCards = gsap.utils.toArray(".skill-card");
  skillCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        once: true,
        start: "top bottom-=100",
        end: "top center",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.2,
      onComplete: () => {
        gsap.set(card, { clearProps: "transform" });
      },
    });
  });

  // Service Cards Animation
  const serviceCards = gsap.utils.toArray(".service-card");
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        once: true,
        start: "top bottom-=100",
        end: "top center",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      onComplete: () => {
        gsap.set(card, { clearProps: "transform" });
      },
    });
  });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    if (href === "#") return;

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Close mobile nav when clicking links
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 992) {
      // Bootstrap's lg breakpoint
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768) {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
