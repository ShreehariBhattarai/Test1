// ==========================================================================
// shreehari.bi — shared site behavior
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initBackToTop();
  initStatCounters();
  initActiveNavLink();
  initSmoothAnchors();
  initTraceSignature();
});

/* Hero signature: cumulatively "trace" a figure back to its source system.
   Ties the auditor background to the Fabric/Power BI work directly. */
function initTraceSignature() {
  const steps = document.querySelectorAll('.trace-step');
  if (!steps.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    steps.forEach(s => s.classList.add('lit'));
    return;
  }

  let i = 0;
  function tick() {
    steps.forEach((s, idx) => s.classList.toggle('lit', idx <= i));
    i++;
    if (i > steps.length) {
      i = 0;
      setTimeout(tick, 1400); // pause on full trace, then restart
    } else {
      setTimeout(tick, 650);
    }
  }
  tick();
}

/* Mobile nav toggle */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* Reveal elements as they scroll into view */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(t => observer.observe(t));
}

/* Back-to-top button */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Animated stat counters */
function initStatCounters() {
  const cards = document.querySelectorAll('.stat-number[data-count], .ledger-number[data-count]');
  if (!cards.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(c => observer.observe(c));
}

/* Highlight current page in nav */
function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* Smooth-scroll for in-page anchors */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
