/* Incremental Software — site script */

/* ── Hash router ──────────────────────────────────────────── */
const PAGES = {
  '#/'         : 'page-home',
  '#/approach' : 'page-approach',
  '#/writing'  : 'page-writing',
  '#/contact'  : 'page-contact',
};

function getRoute() {
  const h = window.location.hash;
  return PAGES[h] ? h : '#/';
}

function showPage(route) {
  Object.values(PAGES).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', id === PAGES[route]);
  });

  // Update nav active states
  document.querySelectorAll('.nav-links a[data-route]').forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function navigate(route) {
  window.location.hash = route;
}

window.addEventListener('hashchange', () => showPage(getRoute()));
document.addEventListener('DOMContentLoaded', () => showPage(getRoute()));

/* ── Sticky nav scroll effect ─────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('site-nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
});

/* ── Mobile nav toggle ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on nav link click
  links.addEventListener('click', e => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
});

/* ── Writing filter ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const postRows   = document.querySelectorAll('.post-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag;
      postRows.forEach(row => {
        row.style.display = (tag === 'ALL' || row.dataset.tag === tag) ? '' : 'none';
      });
    });
  });
});

/* ── Contact form ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[data-required]').forEach(input => {
      const err = document.getElementById(input.id + '-error');
      let msg = '';
      if (!input.value.trim()) {
        msg = input.dataset.required;
        valid = false;
      } else if (input.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) {
        msg = "That doesn't look like a valid email.";
        valid = false;
      }
      if (err) err.textContent = msg;
    });

    if (valid) {
      document.getElementById('contact-form-wrap').hidden = true;
      document.getElementById('contact-success').hidden = false;
    }
  });
});

/* ── Delegated nav clicks ─────────────────────────────────── */
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-route]');
  if (!a) return;
  e.preventDefault();
  navigate(a.dataset.route);
});
