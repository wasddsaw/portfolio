(() => {
    'use strict';

    const body = document.body;
    const header = document.querySelector('#site-header');
    const nav = document.querySelector('#site-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const setMenuState = (isOpen) => {
        nav?.classList.toggle('is-open', isOpen);
        menuToggle?.setAttribute('aria-expanded', String(isOpen));
        menuToggle?.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        body.classList.toggle('menu-open', isOpen && window.innerWidth <= 880);
    };

    menuToggle?.addEventListener('click', () => {
        setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
            setMenuState(false);
            menuToggle.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (menuToggle?.getAttribute('aria-expanded') === 'true' && !header?.contains(event.target)) {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 880) setMenuState(false);
    });

    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const setActiveSection = (id) => {
        navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
            },
            { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.35] }
        );

        sections.forEach((section) => sectionObserver.observe(section));

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        );

        document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    } else {
        document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
    }

    const year = document.querySelector('#current-year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
