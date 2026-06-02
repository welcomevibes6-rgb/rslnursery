/* ============================================
   RSL NURSERY – PREMIUM INTERACTIONS v2
   Elegant, slow, luxury animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ NAVBAR ============
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navDropdown = document.querySelector('.nav-dropdown');

  // Sticky navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Mobile dropdown
  if (navDropdown) {
    navDropdown.querySelector('a').addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        navDropdown.classList.toggle('open');
      }
    });
  }

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-links a:not(.nav-dropdown > a)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });

  // Dropdown tab links
  document.querySelectorAll('.dropdown-menu a[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
      const tab = e.currentTarget.getAttribute('data-tab');
      setTimeout(() => switchTab(tab), 400);
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
  });


  // ============ HERO – LETTER BY LETTER ANIMATION ============
  const heroTitleRSL = document.getElementById('heroTitleRSL');
  const heroTitleNursery = document.getElementById('heroTitleNursery');
  const heroQuote = document.getElementById('heroQuote');
  const heroButtons = document.getElementById('heroButtons');

  if (heroTitleRSL && heroTitleNursery) {
    const rslText = 'RSL';
    const nurseryText = 'NURSERY';

    // Split RSL
    rslText.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('hero-letter');
      span.textContent = char;
      heroTitleRSL.appendChild(span);
    });

    // Split NURSERY
    nurseryText.split('').forEach(char => {
      const span = document.createElement('span');
      span.classList.add('hero-letter');
      span.textContent = char;
      heroTitleNursery.appendChild(span);
    });

    const rslSpans = heroTitleRSL.querySelectorAll('.hero-letter');
    const nurserySpans = heroTitleNursery.querySelectorAll('.hero-letter');

    let delay = 600; // initial delay after page load
    let letterDelay = 150; // speed per letter (cinematic reveal)

    // Animate RSL first
    rslSpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('visible');
      }, delay + i * letterDelay);
    });

    // Animate NURSERY after RSL completes (with 350ms cinematic break)
    const nurseryStartDelay = delay + rslSpans.length * letterDelay + 350;
    nurserySpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('visible');
      }, nurseryStartDelay + i * letterDelay);
    });

    // After heading completes, fade in tagline
    const taglineStartDelay = nurseryStartDelay + nurserySpans.length * letterDelay + 400;
    setTimeout(() => {
      if (heroQuote) heroQuote.classList.add('visible');
    }, taglineStartDelay);

    // After tagline completes, fade in buttons
    setTimeout(() => {
      if (heroButtons) heroButtons.classList.add('visible');
    }, taglineStartDelay + 700);
  }


  // ============ FLOATING LEAVES (Hero) ============
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

  // Create initial leaves
  for (let i = 0; i < 10; i++) {
    setTimeout(createLeaf, i * 1200);
  }
  setInterval(createLeaf, 4000);


  // ============ ABOUT – FLOATING LEAF PARTICLES ON IMAGE ============
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

  // Observe about section to start leaf particles
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
    }, { threshold: 0.3 });

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
    }, { threshold: 0.3 });

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
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
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


  // ============ LIGHTBOX ============
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  let lightboxImages = [];
  let lightboxIndex = 0;
  let isZoomed = false;

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
    // Smooth transition: fade out, change src, fade in
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.92)';
    
    setTimeout(() => {
      lightboxImg.src = lightboxImages[lightboxIndex];
      lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
      
      // After image loads, fade in
      lightboxImg.onload = () => {
        if (!isZoomed) {
          lightboxImg.style.opacity = '1';
          lightboxImg.style.transform = 'scale(1)';
        }
      };
      
      // Fallback if already cached
      if (lightboxImg.complete) {
        if (!isZoomed) {
          lightboxImg.style.opacity = '1';
          lightboxImg.style.transform = 'scale(1)';
        }
      }
    }, 200);
  }

  function lightboxPrevFn() {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  }

  function lightboxNextFn() {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', lightboxPrevFn);
  if (lightboxNext) lightboxNext.addEventListener('click', lightboxNextFn);

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

  // Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    // Ignore vertical swiping for zoom/scroll comfort, check horizontal threshold of 50px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe Right -> Prev
        lightboxPrevFn();
      } else {
        // Swipe Left -> Next
        lightboxNextFn();
      }
    }
  }

  // Double-tap or Click-to-Zoom support
  if (lightboxImg) {
    // Double tap detection
    let lastTap = 0;
    lightboxImg.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        toggleZoom();
        e.preventDefault();
      }
      lastTap = currentTime;
    });

    // Simple click zoom on desktop
    lightboxImg.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent closing lightbox on backdrop click
      toggleZoom();
    });
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    if (isZoomed) {
      lightboxImg.style.transform = 'scale(2)';
      lightboxImg.style.cursor = 'zoom-out';
      lightboxImg.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      lightboxImg.style.transform = 'scale(1)';
      lightboxImg.style.cursor = 'zoom-in';
      lightboxImg.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  }

  function resetZoom() {
    isZoomed = false;
    if (lightboxImg) {
      lightboxImg.style.transform = 'scale(1)';
      lightboxImg.style.cursor = 'zoom-in';
    }
  }


  // ============ CLICK HANDLERS – Plant Catalogue Items & Gallery ============
  
  // Helper: attach lightbox to all items within a container
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

  // Attach to each tab
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


  // ============ PARALLAX EFFECT ============
  const parallaxSections = document.querySelectorAll('.kadiyam-bg img');

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


  // ============ HIGHLIGHT CARD GLOW EFFECT ============
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


  // ============ COUNTER ANIMATION (About Badge) ============
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


  // ============ GALLERY ITEM STAGGERED REVEAL ============
  const galleryItems = document.querySelectorAll('.gallery-item');

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 120);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  galleryItems.forEach(item => galleryObserver.observe(item));


  // ============ SUBTLE NAV HOVER ============
  document.querySelectorAll('.nav-links > a, .nav-dropdown > a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-1px)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });

});
