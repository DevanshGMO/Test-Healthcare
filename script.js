// DOM Elements
const mobileToggle = document.getElementById("mobileToggle");
const mobileNav = document.getElementById("mobileNav");

// Mobile Menu Toggle
mobileToggle.addEventListener("click", function () {
  this.classList.toggle("active");
  mobileNav.classList.toggle("active");

  // Add slide animation
  if (mobileNav.classList.contains("active")) {
    mobileNav.classList.add("slide-down");
  }
});

// Mobile Dropdown Toggle
document.querySelectorAll(".mobile-dropdown .mobile-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const dropdown = this.parentElement;
    dropdown.classList.toggle("active");
  });
});

// Hero Carousel
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".carousel-prev");
    this.nextBtn = document.querySelector(".carousel-next");
    this.currentSlide = 0;
    this.slideInterval = null;

    this.init();
  }

  init() {
    // Add event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Start auto-play
    this.startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector(".hero-carousel");
    carousel.addEventListener("mouseenter", () => this.stopAutoPlay());
    carousel.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  goToSlide(slideIndex) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove("active");
    this.dots[this.currentSlide].classList.remove("active");

    // Update current slide
    this.currentSlide = slideIndex;

    // Add active class to new slide and dot
    this.slides[this.currentSlide].classList.add("active");
    this.dots[this.currentSlide].classList.add("active");
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoPlay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}

// Partners Slider
class PartnersSlider {
  constructor() {
    this.slider = document.querySelector(".partners-slider");
    this.logos = document.querySelectorAll(".partner-logo");
    this.init();
  }

  init() {
    // Clone logos for infinite scroll effect
    this.logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      this.slider.appendChild(clone);
    });

    // Add animation
    this.slider.style.animation = "scroll 20s linear infinite";

    // Pause on hover
    this.slider.addEventListener("mouseenter", () => {
      this.slider.style.animationPlayState = "paused";
    });

    this.slider.addEventListener("mouseleave", () => {
      this.slider.style.animationPlayState = "running";
    });
  }
}

// Statistics Counter Animation
class StatsCounter {
  constructor() {
    this.stats = document.querySelectorAll(".stat-number");
    this.observer = null;
    this.init();
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all stat numbers
    this.stats.forEach((stat) => {
      this.observer.observe(stat);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ""));
    const suffix = element.textContent.replace(/[\d,]/g, "");
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, stepTime);
  }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".main-header");

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    lastScrollY = currentScrollY;
  });
}

// Button Interactions
function initButtonInteractions() {
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .book-test-btn, .card-btn, .product-btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonText = this.textContent.trim();

      // Prevent default for demo
      e.preventDefault();

      // Add ripple effect
      createRipple(e, this);

      // Show appropriate message
      let message = "";
      if (buttonText.includes("Book")) {
        message = "Opening booking system...";
      } else if (buttonText.includes("Test")) {
        message = "Loading test information...";
      } else if (buttonText.includes("Request")) {
        message = "Processing your request...";
      } else if (buttonText.includes("Registration")) {
        message = "Opening registration form...";
      } else if (buttonText.includes("Appointment")) {
        message = "Scheduling appointment...";
      } else if (buttonText.includes("Explore")) {
        message = "Loading more details...";
      }

      if (message) {
        showNotification(message);
      }
    });
  });
}

// Ripple Effect for Buttons
function createRipple(event, element) {
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  Object.assign(ripple.style, {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transform: "scale(0)",
    animation: "ripple 0.6s linear",
    left: x + "px",
    top: y + "px",
    width: size + "px",
    height: size + "px",
    pointerEvents: "none",
  });

  // Add ripple animation
  if (!document.querySelector("#ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 20px",
    borderRadius: "6px",
    color: "white",
    fontWeight: "500",
    zIndex: "9999",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    backgroundColor: type === "success" ? "#10b981" : "#0891b2",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Close mobile menu when clicking outside
function initOutsideClick() {
  document.addEventListener("click", function (e) {
    if (
      mobileNav.classList.contains("active") &&
      !mobileNav.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      mobileNav.classList.remove("active");
      mobileToggle.classList.remove("active");
    }
  });
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

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

  images.forEach((img) => imageObserver.observe(img));
}

// Performance optimization - throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Research Cards Slider
class ResearchCardsSlider {
  constructor() {
    this.cards = document.querySelectorAll(".research-card");
    this.dots = document.querySelectorAll(".research-dot");
    this.currentSlide = 0;
    this.init();
  }

  init() {
    if (this.dots.length === 0) return;

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Auto-slide every 6 seconds
    setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  goToSlide(slideIndex) {
    this.dots[this.currentSlide].classList.remove("active");
    this.currentSlide = slideIndex;
    this.dots[this.currentSlide].classList.add("active");
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.dots.length;
    this.goToSlide(nextIndex);
  }
}

// Appointment Form Handler
class AppointmentForm {
  constructor() {
    this.form = document.getElementById("appointmentForm");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Set minimum date to today
    const dateInput = this.form.querySelector('input[name="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Collect checkbox values
    const checkboxes = this.form.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const specialAccess = Array.from(checkboxes).map((cb) => cb.name);

    // Simulate form submission
    this.showLoadingState();

    setTimeout(() => {
      this.showSuccessMessage(data);
      this.resetForm();
    }, 2000);
  }

  showLoadingState() {
    const submitBtn = this.form.querySelector(".book-visit-btn");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Booking Your Visit...';
    submitBtn.disabled = true;

    // Reset after 2 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }

  showSuccessMessage(data) {
    const message = `Appointment request submitted successfully! We'll contact you at ${data.email} to confirm your ${data.service} appointment.`;
    showNotification(message, "success");
  }

  resetForm() {
    this.form.reset();
  }
}

// Excellence Section Animations
function initExcellenceAnimations() {
  const excellenceItems = document.querySelectorAll(".excellence-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  excellenceItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "all 0.6s ease";
    observer.observe(item);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  new HeroCarousel();
  new PartnersSlider();
  new StatsCounter();
  new ResearchCardsSlider();
  new AppointmentForm();

  // Initialize other features
  initSmoothScroll();
  initHeaderScroll();
  initButtonInteractions();
  initOutsideClick();
  initLazyLoading();
  initExcellenceAnimations();

  console.log("abaris website initialized successfully! 🧪");
});

// Handle window resize
window.addEventListener(
  "resize",
  throttle(function () {
    // Handle any resize-specific logic here
  }, 250)
);
