// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form Submission
const contactForm = document.getElementById("contactForm");

// Add smooth scroll behavior
const smoothScroll = (target, duration) => {
  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

// Enhanced form validation
const validateForm = (form) => {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;
  
  // Remove existing error messages
  form.querySelectorAll('.error-message').forEach(msg => msg.remove());
  inputs.forEach(input => input.classList.remove('error'));

  inputs.forEach(input => {
    const value = input.value.trim();
    
    switch(input.type) {
      case 'email':
        if (!validateEmail(value)) {
          showError(input, 'Please enter a valid email address');
          isValid = false;
        }
        break;
        
      case 'tel':
        if (!validatePhone(value)) {
          showError(input, 'Please enter a valid phone number');
          isValid = false;
        }
        break;
        
      default:
        if (!value) {
          showError(input, 'This field is required');
          isValid = false;
        }
    }
  });

  return isValid;
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
  return /^[\d\s-+()]{10,}$/.test(phone);
};

// Update form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm(contactForm)) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>We'll contact you soon to schedule your repair.</p>
        `;
    contactForm.appendChild(successMessage);

    contactForm.reset();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Send Request";
  }
});

// Intersection Observer for Animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.1 }
);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Smooth reveal animations
const revealElements = document.querySelectorAll(
  ".service-card, .feature, .stat-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, index * 100); // Stagger the animations
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "50px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Improved mobile menu
const mobileMenu = () => {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  let isOpen = false;

  hamburger.addEventListener("click", () => {
    isOpen = !isOpen;
    navLinks.style.display = isOpen ? "flex" : "none";
    hamburger.classList.toggle("active");

    if (isOpen) {
      navLinks.style.animation = "slideDown 0.3s ease forwards";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (isOpen && !navbar.contains(e.target)) {
      isOpen = false;
      navLinks.style.display = "none";
      hamburger.classList.remove("active");
    }
  });
};

mobileMenu();

const showError = (input, message) => {
    input.classList.add('error');
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.setAttribute('role', 'alert');
    input.parentNode.appendChild(errorMessage);
};
