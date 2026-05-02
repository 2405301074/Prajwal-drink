import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Sticky Navbar & Mobile Menu
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // 2. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Parallax Effect on Hero Image
  const heroImg = document.querySelector('.parallax');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const speed = heroImg.getAttribute('data-speed');
      heroImg.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  // 4. Shop 'Buy Now' Toast Notification
  const buyButtons = document.querySelectorAll('.buy-btn');
  const toast = document.getElementById('toast');

  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    });
  });

  // 5. Contact Form Submit Mock
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerText = 'Sending...';
      
      setTimeout(() => {
        btn.innerText = 'Message Sent! ⚡';
        btn.style.background = 'var(--color-neon-green)';
        btn.style.color = '#000';
        contactForm.reset();
        
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 4000);
      }, 1500);
    });
  }

  // 6. Mock Chatbot Toggle
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const closeChat = document.getElementById('closeChat');

  if (chatToggle && chatWindow && closeChat) {
    chatToggle.addEventListener('click', () => {
      // Toggle display
      if (chatWindow.style.display === 'flex') {
        chatWindow.classList.remove('active');
        setTimeout(() => chatWindow.style.display = 'none', 400); // match transition
      } else {
        chatWindow.style.display = 'flex';
        // slight delay to allow display:flex to apply before transition
        setTimeout(() => chatWindow.classList.add('active'), 10);
      }
    });

    closeChat.addEventListener('click', () => {
      chatWindow.classList.remove('active');
      setTimeout(() => chatWindow.style.display = 'none', 400);
    });
  }
});
