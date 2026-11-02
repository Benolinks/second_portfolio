
    // Theme toggle with preference persistence
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const pref = localStorage.getItem('theme');
    if (pref) root.classList.toggle('light', pref === 'light');
    toggle.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

    // Animate skill meters
    function animateMeters() {
      document.querySelectorAll('.skill').forEach(card => {
        const pct = card.getAttribute('data-skill');
        const bar = card.querySelector('.meter > i');
        requestAnimationFrame(() => bar.style.width = pct + '%');
        card.title = pct + '%';
      });
    }
    animateMeters();

    // Contact form
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    const contactEmail = 'benolinks1@gmail.com';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      if (!name || !email || !message) {
        statusEl.textContent = 'Please fill out all fields.';
        return;
      }

      const subject = `Portfolio contact from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      statusEl.textContent = 'Your email app should open with the message ready. Review and send it there.';
      window.location.href = mailto;
    });

    // Copy email helper
    document.getElementById('copyEmail').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(contactEmail);
        statusEl.textContent = 'Email address copied to clipboard!';
      } catch(err) {
        statusEl.textContent = 'Unable to copy. Use: ' + contactEmail;
      }
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();
