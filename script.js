/**
 * Ashika S. - Personal Portfolio Script
 * Modern, Responsive, Accessible
 * Features:
 *  - Theme switching with persistence
 *  - Mobile navigation drawer
 *  - Scroll-spy section tracking
 *  - Clipboard copy with feedback
 *  - SplitFlapText mechanical departure board (React Bits)
 *  - AccordionGallery with GSAP 3D/parallax (React Bits)
 *  - Certificate photo lightbox modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Mode with System Preference & Storage)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('ashika-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  function setTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggleBtn?.setAttribute('aria-label', 'Switch to light mode');
      localStorage.setItem('ashika-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      themeToggleBtn?.setAttribute('aria-label', 'Switch to dark mode');
      localStorage.setItem('ashika-theme', 'light');
    }
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('ashika-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // -------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // -------------------------------------------------------------------------
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    menuToggleBtn?.setAttribute('aria-expanded', 'true');
    menuToggleBtn?.setAttribute('aria-label', 'Close mobile navigation menu');
    if (mobileNav) mobileNav.removeAttribute('hidden');
  }

  function closeMenu() {
    menuToggleBtn?.setAttribute('aria-expanded', 'false');
    menuToggleBtn?.setAttribute('aria-label', 'Open mobile navigation menu');
    if (mobileNav) mobileNav.setAttribute('hidden', '');
  }

  menuToggleBtn?.addEventListener('click', () => {
    const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) closeMenu();
    else openMenu();
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggleBtn?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggleBtn.focus();
    }
  });

  // -------------------------------------------------------------------------
  // 3. Active Nav Link on Scroll (Intersection Observer)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          desktopNavLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // -------------------------------------------------------------------------
  // 4. Copy Email Address to Clipboard
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('email-link');

  if (copyEmailBtn && emailLink) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(emailText);
        const originalText = copyEmailBtn.querySelector('.copy-text');
        copyEmailBtn.classList.add('copied');
        if (originalText) originalText.textContent = 'Copied!';
        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          if (originalText) originalText.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. Dynamic Current Year in Footer
  // -------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 6. SplitFlapText Component (React Bits) Departure Board
  // -------------------------------------------------------------------------
  const splitFlapRoot = document.getElementById('certificates-split-flap');
  if (splitFlapRoot) {
    initSplitFlapText(splitFlapRoot, {
      words: [
        'VERIFIED CERTS',
        'APPLIED AI & ML',
        'DATA ANALYTICS',
        'OOP IN C++',
        'RESUME AI ENGINE'
      ],
      flipDuration: 0.12,
      stagger: 0.05,
      cycleDelay: 2500,
      charset: 'alphanumeric',
      flipsPerChar: 6,
      tileColor: '#0f172a',
      textColor: '#38bdf8',
      fontSize: 28,
      gap: 5,
      tileRadius: 6,
      padTo: 16,
      align: 'center',
      loop: true,
      intro: true,
      order: 'left',
      depth: 0.5
    });
  }

  function initSplitFlapText(container, options = {}) {
    const DEFAULT_WORDS = ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'];
    const words = Array.isArray(options.words) && options.words.length ? options.words : DEFAULT_WORDS;
    const flipDuration = options.flipDuration || 0.12;
    const stagger = options.stagger || 0.05;
    const cycleDelay = options.cycleDelay || 2500;
    const flipsPerChar = options.flipsPerChar || 6;
    const padTo = options.padTo || 16;
    const align = options.align || 'center';
    const loop = options.loop !== false;
    const depth = options.depth || 0.5;

    const longest = words.reduce((max, w) => Math.max(max, w.length), 1);
    const width = Math.max(1, padTo, longest);

    const normalize = (phrase) => {
      const safe = String(phrase ?? '').slice(0, width);
      if (align === 'right') return safe.padStart(width, ' ');
      if (align === 'center') {
        const leftPad = safe.length + Math.floor((width - safe.length) / 2);
        return safe.padStart(leftPad, ' ').padEnd(width, ' ');
      }
      return safe.padEnd(width, ' ');
    };

    const normalizedWords = words.map(normalize);
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 &+';
    const sampleChar = () => charset.charAt(Math.floor(Math.random() * charset.length));
    const toGlyph = (ch) => (ch === ' ' ? '\u00a0' : ch);

    // Apply CSS variables
    container.style.setProperty('--split-flap-tile-color', options.tileColor || '#0f172a');
    container.style.setProperty('--split-flap-text-color', options.textColor || '#38bdf8');
    container.style.setProperty('--split-flap-radius', `${options.tileRadius || 6}px`);
    container.style.setProperty('--split-flap-gap', `${options.gap || 5}px`);
    container.style.setProperty('--split-flap-font-size', `${options.fontSize || 28}px`);
    container.style.setProperty('--split-flap-flip-duration', `${flipDuration}s`);
    container.style.setProperty('--split-flap-lift', `${0.4 + 0.6 * depth}`);
    container.style.setProperty('--split-flap-drop', `${0.28 * depth}`);

    // Build DOM tiles
    container.innerHTML = '';
    const tileElements = [];

    for (let i = 0; i < width; i++) {
      const tile = document.createElement('span');
      tile.className = 'split-flap-text__tile';

      const topHalf = document.createElement('span');
      topHalf.className = 'split-flap-text__half split-flap-text__half--top';
      const topChar = document.createElement('span');
      topChar.className = 'split-flap-text__char';
      topChar.textContent = '\u00a0';
      topHalf.appendChild(topChar);

      const botHalf = document.createElement('span');
      botHalf.className = 'split-flap-text__half split-flap-text__half--bottom';
      const botChar = document.createElement('span');
      botChar.className = 'split-flap-text__char';
      botChar.textContent = '\u00a0';
      botHalf.appendChild(botChar);

      tile.appendChild(topHalf);
      tile.appendChild(botHalf);
      container.appendChild(tile);

      tileElements.push({ tile, topChar, botChar, current: ' ' });
    }

    let currentIndex = 0;
    const flipMs = flipDuration * 1000;
    const staggerMs = stagger * 1000;

    function flipTileTo(tileObj, targetChar, delayMs) {
      setTimeout(() => {
        if (tileObj.current === targetChar) return;

        const seq = [];
        for (let k = 0; k < flipsPerChar; k++) seq.push(sampleChar());
        seq.push(targetChar);

        let step = 0;
        function doNextStep() {
          if (step >= seq.length) {
            tileObj.current = targetChar;
            tileObj.topChar.textContent = toGlyph(targetChar);
            tileObj.botChar.textContent = toGlyph(targetChar);
            tileObj.tile.classList.remove('is-flipping');
            return;
          }

          const fromChar = step === 0 ? tileObj.current : seq[step - 1];
          const nextChar = seq[step];

          tileObj.tile.classList.add('is-flipping');

          // Clean up old flaps
          tileObj.tile.querySelectorAll('.split-flap-text__flap').forEach((f) => f.remove());

          const flapFront = document.createElement('span');
          flapFront.className = 'split-flap-text__flap split-flap-text__flap--front';
          const frontChar = document.createElement('span');
          frontChar.className = 'split-flap-text__char';
          frontChar.textContent = toGlyph(fromChar);
          flapFront.appendChild(frontChar);

          const flapBack = document.createElement('span');
          flapBack.className = 'split-flap-text__flap split-flap-text__flap--back';
          const backChar = document.createElement('span');
          backChar.className = 'split-flap-text__char';
          backChar.textContent = toGlyph(nextChar);
          flapBack.appendChild(backChar);

          tileObj.tile.appendChild(flapFront);
          tileObj.tile.appendChild(flapBack);

          tileObj.topChar.textContent = toGlyph(nextChar);
          tileObj.botChar.textContent = toGlyph(fromChar);

          step++;
          setTimeout(doNextStep, flipMs);
        }

        doNextStep();
      }, delayMs);
    }

    function transitionTo(phrase) {
      const targetStr = phrase;
      for (let i = 0; i < width; i++) {
        const targetChar = targetStr[i] || ' ';
        const delay = i * staggerMs;
        flipTileTo(tileElements[i], targetChar, delay);
      }
    }

    // Start initial flip
    transitionTo(normalizedWords[0]);

    if (normalizedWords.length > 1) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % normalizedWords.length;
        transitionTo(normalizedWords[currentIndex]);
      }, cycleDelay + (width * staggerMs) + (flipsPerChar * flipMs));
    }
  }

  // -------------------------------------------------------------------------
  // 7. AccordionGallery Component (React Bits) with GSAP
  // -------------------------------------------------------------------------
  const galleryContainer = document.getElementById('certificate-accordion-gallery');
  if (galleryContainer) {
    initAccordionGallery(galleryContainer, {
      items: [
        { 
          image: 'images/cert_python_coursera.png', 
          label: 'Python for Everybody — Univ. of Michigan', 
          link: '#cert-1' 
        },
        { 
          image: 'images/cert_applied_ai_cii.png', 
          label: 'Applied AI & ML — CII / HP Centre for AI', 
          link: '#cert-2' 
        },
        { 
          image: 'images/cert_genai_tata.png', 
          label: 'GenAI Data Analytics Simulation — Tata', 
          link: '#cert-3' 
        },
        { 
          image: 'images/cert_resume_ai_forage.png', 
          label: 'AI Resume Writing Simulation — Forage', 
          link: '#cert-4' 
        },
        { 
          image: 'images/cert_cpp_srm.png', 
          label: 'OOP in C++ — SRM / SWAYAM Plus', 
          link: '#cert-5' 
        },
        { 
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80', 
          label: 'Communication & Digital Skills — UNICEF', 
          link: '#cert-6' 
        }
      ],
      defaultIndex: 0,
      expandRatio: 0.52,
      trigger: 'hover',
      duration: 0.6,
      ease: 'power3.out',
      parallax: 0.5,
      tilt: 8,
      stagger: 0.06,
      showLabels: true,
      grayscale: false
    });
  }

  function initAccordionGallery(container, options = {}) {
    const items = options.items || [];
    const count = items.length;
    if (count === 0) return;

    let defaultIndex = typeof options.defaultIndex === 'number' ? options.defaultIndex : 0;
    let active = Math.min(Math.max(defaultIndex, 0), count - 1);
    const accentColor = options.accentColor || '#38bdf8';
    const overlayColor = options.overlayColor || '#060010';
    const textColor = options.textColor || '#ffffff';
    const height = options.height || 460;
    const gap = typeof options.gap === 'number' ? options.gap : 10;
    const radius = typeof options.radius === 'number' ? options.radius : 16;
    const expandRatio = typeof options.expandRatio === 'number' ? options.expandRatio : 0.52;
    const orientation = options.orientation || 'horizontal';
    const vertical = orientation === 'vertical';
    const duration = typeof options.duration === 'number' ? options.duration : 0.6;
    const ease = options.ease || 'power3.out';
    const parallax = typeof options.parallax === 'number' ? options.parallax : 0.5;
    const tilt = typeof options.tilt === 'number' ? options.tilt : 8;
    const stagger = typeof options.stagger === 'number' ? options.stagger : 0.06;
    const trigger = options.trigger || 'hover';
    const showLabels = options.showLabels !== false;
    const grayscale = options.grayscale !== false;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    container.innerHTML = '';
    container.className = `accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}`;
    container.style.setProperty('--ag-accent', accentColor);
    container.style.setProperty('--ag-overlay', overlayColor);
    container.style.setProperty('--ag-text', textColor);
    container.style.setProperty('--ag-gap', `${gap}px`);
    container.style.setProperty('--ag-radius', `${radius}px`);
    container.style.height = vertical ? `${Math.round(height * 1.6)}px` : `${height}px`;

    const panels = [];
    const mediaList = [];
    const barList = [];
    const textList = [];
    let tl = null;
    let mediaSize = 320;
    let firstRun = true;

    items.forEach((item, i) => {
      const isActive = i === active;
      const tag = item.link ? 'a' : 'div';
      const panel = document.createElement(tag);
      panel.className = `ag-panel${isActive ? ' ag-panel--active' : ''}`;
      panel.style.borderRadius = `${radius}px`;
      if (item.link) panel.href = item.link;
      panel.setAttribute('role', 'listitem');
      panel.setAttribute('tabindex', '0');
      if (isActive) panel.setAttribute('aria-current', 'true');
      panel.setAttribute('aria-label', item.label || `Certificate panel ${i + 1}`);

      const frame = document.createElement('span');
      frame.className = 'ag-panel__frame';

      const media = document.createElement('span');
      media.className = 'ag-panel__media';
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.alt || item.label || '';
      img.draggable = false;
      media.appendChild(img);
      frame.appendChild(media);

      const overlay = document.createElement('span');
      overlay.className = 'ag-panel__overlay';
      overlay.setAttribute('aria-hidden', 'true');
      frame.appendChild(overlay);

      panel.appendChild(frame);

      let bar = null;
      let text = null;
      if (showLabels) {
        const labelWrap = document.createElement('span');
        labelWrap.className = 'ag-panel__label';
        labelWrap.setAttribute('aria-hidden', 'true');

        bar = document.createElement('span');
        bar.className = 'ag-panel__bar';
        labelWrap.appendChild(bar);

        text = document.createElement('span');
        text.className = 'ag-panel__text';
        text.textContent = item.label || '';
        labelWrap.appendChild(text);

        panel.appendChild(labelWrap);
      }

      panels.push(panel);
      mediaList.push(media);
      barList.push(bar);
      textList.push(text);

      panel.addEventListener('mouseenter', () => {
        if (trigger === 'hover') setActive(i);
      });

      panel.addEventListener('click', (e) => {
        if (i !== active) {
          e.preventDefault();
          setActive(i);
        } else if (item.link && item.link.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(item.link);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('highlight-card');
            setTimeout(() => target.classList.remove('highlight-card'), 1800);
          }
        }
      });

      panel.addEventListener('focus', () => {
        setActive(i);
      });

      panel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = (i + 1) % count;
          setActive(next);
          panels[next]?.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = (i - 1 + count) % count;
          setActive(prev);
          panels[prev]?.focus();
        }
      });

      container.appendChild(panel);
    });

    function applyLayout(animate = true) {
      if (!panels.length) return;
      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

      tl?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const hasGsap = typeof gsap !== 'undefined';
      if (hasGsap) {
        tl = gsap.timeline();
      }

      panels.forEach((panel, i) => {
        const isActive = i === active;
        const media = mediaList[i];
        const bar = barList[i];
        const text = textList[i];

        if (isActive) {
          panel.classList.add('ag-panel--active');
          panel.setAttribute('aria-current', 'true');
        } else {
          panel.classList.remove('ag-panel--active');
          panel.removeAttribute('aria-current');
        }

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        if (hasGsap) {
          tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

          if (media) {
            const drift = Math.max(-1.5, Math.min(1.5, active - i));
            const shift = drift * parallax * mediaSize * 0.06;
            const gray = grayscale ? (isActive ? 0 : 1) : 0;
            tl.to(
              media,
              {
                xPercent: -50,
                yPercent: -50,
                x: vertical ? 0 : isActive ? 0 : shift,
                y: vertical ? (isActive ? 0 : shift) : 0,
                '--ag-gray': gray,
                '--ag-dim': isActive ? 0 : 0.35,
                duration: dur,
                ease
              },
              0
            );
          }

          if (showLabels && bar && text) {
            if (isActive) {
              tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
            } else {
              tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
            }
          }
        } else {
          panel.style.flexGrow = isActive ? grow : 1;
          panel.style.transform = `perspective(1400px) rotateY(${rot}deg)`;
          if (media) {
            media.style.setProperty('--ag-gray', isActive ? 0 : 1);
            media.style.setProperty('--ag-dim', isActive ? 0 : 0.35);
          }
          if (bar && text) {
            bar.style.opacity = isActive ? '1' : '0';
            text.style.opacity = isActive ? '1' : '0';
          }
        }
      });
    }

    function setActive(newIndex) {
      if (active === newIndex) return;
      active = newIndex;
      applyLayout(true);
    }

    function measure() {
      const rect = container.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSize = size;
      container.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRun);
    }

    measure();
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(measure);
      ro.observe(container);
    } else {
      window.addEventListener('resize', measure);
    }

    applyLayout(!firstRun);
    firstRun = false;
  }

  // -------------------------------------------------------------------------
  // 8. Certificate Lightbox Modal Preview
  // -------------------------------------------------------------------------
  const lightbox = document.getElementById('cert-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const thumbnailWrappers = document.querySelectorAll('.cert-thumbnail-wrapper');

  function openLightbox(imgSrc, captionText) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    if (lightboxCaption) lightboxCaption.textContent = captionText || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  thumbnailWrappers.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const fullImg = thumb.getAttribute('data-full-img');
      const caption = thumb.getAttribute('data-caption');
      if (fullImg) openLightbox(fullImg, caption);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) {
      closeLightbox();
    }
  });
});
