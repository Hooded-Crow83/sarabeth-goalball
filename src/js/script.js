/* =========================================================
   TEAM SARABETH — GOALBALL FUNDRAISER
   Vanilla JS only: mobile nav, smooth scroll, reveal-on-scroll,
   back-to-top. No frameworks, no external dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close the mobile menu after a nav link is chosen
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (primaryNav.classList.contains('is-open')) {
          primaryNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open menu');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape for keyboard users
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ---------- Smooth scroll for in-page anchor links ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length < 2) return; // ignore bare "#"
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      // Move focus for keyboard/screen-reader users
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Reveal-on-scroll animations ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // No IntersectionObserver support, or the visitor prefers reduced motion:
    // show everything immediately.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Back-to-top button ---------- */
  var backToTop = document.getElementById('backToTop');

  if (backToTop) {
    var toggleBackToTop = function () {
      if (window.scrollY > 600) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

});
