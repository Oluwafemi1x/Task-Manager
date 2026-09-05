document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.portrait-label')?.remove();

  // Make the role immediately clear to recruiters without changing the visual system.
  const heroIntro = document.querySelector('.hero-bottom p');
  if (heroIntro) {
    heroIntro.innerHTML = '<strong>Python Backend &amp; Automation Developer.</strong> I build dependable APIs, browser automations, database-backed systems, and practical business software from idea to deployment.';
  }

  const projectList = document.querySelector('.project-list');
  const taskManager = [...document.querySelectorAll('.project')].find((project) =>
    project.querySelector('h3')?.textContent.trim() === 'Task Manager'
  );

  if (projectList && taskManager && !document.querySelector('[data-project="marginguard"]')) {
    const marginGuard = document.createElement('article');
    marginGuard.className = 'project project--blue reveal';
    marginGuard.dataset.category = 'python';
    marginGuard.dataset.project = 'marginguard';
    marginGuard.innerHTML = `
      <div class="project-visual project-shot-frame">
        <iframe src="https://marginguard-automation.onrender.com" title="Live MarginGuard automation dashboard" loading="lazy" style="display:block;width:100%;height:460px;border:1px solid rgba(255,255,255,.16);border-radius:14px;background:#fff;box-shadow:0 24px 58px rgba(0,0,0,.42);" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <span class="visual-index">07</span>
      </div>
      <div class="project-copy">
        <div class="project-meta"><span>Competitive intelligence automation</span><span>Live</span></div>
        <h3>MarginGuard</h3>
        <p>A production-deployed competitive intelligence system that turns browser-collected pricing and stock signals into evidence-backed commercial decisions and downloadable reports.</p>
        <p class="engineering-proof"><strong>Engineering:</strong> Playwright browser workers → structured extraction → pricing/risk engine → screenshot evidence → SQLite history → CSV/Excel reporting.</p>
        <ul class="tag-list" aria-label="Technologies"><li>Python</li><li>FastAPI</li><li>Playwright</li><li>SQLite</li><li>Excel</li></ul>
        <div class="link-row">
          <a class="text-link" href="https://marginguard-automation.onrender.com" target="_blank" rel="noopener noreferrer">Open live site <span>↗</span></a>
          <a class="text-link" href="https://github.com/Oluwafemi1x/marginguard-automation" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>
          <a class="text-link" href="https://marginguard-automation.onrender.com/docs" target="_blank" rel="noopener noreferrer">API docs <span>↗</span></a>
        </div>
      </div>`;
    projectList.insertBefore(marginGuard, taskManager);
  }

  const enhanceProject = (name, proof) => {
    const project = [...document.querySelectorAll('.project')].find((item) =>
      item.querySelector('h3')?.textContent.replace(/\s+/g, ' ').trim().includes(name)
    );
    if (!project || project.querySelector('.engineering-proof')) return;
    const description = project.querySelector('.project-copy > p');
    if (!description) return;
    const line = document.createElement('p');
    line.className = 'engineering-proof';
    line.innerHTML = `<strong>Engineering:</strong> ${proof}`;
    description.insertAdjacentElement('afterend', line);
  };

  enhanceProject('FESOMI School', 'modular Python/Tkinter workflows → SQLite persistence → role-based access → audit/security controls → reporting, exports and Windows packaging.');
  enhanceProject('OpsPilot', 'FastAPI REST layer → JWT/RBAC dependencies → SQLAlchemy tenant-aware data model → PostgreSQL → Alembic migrations → Pytest/CI → Render deployment.');

  const featuredProjectFact = [...document.querySelectorAll('.fact-grid div')].find((item) =>
    item.querySelector('span')?.textContent.trim() === 'Featured projects'
  );
  if (featuredProjectFact?.querySelector('strong')) {
    featuredProjectFact.querySelector('strong').textContent = '07';
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projects = [...document.querySelectorAll('.project')];
  const emptyProjects = document.querySelector('.empty-projects');
  const year = document.getElementById('year');

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !willOpen;
    document.body.classList.toggle('menu-open', willOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      let visibleCount = 0;
      projects.forEach((project) => {
        const visible = filter === 'all' || project.dataset.category === filter;
        project.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (emptyProjects) emptyProjects.hidden = visibleCount !== 0;
    });
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  if (year) year.textContent = String(new Date().getFullYear());
});
