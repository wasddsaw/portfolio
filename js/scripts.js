(() => {
    'use strict';

    const root = document.documentElement;
    const body = document.body;
    const header = document.querySelector('#site-header');
    const nav = document.querySelector('#site-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const getStoredTheme = () => {
        try {
            return localStorage.getItem('portfolio-theme');
        } catch (error) {
            return null;
        }
    };

    const storeTheme = (theme) => {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (error) {
            // The selected theme still applies for this visit when storage is unavailable.
        }
    };

    const updateThemeControls = () => {
        const isDark = root.dataset.theme === 'dark';
        themeToggle?.setAttribute('aria-pressed', String(isDark));
        themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        themeToggle?.setAttribute('title', isDark ? 'Use light theme' : 'Use dark theme');
        themeColor?.setAttribute('content', isDark ? '#07111d' : '#f5f7fb');
    };

    updateThemeControls();

    themeToggle?.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = nextTheme;
        storeTheme(nextTheme);
        updateThemeControls();
    });

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    systemTheme.addEventListener?.('change', (event) => {
        if (!getStoredTheme()) {
            root.dataset.theme = event.matches ? 'dark' : 'light';
            updateThemeControls();
        }
    });

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
