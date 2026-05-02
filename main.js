// ── Navbar scroll effect
const navbar   = document.getElementById('navbar');
const menuBtn  = document.getElementById('mobile-menu');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Parallax hero image
const heroImg = document.querySelector('.parallax');
if (heroImg) {
  window.addEventListener('scroll', () => {
    heroImg.style.transform = `translateY(${window.scrollY * +heroImg.dataset.speed}px)`;
  }, { passive: true });
}

// ── Cart toast
const toast = document.getElementById('toast');
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });
});

// ── Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerText;
    btn.innerText = 'Sending...';
    setTimeout(() => {
      btn.innerText = 'Message Sent! ⚡';
      btn.style.background = 'var(--color-neon-green)';
      btn.style.color = '#000';
      contactForm.reset();
      setTimeout(() => {
        btn.innerText = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 4000);
    }, 1500);
  });
}

// ── Chatbase floating widget
// Lazy-load the iframe src only when opened for the first time
const chatFab   = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const iframe    = document.getElementById('chatbaseIframe');
let iframeLoaded = false;

function openChat() {
  // Lazy load iframe
  if (!iframeLoaded) {
    iframe.src = iframe.dataset.src;
    iframeLoaded = true;
  }
  chatPanel.classList.add('open');
  chatPanel.setAttribute('aria-hidden', 'false');
  chatFab.setAttribute('aria-label', 'Close Support Chat');
}

function closeChat() {
  chatPanel.classList.remove('open');
  chatPanel.setAttribute('aria-hidden', 'true');
  chatFab.setAttribute('aria-label', 'Open Support Chat');
}

chatFab.addEventListener('click', () => {
  chatPanel.classList.contains('open') ? closeChat() : openChat();
});

chatClose.addEventListener('click', closeChat);

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && chatPanel.classList.contains('open')) closeChat();
});
