// Page loader animation and reveal effects
const pageLoader = document.getElementById('pageLoader');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const revealElements = document.querySelectorAll('.reveal-card, .skill-item');

window.addEventListener('load', () => {
  setTimeout(() => {
    pageLoader.classList.add('hidden');
    pageLoader.style.display = 'none';
  }, 800);
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${scrollFraction}%`;

  if (scrollTop > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  }
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Active nav link tracking
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
});

// Intersection Observer for reveal animations with improved timing
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Typing animation for hero introduction
const heroPhrases = [
  'Software Tester',
  'Manual & Automation Expert',
  'Quality Assurance Specialist',
];
let phraseIndex = 0;
let charIndex = 0;
const heroTitle = document.querySelector('.hero-copy h1');
const originalHeroText = heroTitle.textContent;
heroTitle.textContent = '';

function typeHeroText() {
  const currentPhrase = heroPhrases[phraseIndex];
  if (charIndex < currentPhrase.length) {
    heroTitle.textContent += currentPhrase.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeHeroText, 80);
  } else {
    setTimeout(() => {
      deleteHeroText();
    }, 1500);
  }
}

function deleteHeroText() {
  if (charIndex > 0) {
    heroTitle.textContent = heroTitle.textContent.slice(0, -1);
    charIndex -= 1;
    setTimeout(deleteHeroText, 40);
  } else {
    phraseIndex = (phraseIndex + 1) % heroPhrases.length;
    setTimeout(typeHeroText, 400);
  }
}

typeHeroText();

// Contact form placeholder handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  alert(`Thank you, ${name}! Your message has been noted for demo purposes.`);
  contactForm.reset();
});

// Simple interactive background parallax effect
const heroSection = document.querySelector('.hero-section');
heroSection.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  heroSection.style.backgroundPosition = `${x}% ${y}%`;
});

heroSection.addEventListener('mouseleave', () => {
  heroSection.style.backgroundPosition = 'center center';
});

// Navbar active state on scroll
sections = document.querySelectorAll('section');
navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
});
