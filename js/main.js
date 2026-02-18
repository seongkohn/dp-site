/* =============================================
   DIGITAL PATHOLOGY SERVICE — MAIN JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const safeStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (_err) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (_err) {
        // Ignore when storage is disabled by browser privacy settings.
      }
    }
  };

  /* ---- Mobile Menu ---- */
  const toggle   = document.getElementById('menuToggle');
  const drawer   = document.getElementById('mobileDrawer');
  const backdrop = drawer?.querySelector('.drawer-backdrop');
  const closeBtn = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('is-open');
    toggle.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    toggle.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', () => {
    drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Close on drawer nav link click
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ---- Popup notice dismiss ---- */
  const popupNotice = document.getElementById('popupNotice');
  const dismissPopupNotice = () => {
    popupNotice?.classList.add('hidden');
    safeStorage.set('popupNoticeDismissed', '1');
  };

  if (safeStorage.get('popupNoticeDismissed') === '1') {
    popupNotice?.classList.add('hidden');
  }
  const popupNoticeCloseBtn = document.getElementById('popupNoticeClose');
  ['click', 'touchend'].forEach(evt => {
    popupNoticeCloseBtn?.addEventListener(evt, (e) => {
      e.preventDefault();
      dismissPopupNotice();
    }, { passive: false });
  });

  /* ---- Scroll-to-top button ---- */
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn?.classList.add('visible');
    } else {
      scrollBtn?.classList.remove('visible');
    }
  }, { passive: true });
  scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Animate sections on scroll ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.service-card, .feature-card, .step-card, .greeting-stat').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });

  /* ---- Active nav highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.site-nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--brand-purple)' : '';
          link.style.background = link.getAttribute('href') === `#${id}`
            ? 'var(--brand-pale)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
});
