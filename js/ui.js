(function () {
  var progress = document.getElementById('read-progress');
  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav-links');
  var toast = document.getElementById('toast');
  var backTop = document.getElementById('back-top');
  var deco = document.getElementById('canvas-deco');
  var pcRoute = document.getElementById('pc-route');
  var pcRoutePath = document.getElementById('pc-route-path');
  var pcScraps = document.getElementById('pc-scraps');
  var pcRoot = document.getElementById('pc-root');
  var pcPlane = document.getElementById('pc-plane');
  var pcHint = document.getElementById('pc-hint');
  var pcHintIcon = document.getElementById('pc-hint-icon');
  var pcHintText = document.getElementById('pc-hint-text');
  var toastTimer = null;
  var reduceMotion = false;

  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-show');
      setTimeout(function () {
        toast.hidden = true;
      }, 300);
    }, 2200);
  }

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && docH > 0) {
      progress.style.width = Math.min(100, (scrollTop / docH) * 100) + '%';
    }

    if (header) {
      header.classList.toggle('is-scrolled', scrollTop > 24);
    }

    if (backTop) {
      backTop.hidden = scrollTop < 400;
    }

    var sections = document.querySelectorAll('[data-section]');
    var navLinks = nav ? nav.querySelectorAll('a[data-nav]') : [];
    var current = '';
    var i;
    for (i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top <= 120) current = sections[i].id;
    }
    for (i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.toggle('is-active', navLinks[i].getAttribute('data-nav') === current);
    }

    if (deco && !reduceMotion) {
      var shapes = deco.querySelectorAll('.deco-shape');
      for (i = 0; i < shapes.length; i++) {
        var speed = (i + 1) * 0.04;
        shapes[i].style.transform = 'translateY(' + scrollTop * speed * -1 + 'px) rotate(' + scrollTop * 0.02 + 'deg)';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  if (nav) {
    nav.addEventListener('click', function (ev) {
      var link = ev.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
      nav.classList.remove('is-open');
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var revealEls = document.querySelectorAll('.reveal, .skill-card, .about-card, .hero-stat');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.classList.contains('skill-card')) {
              animateSkillPct(entry.target);
            }
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });

    var sectionIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll('[data-section]').forEach(function (sec) {
      sectionIo.observe(sec);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  function animateSkillPct(card) {
    if (reduceMotion) return;
    var pctEl = card.querySelector('.skill-pct');
    var target = parseInt(card.getAttribute('data-level'), 10) || 0;
    if (!pctEl || !target) return;
    var start = 0;
    var t0 = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - t0) / 900);
      var val = Math.round(start + (target - start) * p);
      pctEl.textContent = val + '%';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var timeline = document.getElementById('timeline');
  if (timeline) {
    timeline.addEventListener('click', function (ev) {
      var item = ev.target.closest('.exp-item');
      if (!item) return;
      var wasOpen = item.classList.contains('is-open');
      var all = timeline.querySelectorAll('.exp-item');
      var i;
      for (i = 0; i < all.length; i++) {
        all[i].classList.remove('is-open');
        all[i].setAttribute('aria-expanded', 'false');
      }
      if (!wasOpen) {
        item.classList.add('is-open');
        item.setAttribute('aria-expanded', 'true');
      }
    });
  }

  document.addEventListener('click', function (ev) {
    var copyBtn = ev.target.closest('#btn-copy-email');
    if (!copyBtn) return;
    var email = copyBtn.getAttribute('data-email') || '';
    if (!email) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () {
          showToast('邮箱已复制 ✓');
        },
        function () {
          showToast(email);
        }
      );
    } else {
      showToast(email);
    }
  });

  var skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    skillsGrid.addEventListener('click', function (ev) {
      var card = ev.target.closest('.skill-card');
      if (!card) return;
      card.classList.toggle('is-expanded');
    });
  }

  /* 纸飞机光标 — 航迹 + 弹簧飞控 */
  if (
    !reduceMotion &&
    pcRoot &&
    pcPlane &&
    pcRoutePath &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  ) {
    document.body.classList.add('has-custom-cursor');

    var mouseX = 0;
    var mouseY = 0;
    var planeX = 0;
    var planeY = 0;
    var velX = 0;
    var velY = 0;
    var heading = -90;
    var bank = 0;
    var pitch = 0;
    var idleFrames = 0;
    var routePoints = [];
    var maxRoutePoints = 22;
    var minRouteDist = 4;
    var ready = false;
    var interactState = '';
    var pressState = false;

    var STIFFNESS = 0.22;
    var DAMPING = 0.68;
    var FAST_SPEED = 11;
    var IDLE_FRAMES = 28;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function setPlaneTransform() {
      pcPlane.style.setProperty('--pc-heading', heading.toFixed(2) + 'deg');
      pcPlane.style.setProperty('--pc-bank', bank.toFixed(2) + 'deg');
      pcPlane.style.setProperty('--pc-pitch', pitch.toFixed(2) + 'deg');
    }

    function pushRoutePoint(x, y) {
      var last = routePoints[routePoints.length - 1];
      if (last) {
        var dx = x - last.x;
        var dy = y - last.y;
        if (dx * dx + dy * dy < minRouteDist * minRouteDist) return;
      }
      routePoints.push({ x: x, y: y });
      if (routePoints.length > maxRoutePoints) routePoints.shift();
    }

    function buildRoutePath() {
      if (routePoints.length < 2) return '';
      var pts = routePoints;
      var d = 'M ' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
      if (pts.length === 2) {
        d += ' L ' + pts[1].x.toFixed(1) + ' ' + pts[1].y.toFixed(1);
        return d;
      }
      for (var i = 1; i < pts.length - 1; i++) {
        var mx = (pts[i].x + pts[i + 1].x) * 0.5;
        var my = (pts[i].y + pts[i + 1].y) * 0.5;
        d += ' Q ' + pts[i].x.toFixed(1) + ' ' + pts[i].y.toFixed(1) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1);
      }
      var end = pts[pts.length - 1];
      d += ' L ' + end.x.toFixed(1) + ' ' + end.y.toFixed(1);
      return d;
    }

    function updateRouteGradient() {
      if (!pcRoute || routePoints.length < 2) return;
      var start = routePoints[0];
      var end = routePoints[routePoints.length - 1];
      var grad = document.getElementById('pc-route-grad');
      if (!grad) return;
      grad.setAttribute('x1', start.x);
      grad.setAttribute('y1', start.y);
      grad.setAttribute('x2', end.x);
      grad.setAttribute('y2', end.y);
    }

    function fadeRoute() {
      routePoints.shift();
      if (routePoints.length > 1) {
        pcRoutePath.setAttribute('d', buildRoutePath());
        updateRouteGradient();
      } else {
        pcRoutePath.setAttribute('d', '');
      }
    }

    function spawnScraps(x, y, angle, count) {
      if (!pcScraps) return;
      for (var i = 0; i < count; i++) {
        var scrap = document.createElement('span');
        scrap.className = 'pc-scrap';
        var spread = angle + (Math.random() - 0.5) * 70;
        var dist = 18 + Math.random() * 26;
        var rad = (spread * Math.PI) / 180;
        scrap.style.left = x + 'px';
        scrap.style.top = y + 'px';
        scrap.style.setProperty('--scrap-rot', (Math.random() * 360).toFixed(1) + 'deg');
        scrap.style.setProperty('--scrap-dx', (Math.cos(rad) * dist).toFixed(1) + 'px');
        scrap.style.setProperty('--scrap-dy', (Math.sin(rad) * dist).toFixed(1) + 'px');
        scrap.style.setProperty('--scrap-life', (0.45 + Math.random() * 0.25).toFixed(2) + 's');
        pcScraps.appendChild(scrap);
        scrap.addEventListener('animationend', function () {
          scrap.remove();
        });
        setTimeout(function () {
          scrap.remove();
        }, 900);
      }
      while (pcScraps.children.length > 16) {
        pcScraps.removeChild(pcScraps.firstChild);
      }
    }

    function setMotionState(speed) {
      if (pressState) {
        pcRoot.dataset.state = 'press';
        return;
      }
      if (interactState) {
        pcRoot.dataset.state = interactState;
        return;
      }
      if (idleFrames >= IDLE_FRAMES) {
        pcRoot.dataset.state = 'idle';
      } else if (speed >= FAST_SPEED) {
        pcRoot.dataset.state = 'fast';
      } else {
        pcRoot.dataset.state = '';
      }
    }

    function setHint(kind) {
      if (!pcHint || !pcHintText || !pcHintIcon) return;
      var map = {
        preview: { text: '预览', icon: '◫' },
        link: { text: '前往', icon: '→' },
        action: { text: '点击', icon: '·' }
      };
      var item = map[kind];
      if (!item) {
        pcHintText.textContent = '';
        pcHintIcon.textContent = '';
        return;
      }
      pcHintText.textContent = item.text;
      pcHintIcon.textContent = item.icon;
    }

    function updateInteractState(ev) {
      var t = ev.target;
      interactState = '';
      setHint('');

      if (t.closest('.work-card')) {
        interactState = 'preview';
        setHint('preview');
      } else if (t.closest('a[href]')) {
        interactState = 'link';
        setHint('link');
      } else if (t.closest('button, .btn, .filter-btn, .view-btn, .exp-item, .skill-card, .lb-nav, .lb-close, .back-top')) {
        interactState = 'action';
        setHint('action');
      }

      if (pressState) {
        pcRoot.dataset.state = 'press';
      } else {
        setMotionState(Math.sqrt(velX * velX + velY * velY));
      }
    }

    document.addEventListener('mousemove', function (ev) {
      mouseX = ev.clientX;
      mouseY = ev.clientY;
      idleFrames = 0;

      if (!ready) {
        planeX = mouseX;
        planeY = mouseY;
        velX = velY = 0;
        heading = -90;
        ready = true;
        pcRoot.classList.add('is-ready');
        document.body.classList.add('pc-cursor-ready');
        pushRoutePoint(planeX, planeY);
      }
    });

    document.addEventListener('mouseover', updateInteractState);

    document.addEventListener('mousedown', function (ev) {
      pressState = true;
      pcRoot.dataset.state = 'press';
      var speed = Math.sqrt(velX * velX + velY * velY);
      var angle = speed > 0.4 ? (Math.atan2(velY, velX) * 180) / Math.PI + 180 : heading + 90;
      spawnScraps(planeX, planeY, angle, ev.target.closest('button, .btn, a[href], .work-card') ? 4 : 2);
    });

    document.addEventListener('mouseup', function () {
      pressState = false;
      setMotionState(Math.sqrt(velX * velX + velY * velY));
    });

    document.addEventListener('mouseleave', function () {
      pressState = false;
      interactState = '';
      idleFrames = 0;
      pcRoot.dataset.state = '';
      setHint('');
    });

    function planeLoop() {
      velX = (velX + (mouseX - planeX) * STIFFNESS) * DAMPING;
      velY = (velY + (mouseY - planeY) * STIFFNESS) * DAMPING;
      planeX += velX;
      planeY += velY;

      var speed = Math.sqrt(velX * velX + velY * velY);
      if (speed > 0.35) {
        var targetHeading = (Math.atan2(velY, velX) * 180) / Math.PI + 90;
        var diff = ((targetHeading - heading + 180) % 360) - 180;
        heading += diff * 0.18;
        bank = lerp(bank, Math.max(-16, Math.min(16, velX * 2.2)), 0.2);
        pitch = lerp(pitch, Math.max(-10, Math.min(10, -velY * 1.6)), 0.2);
      }

      idleFrames += 1;
      setPlaneTransform();

      pcRoot.style.transform = 'translate3d(' + planeX.toFixed(2) + 'px, ' + planeY.toFixed(2) + 'px, 0)';

      if (ready) {
        pushRoutePoint(planeX, planeY);
        pcRoutePath.setAttribute('d', buildRoutePath());
        updateRouteGradient();

        if (idleFrames >= IDLE_FRAMES && routePoints.length > 0 && !pressState && !interactState) {
          if (idleFrames % 4 === 0) fadeRoute();
        }
      }

      if (!pressState) setMotionState(speed);

      requestAnimationFrame(planeLoop);
    }
    planeLoop();
  }

  /* 按钮涟漪 */
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest('.btn, .filter-btn, .view-btn');
    if (!btn || reduceMotion) return;
    var rect = btn.getBoundingClientRect();
    var ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.left = ev.clientX - rect.left + 'px';
    ripple.style.top = ev.clientY - rect.top + 'px';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(function () {
      ripple.remove();
    }, 600);
  });
})();
