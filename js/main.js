// Helper function to convert Vimeo URL to embed URL
function getVimeoEmbedUrl(url) {
  const match = url.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}?h=${match[2]}`;
  }
  return url;
}

// Update the openVideoModal function
function openVideoModal(videoUrl) {
  // Check if project modal is open and close it first
  if (projectModal.classList.contains("show")) {
    projectModalInstance.hide();
    setTimeout(() => {
      const embedUrl = getVimeoEmbedUrl(videoUrl);
      document.querySelector("#videoModal iframe").src = embedUrl;
      videoModalInstance.show();
    }, 300); // Wait for project modal to close
  } else {
    const embedUrl = getVimeoEmbedUrl(videoUrl);
    document.querySelector("#videoModal iframe").src = embedUrl;
    videoModalInstance.show();
  }
}

// Project Modal Handler
const projectModal = document.getElementById("projectModal");
const videoModal = document.getElementById("videoModal");
let projectModalInstance, videoModalInstance;

if (projectModal && videoModal) {
  projectModalInstance = new bootstrap.Modal(projectModal);
  videoModalInstance = new bootstrap.Modal(videoModal);

  // Clean up video when modal is closed
  videoModal.addEventListener("hidden.bs.modal", function () {
    const iframe = videoModal.querySelector("iframe");
    if (iframe) {
      iframe.src = "";
    }
  });
}

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the testimonial carousel
  const testimonialCarousel = new bootstrap.Carousel(
    document.getElementById("testimonialCarousel"),
    {
      interval: 5000, // Change slides every 5 seconds
      wrap: true,
      touch: true,
    }
  );

  // Add smooth transition effect for testimonials
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // Project filtering
  const filterButtons = document.querySelectorAll(".btn-filter");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
          // Add animation
          gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.4,
          });
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Add click handlers for watch demo buttons on project cards
  document.querySelectorAll(".watch-demo").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent project card click
      const projectCard = button.closest(".project-card");
      const videoUrl = projectCard.dataset.projectVimeo;
      if (videoUrl) {
        openVideoModal(videoUrl);
      }
    });
  });

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const viewButton = card.querySelector(".view-project");

    viewButton.addEventListener("click", () => {
      const data = card.dataset;

      // Update modal content
      const modal = document.getElementById("projectModal");
      modal.querySelector(".modal-title").textContent = data.projectTitle;
      modal.querySelector(".modal-project-role").textContent = data.projectRole;
      modal.querySelector(".modal-project-description").textContent =
        data.projectDescription;

      // Update tasks list
      const tasks = data.projectTasks.split(",");
      const tasksList = modal.querySelector(".modal-project-tasks");
      tasksList.innerHTML = tasks
        .map((task) => `<li>${task.trim()}</li>`)
        .join("");

      // Update tech tags
      const techTags = data.projectTech.split(",");
      const techContainer = modal.querySelector(".modal-project-tech");
      techContainer.innerHTML = techTags
        .map(
          (tech) => `<span class="badge bg-primary me-2">${tech.trim()}</span>`
        )
        .join("");

      // Update links
      const linksContainer = modal.querySelector(".modal-project-links");
      let linksHTML = "";

      // Add Demo link if exists
      if (data.projectDemo) {
        linksHTML += `
                    <a href="${data.projectDemo}" class="btn btn-primary me-2" target="_blank">
                        <i class="fas fa-link"></i> Live Demo
                    </a>`;
      }

      // Add Vimeo button if video exists
      if (data.projectVimeo) {
        linksHTML += `
                    <button class="btn btn-primary me-2" onclick="openVideoModal('${data.projectVimeo}')">
                        <i class="fas fa-play-circle"></i> Watch Demo
                    </button>`;
      }

      // Add GitHub link if exists
      if (data.projectGithub) {
        linksHTML += `
                    <a href="${data.projectGithub}" class="btn btn-dark" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>`;
      }

      linksContainer.innerHTML = linksHTML;

      // Show modal
      if (projectModalInstance) {
        projectModalInstance.show();
      }
    });
  });

  const lazyImages = document.querySelectorAll("img.lazy");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // Add this inside your DOMContentLoaded event listener
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function setActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Add scroll event listener
  window.addEventListener("scroll", setActiveLink);
  // Call once on load
  setActiveLink();
});
