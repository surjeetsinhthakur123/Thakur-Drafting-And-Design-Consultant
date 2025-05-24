document.addEventListener('DOMContentLoaded', function () {
  // SheetDB Form Submission
  const form = document.getElementById('sheetdb-form');
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      fetch("https://sheetdb.io/api/v1/peigox0a11uit", {
        method: "POST",
        body: new FormData(form),
      }).then(response => {
        alert("Message saved!");
        form.reset();
      }).catch(() => {
        alert("There was an error sending the message.");
      });
    });
  }

  // Open service modal
  window.openServiceModal = function(serviceType) {
    const modalId = `${serviceType}-modal`;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }

  // Close service modal
  window.closeServiceModal = function() {
    document.querySelectorAll('.service-modal').forEach(modal => {
      modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('nav ul');
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('onclick')) return; // Skip if modal trigger
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (navMenu) navMenu.classList.remove('show'); // Close mobile menu
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form Submission (client-side validation + alert)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      alert(`Thank you, ${name}! Your message has been sent. We'll contact you soon.`);
      contactForm.reset();
    });
  }

  // Project Gallery Hover Animation
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const info = item.querySelector('.project-info');
      if (info) info.style.transform = 'translateY(0)';
    });
    item.addEventListener('mouseleave', () => {
      const info = item.querySelector('.project-info');
      if (info) info.style.transform = 'translateY(100%)';
    });
  });

  // Sticky Header Shadow on Scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    }
  });

  // Close modal when clicking outside modal content
  window.addEventListener('click', event => {
    if (event.target.classList.contains('service-modal')) {
      closeServiceModal();
    }
  });

  // Stats Counter Animation
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // The higher, the slower
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-count');
      const updateCount = () => {
        const current = +stat.innerText;
        const increment = Math.ceil(target / speed);
        if (current < target) {
          stat.innerText = current + increment;
          setTimeout(updateCount, 10);
        } else {
          stat.innerText = target;
        }
      };
      updateCount();
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // Footer Quick Links Smooth Scrolling
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced Get Quote button functionality
  document.querySelectorAll('.service-modal .btn[href="#contact"]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      closeServiceModal();
      
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Highlight the contact form
        const contactForm = contactSection.querySelector('form');
        if (contactForm) {
          contactForm.classList.add('highlight');
          setTimeout(() => {
            contactForm.classList.remove('highlight');
          }, 2000);
        }
        
        // Focus on the first input field
        const firstInput = contactSection.querySelector('input, textarea, select');
        if (firstInput) {
          setTimeout(() => {
            firstInput.focus();
          }, 1000); // Delay focus slightly to allow for scroll
        }
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  
  mobileBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  });
  
  overlay.addEventListener('click', function() {
    mobileMenu.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
  
  // Close menu when clicking on links
  const navLinks = document.querySelectorAll('.mobile-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('show');
      overlay.classList.remove('show');
      document.body.classList.remove('no-scroll');
    });
  });
});
