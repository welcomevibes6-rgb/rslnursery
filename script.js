/* ============================================
   RSL NURSERY – MOBILE-FIRST INTERACTIONS v3
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ NAVBAR ============
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navDropdown = document.querySelector('.nav-dropdown');

  // Sticky navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = window.scrollY;
  }, { passive: true });

  // Mobile toggle
  function openMenu() {
    navToggle.classList.add('active');
    navLinks.classList.add('open');
    mobileOverlay.classList.add('active');
    if (navbar) navbar.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    if (navbar) navbar.classList.remove('menu-open');
    document.body.style.overflow = '';
    // Also close dropdown
    if (navDropdown) navDropdown.classList.remove('open');
  }

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close menu on logo click (for mobile drawer state)
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', closeMenu);
  }

  // Close menu on dedicated close button click
  const mobileClose = document.getElementById('mobileClose');
  if (mobileClose) {
    mobileClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Mobile dropdown toggle
  if (navDropdown) {
    const dropdownTrigger = navDropdown.querySelector(':scope > a');
    if (dropdownTrigger) {
      dropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          // Bypassed on mobile to act as a direct section link
        }
      });
    }
  }

  // Close menu on ANY link click inside nav-links
  document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Dropdown sub-item links always close menu
  document.querySelectorAll('.dropdown-menu a[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
      const tab = e.currentTarget.getAttribute('data-tab');
      switchTab(tab);
      if (window.innerWidth <= 768) closeMenu();
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (navLink && scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links > a, .nav-dropdown > a').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  }, { passive: true });


  // ============ HERO – LETTER BY LETTER ANIMATION ============
  const heroTitleRSL = document.getElementById('heroTitleRSL');
  const heroTitleNursery = document.getElementById('heroTitleNursery');
  const heroQuote = document.getElementById('heroQuote');
  const heroButtons = document.getElementById('heroButtons');

  if (heroTitleRSL && heroTitleNursery) {
    const rslText = 'RSL';
    const nurseryText = 'NURSERY';

    rslText.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('hero-letter');
      span.textContent = char;
      heroTitleRSL.appendChild(span);
    });

    nurseryText.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('hero-letter');
      span.textContent = char;
      heroTitleNursery.appendChild(span);
    });

    const rslSpans = heroTitleRSL.querySelectorAll('.hero-letter');
    const nurserySpans = heroTitleNursery.querySelectorAll('.hero-letter');

    let delay = 600;
    let letterDelay = 150;

    rslSpans.forEach((span, i) => {
      setTimeout(() => span.classList.add('visible'), delay + i * letterDelay);
    });

    const nurseryStartDelay = delay + rslSpans.length * letterDelay + 350;
    nurserySpans.forEach((span, i) => {
      setTimeout(() => span.classList.add('visible'), nurseryStartDelay + i * letterDelay);
    });

    const taglineStartDelay = nurseryStartDelay + nurserySpans.length * letterDelay + 400;
    setTimeout(() => {
      if (heroQuote) heroQuote.classList.add('visible');
    }, taglineStartDelay);

    setTimeout(() => {
      if (heroButtons) heroButtons.classList.add('visible');
    }, taglineStartDelay + 700);
  }


  // ============ HERO BACKGROUND CAROUSEL ============
  const heroSlides = document.querySelectorAll('.hero-slide');
  let heroCurrentSlide = 0;
  const heroSlideInterval = 6000; // 6 seconds per slide
  let heroTimer = null;

  function heroNextSlide() {
    if (heroSlides.length < 2) return;
    heroSlides[heroCurrentSlide].classList.remove('active');
    heroCurrentSlide = (heroCurrentSlide + 1) % heroSlides.length;
    heroSlides[heroCurrentSlide].classList.add('active');
  }

  function startHeroCarousel() {
    if (heroTimer) return;
    heroTimer = setInterval(heroNextSlide, heroSlideInterval);
  }

  function stopHeroCarousel() {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = null;
    }
  }

  // Start carousel after initial page-load animations finish (~5s)
  if (heroSlides.length > 1) {
    setTimeout(startHeroCarousel, 5000);

    // Pause when tab is hidden to save resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopHeroCarousel();
      } else {
        startHeroCarousel();
      }
    });
  }


  // ============ FLOATING LEAVES (Hero – Desktop only) ============
  const leavesContainer = document.getElementById('floatingLeaves');
  const leafEmojis = ['🍃', '🌿', '☘️', '🌱'];

  function createLeaf() {
    if (!leavesContainer || window.innerWidth < 768) return;
    const leaf = document.createElement('span');
    leaf.classList.add('leaf');
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.fontSize = (Math.random() * 1.2 + 0.7) + 'rem';
    leaf.style.animationDuration = (Math.random() * 12 + 14) + 's';
    leaf.style.animationDelay = (Math.random() * 4) + 's';
    leavesContainer.appendChild(leaf);
    setTimeout(() => leaf.remove(), 28000);
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(createLeaf, i * 1200);
  }
  setInterval(createLeaf, 4000);


  // ============ ABOUT LEAVES (Desktop only) ============
  const aboutLeavesContainer = document.getElementById('aboutLeaves');
  const aboutLeafEmojis = ['🍃', '🌿', '☘️'];

  function createAboutLeaf() {
    if (!aboutLeavesContainer || window.innerWidth < 768) return;
    const leaf = document.createElement('span');
    leaf.classList.add('about-leaf');
    leaf.textContent = aboutLeafEmojis[Math.floor(Math.random() * aboutLeafEmojis.length)];
    leaf.style.left = Math.random() * 90 + 5 + '%';
    leaf.style.fontSize = (Math.random() * 0.6 + 0.6) + 'rem';
    leaf.style.animationDuration = (Math.random() * 8 + 10) + 's';
    leaf.style.animationDelay = (Math.random() * 3) + 's';
    aboutLeavesContainer.appendChild(leaf);
    setTimeout(() => leaf.remove(), 20000);
  }

  const aboutSection = document.getElementById('about');
  let aboutLeavesStarted = false;
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !aboutLeavesStarted) {
          aboutLeavesStarted = true;
          for (let i = 0; i < 6; i++) {
            setTimeout(createAboutLeaf, i * 800);
          }
          setInterval(createAboutLeaf, 4500);
        }
      });
    }, { threshold: 0.2 });
    aboutObserver.observe(aboutSection);
  }


  // ============ ABOUT – LETTER BY LETTER TITLE ============
  const aboutTitle = document.getElementById('aboutTitle');
  const aboutTitleText = 'About RSL Nursery';

  if (aboutTitle) {
    aboutTitleText.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('about-letter');
      if (char === ' ') {
        span.classList.add('space');
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      aboutTitle.appendChild(span);
    });

    const aboutTitleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const letters = aboutTitle.querySelectorAll('.about-letter');
          letters.forEach((letter, i) => {
            setTimeout(() => letter.classList.add('visible'), i * 70);
          });
          aboutTitleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    aboutTitleObserver.observe(aboutTitle);
  }


  // ============ PLANT VARIETIES – LETTER BY LETTER TITLE ============
  const plantTitle = document.getElementById('plantTitle');
  const plantTitleText = 'OUR PLANTS COLLECTION';

  if (plantTitle) {
    plantTitleText.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('plant-letter');
      if (char === ' ') {
        span.classList.add('space');
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      plantTitle.appendChild(span);
    });

    const plantTitleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const letters = plantTitle.querySelectorAll('.plant-letter');
          letters.forEach((letter, i) => {
            setTimeout(() => letter.classList.add('visible'), i * 60);
          });
          plantTitleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    plantTitleObserver.observe(plantTitle);
  }


  // ============ SCROLL REVEAL ANIMATIONS ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.transitionDelay;
        if (delay) {
          const ms = parseFloat(delay) * 1000;
          setTimeout(() => entry.target.classList.add('revealed'), ms);
        } else {
          entry.target.classList.add('revealed');
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ============ CATEGORY TABS ============
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabName) {
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });


  // ============ LIGHTBOX – COMPLETE MOBILE REWRITE ============
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  let lightboxImages = [];
  let lightboxIndex = 0;

  // Zoom & pan state
  let scale = 1;
  let startScale = 1;
  let isDragging = false;
  let startX = 0, startY = 0;
  let translateX = 0, translateY = 0;
  let startTranslateX = 0, startTranslateY = 0;
  let touchStartDist = 0;
  let swipeStartX = 0, swipeStartY = 0;

  function openLightbox(images, index) {
    lightboxImages = images;
    lightboxIndex = index;
    resetZoom();
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    resetZoom();
  }

  function updateLightbox() {
    resetZoom();
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.92)';

    setTimeout(() => {
      lightboxImg.src = lightboxImages[lightboxIndex];
      lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;

      const showImage = () => {
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      };

      lightboxImg.onload = showImage;
      if (lightboxImg.complete) showImage();
    }, 150);
  }

  function lightboxPrevFn() {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  }

  function lightboxNextFn() {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); lightboxPrevFn(); });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); lightboxNextFn(); });

  // Close on background click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrevFn();
    if (e.key === 'ArrowRight') lightboxNextFn();
  });

  // ---- TOUCH GESTURE SYSTEM ----
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTranslateX = translateX;
        startTranslateY = translateY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
        startScale = scale;
      }
    }, { passive: true });

    lightbox.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        if (scale > 1) {
          // Pan zoomed image
          e.preventDefault();
          const dx = e.touches[0].clientX - startX;
          const dy = e.touches[0].clientY - startY;
          translateX = startTranslateX + dx;
          translateY = startTranslateY + dy;

          const maxTx = (scale - 1) * (lightboxImg.clientWidth / 2);
          const maxTy = (scale - 1) * (lightboxImg.clientHeight / 2);
          translateX = Math.max(-maxTx, Math.min(maxTx, translateX));
          translateY = Math.max(-maxTy, Math.min(maxTy, translateY));

          applyTransform();
        }
        // For swipe, we do nothing during move – we detect on touchend
      } else if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);

        scale = startScale * (dist / touchStartDist);
        scale = Math.max(1, Math.min(4, scale));

        if (scale <= 1) {
          scale = 1;
          translateX = 0;
          translateY = 0;
        }
        applyTransform();
      }
    }, { passive: false });

    lightbox.addEventListener('touchend', (e) => {
      if (isDragging) {
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - swipeStartX;
        const diffY = endY - swipeStartY;

        // Swipe navigation (only when not zoomed)
        if (scale <= 1) {
          if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
              lightboxPrevFn();
            } else {
              lightboxNextFn();
            }
          }
        }
      }
    }, { passive: true });

    lightbox.addEventListener('touchcancel', () => {
      isDragging = false;
    }, { passive: true });

    // Double-tap to zoom
    if (lightboxImg) {
      let lastTap = 0;
      lightboxImg.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTap < 300 && now - lastTap > 0) {
          e.preventDefault();
          if (scale > 1) {
            resetZoom();
          } else {
            scale = 2.5;
            applyTransform();
          }
        }
        lastTap = now;
      });

      // Desktop click zoom
      lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        if (scale > 1) {
          resetZoom();
        } else {
          scale = 2.5;
          applyTransform();
        }
      });
    }
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  function applyTransform() {
    if (lightboxImg) {
      lightboxImg.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
      lightboxImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
    }
  }


  // ============ CLICK HANDLERS – Plant Catalogue Items & Gallery ============

  function attachLightboxToContainer(containerSelector) {
    const items = document.querySelectorAll(`${containerSelector} .plant-catalogue-item`);
    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        const imgs = Array.from(
          document.querySelectorAll(`${containerSelector} .plant-catalogue-item img`)
        ).map(el => el.src);
        openLightbox(imgs, i);
      });
    });
  }

  attachLightboxToContainer('#tab-outdoor');
  attachLightboxToContainer('#tab-indoor');
  attachLightboxToContainer('#tab-flowering');
  attachLightboxToContainer('#tab-avenue');
  attachLightboxToContainer('#tab-ficus');

  // Gallery section
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      const imgs = Array.from(document.querySelectorAll('.gallery-item img')).map(el => el.src);
      openLightbox(imgs, i);
    });
  });


  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });


  // ============ PARALLAX (Desktop only) ============
  const parallaxSections = document.querySelectorAll('.kadiyam-bg img');
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxSections.forEach(el => {
        const section = el.closest('section') || el.closest('.kadiyam-heritage');
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
          const scrollRelative = scrollY - sectionTop;
          const parallaxOffset = scrollRelative * 0.15;
          el.style.transform = `translateY(${parallaxOffset}px) scale(1.08)`;
        }
      });
    }, { passive: true });
  }


  // ============ HIGHLIGHT CARD GLOW (Desktop only) ============
  if (window.innerWidth > 768) {
    document.querySelectorAll('.highlight-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(30,91,54,0.05), rgba(255,255,255,0.75) 60%)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255, 255, 255, 0.75)';
      });
    });
  }


  // ============ COUNTER ANIMATION ============
  const counterEl = document.querySelector('.about-float-badge .badge-number');
  if (counterEl) {
    const targetNum = parseInt(counterEl.textContent);
    let counted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          let current = 0;
          const increment = targetNum / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
              current = targetNum;
              clearInterval(timer);
            }
            counterEl.textContent = Math.floor(current) + '+';
          }, 50);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(counterEl);
  }


  // ============ GALLERY STAGGERED REVEAL ============
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 100);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  galleryItems.forEach(item => galleryObserver.observe(item));

});
