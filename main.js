/* ══════════════════════════════════════════════════════════
   main.js — Fisioterapeuta
   1. Menú hamburguesa
   2. Animaciones fade-up (scroll)
   3. Formulario de contacto
   4. Videos autoplay + fade-in
══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MENÚ HAMBURGUESA ─────────────────────────────── */
  const menuBtn  = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  /* ── 2. ANIMACIONES SCROLL (fade-up) ─────────────────── */
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      fadeObserver.observe(el);
    }
  });


  /* ── 3. FORMULARIO ───────────────────────────────────── */
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.textContent = '✓ Mensaje enviado';
      submitBtn.style.background = '#1a8c6a';
      submitBtn.disabled = true;

      // Reset después de unos segundos
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
        submitBtn.style.background = '';
        form.reset();
      }, 4000);
    });
  }


  /* ── 4. VIDEOS AUTOPLAY + FADE ───────────────────────── */

  const videos = document.querySelectorAll('.video-wrapper video');

  videos.forEach(video => {

    // Fade-in cuando carga
    video.addEventListener('loadeddata', () => {
      video.classList.add('loaded');
    });

    // Asegurar autoplay en móviles
    video.muted = true;
    video.play().catch(() => {
      // Algunos navegadores bloquean autoplay hasta interacción
    });

  });

});