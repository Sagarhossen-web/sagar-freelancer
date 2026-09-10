document.addEventListener('DOMContentLoaded', function () { 

  /* ---------------------------------------------------------
     Sticky nav background on scroll
  --------------------------------------------------------- */
  var nav = document.getElementById('siteNav');
  function handleNavScroll() {
    if (window.scrollY > 12) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ---------------------------------------------------------
     Hero background parallax — very subtle, disabled entirely
     for users who prefer reduced motion. Moves the background
     layer at a fraction of scroll speed, capped and only while
     the hero is still on screen (avoids doing work once scrolled
     past it).
  --------------------------------------------------------- */
  var heroBg = document.querySelector('.hero-bg');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroBg && !reduceMotion) {
    var heroSection = document.getElementById('home');
    var parallaxTicking = false;

    function applyParallax() {
      parallaxTicking = false;
      var heroHeight = heroSection.offsetHeight;
      if (window.scrollY > heroHeight) return;
      var shift = Math.min(window.scrollY * 0.08, 40);
      heroBg.style.transform = 'translateY(' + shift + 'px)';
    }

    window.addEventListener('scroll', function () {
      if (!parallaxTicking) {
        window.requestAnimationFrame(applyParallax);
        parallaxTicking = true;
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Mobile hamburger menu
  --------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navToggle.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleMenu);

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });

  /* ---------------------------------------------------------
     Active nav link highlighting on scroll
  --------------------------------------------------------- */
  var sections = ['home', 'about', 'services', 'portfolio', 'process', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

  function setActiveNav() {
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section;
      }
    });

    navAnchors.forEach(function (a) {
      var target = a.getAttribute('href').replace('#', '');
      a.classList.toggle('is-active', target === current.id);
    });
  }

  setActiveNav();
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ---------------------------------------------------------
     Scroll reveal animations
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     Portfolio filtering
     Four niches: Website Development (WordPress + Shopify combined),
     Social Media Management, Meta Ads, Google Ads Campaign.
  --------------------------------------------------------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var featureCards = document.querySelectorAll('.portfolio-feature-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      featureCards.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        var show = filter === 'all' || filter === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------------------------------------------------------
     Portfolio data — one preview card per niche is shown on the
     page; clicking it opens this category's full 5-image gallery
     in the lightbox. Every path below matches an existing file in
      (none were removed, only regrouped: WordPress and
     Shopify images now sit together under "web" / Website
     Development, per the single-niche positioning).
  --------------------------------------------------------- */
  var portfolioData = {
    web: {
      label: 'Website Development',
      sub: 'WordPress & Shopify',
      images: [
        { src: 'wordpress-01.jpg', alt: 'Website Development portfolio piece 1 — WordPress homepage design' },
        { src: 'wordpress-02.jpg', alt: 'Website Development portfolio piece 2 — WordPress landing page layout' },
        { src: 'wordpress-03.jpg', alt: 'Website Development portfolio piece 3 — WordPress page design and structure' },
        { src: 'shopify-01.jpg', alt: 'Website Development portfolio piece 4 — Shopify store homepage and product layout' },
        { src: 'shopify-02.jpg', alt: 'Website Development portfolio piece 5 — Shopify product and collection page design' }
      ]
    },
    smm: {
      label: 'Social Media Management',
      sub: 'Content & Community',
      images: [
        { src: 'smm-01.jpg', alt: 'Social Media Management portfolio piece 1 — brand growth and engagement overview' },
        { src: 'smm-02.jpg', alt: 'Social Media Management portfolio piece 2 — content strategy and results dashboard' },
        { src: 'smm-03.jpg', alt: 'Social Media Management portfolio piece 3 — platform strategy and analytics overview' },
        { src: 'smm-04.jpg', alt: 'Social Media Management portfolio piece 4 — content creation and engagement impact' },
        { src: 'smm-05.jpg', alt: 'Social Media Management portfolio piece 5 — audience growth and results summary' }
      ]
    },
    meta: {
      label: 'Meta Ads',
      sub: 'Campaign Setup & Optimization',
      images: [
        { src: 'meta-ads-01.jpg', alt: 'Meta Ads portfolio piece 1 — Facebook and Instagram e-commerce campaign report' },
        { src: 'meta-ads-02.jpg', alt: 'Meta Ads portfolio piece 2 — campaign performance breakdown' },
        { src: 'meta-ads-03.jpg', alt: 'Meta Ads portfolio piece 3 — audience targeting and results overview' },
        { src: 'meta-ads-04.jpg', alt: 'Meta Ads portfolio piece 4 — ad creative and conversion summary' },
        { src: 'meta-ads-05.jpg', alt: 'Meta Ads portfolio piece 5 — campaign reach and spend efficiency report' }
      ]
    },
    google: {
      label: 'Google Ads Campaign',
      sub: 'Search, Display & Shopping',
      images: [
        { src: 'google-ads-01.jpg', alt: 'Google Ads Campaign portfolio piece 1 — search campaign performance report' },
        { src: 'google-ads-02.jpg', alt: 'Google Ads Campaign portfolio piece 2 — conversion tracking and results' },
        { src: 'google-ads-03.jpg', alt: 'Google Ads Campaign portfolio piece 3 — keyword and impression share overview' },
        { src: 'google-ads-04.jpg', alt: 'Google Ads Campaign portfolio piece 4 — cost per click and click-through summary' },
        { src: 'google-ads-05.jpg', alt: 'Google Ads Campaign portfolio piece 5 — campaign growth and ROI overview' }
      ]
    }
  };

  /* ---------------------------------------------------------
     Lightbox
  --------------------------------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var lightboxCategory = document.getElementById('lightboxCategory');
  var lightboxSub = document.getElementById('lightboxSub');
  var lightboxCount = document.getElementById('lightboxCount');

  var currentCategory = null;
  var currentIndex = 0;
  var lastFocusedCard = null;

  function openLightbox(category, index) {
    currentCategory = category;
    currentIndex = index;
    renderLightboxImage(false);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function renderLightboxImage(animate) {
    var data = portfolioData[currentCategory];
    var item = data.images[currentIndex];

    function apply() {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxCategory.textContent = data.label;
      lightboxSub.textContent = data.sub;
      lightboxCount.textContent = (currentIndex + 1) + ' / ' + data.images.length;
      lightboxImg.classList.remove('is-switching');
    }

    if (animate) {
      // Brief crossfade so moving between images feels smooth rather
      // than an abrupt swap.
      lightboxImg.classList.add('is-switching');
      window.setTimeout(apply, 140);
    } else {
      apply();
    }
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  function showPrev() {
    var data = portfolioData[currentCategory];
    currentIndex = (currentIndex - 1 + data.images.length) % data.images.length;
    renderLightboxImage(true);
  }

  function showNext() {
    var data = portfolioData[currentCategory];
    currentIndex = (currentIndex + 1) % data.images.length;
    renderLightboxImage(true);
  }

  featureCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var category = card.getAttribute('data-category');
      if (!portfolioData[category]) return;
      lastFocusedCard = card;
      openLightbox(category, 0);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

});
