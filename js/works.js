(function () {
  var cfg = window.SITE_CONFIG;
  if (!cfg || !cfg.works) return;

  var worksCfg = cfg.works;
  var categories = Array.isArray(worksCfg.categories) ? worksCfg.categories : [];
  var items = Array.isArray(worksCfg.items) ? worksCfg.items : [];

  var grid = document.getElementById('works-grid');
  var filterBar = document.getElementById('works-filter');
  var emptyEl = document.getElementById('works-empty');
  var lightbox = document.getElementById('lightbox');
  var lbVisual = document.getElementById('lb-visual');
  var lbSplashFx = document.getElementById('lb-splash-fx');
  var lbSplashTravel = document.getElementById('lb-splash-travel');
  var lbSplashDiet = document.getElementById('lb-splash-diet');
  var lbStarfield = document.getElementById('lb-starfield');
  var lbDietParticles = document.getElementById('lb-diet-particles');
  var lbFrameInner = document.getElementById('lb-frame-inner');
  var viewToggle = document.getElementById('view-toggle');
  var searchInput = document.getElementById('works-search');
  var worksMeta = document.getElementById('works-meta');

  var activeFilter = 'all';
  var searchQuery = '';
  var viewMode = 'grid';
  var currentWork = null;
  var currentImageIndex = 0;
  var SPLASH_CONFIG = {
    'work-travel': { theme: 'travel', launchSrc: 'travel-home-launch' },
    'work-diet': { theme: 'diet', launchSrc: 'diet-launch' },
  };
  var WORK_LB_THEMES = ['travel', 'diet', 'robot', 'portfolio', 'default'];
  var WORK_LB_THEME_MAP = {
    'work-travel': 'travel',
    'work-diet': 'diet',
    'work-robot': 'robot',
    'work-portfolio': 'portfolio',
  };

  var splashDietParticles = (function () {
    var canvas = null;
    var ctx = null;
    var dots = [];
    var raf = 0;
    var w = 0;
    var h = 0;
    var dpr = 1;
    var reduceMotion = false;

    try {
      reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    function buildScene() {
      dots = [];
      var count = Math.min(36, Math.max(16, Math.floor((w * h) / 18000)));
      var i;
      for (i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 2 + Math.random() * 5,
          dx: (Math.random() - 0.5) * 0.18,
          dy: -0.06 - Math.random() * 0.14,
          a: 0.12 + Math.random() * 0.22,
          ph: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      var rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: 0, height: 0 };
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
    }

    function draw(t) {
      if (!ctx) return;
      var time = (typeof t === 'number' ? t : performance.now()) * 0.001;
      ctx.clearRect(0, 0, w, h);
      var i;
      for (i = 0; i < dots.length; i++) {
        var d = dots[i];
        if (!reduceMotion) {
          d.x += d.dx;
          d.y += d.dy;
          if (d.y < -10) d.y = h + 10;
          if (d.x < -10) d.x = w + 10;
          if (d.x > w + 10) d.x = -10;
        }
        var pulse = reduceMotion ? 1 : 0.85 + 0.15 * Math.sin(time * 1.4 + d.ph);
        ctx.globalAlpha = d.a * pulse;
        ctx.fillStyle = 'rgba(95, 160, 110, 0.85)';
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop(t) {
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    return {
      bind: function (el) {
        canvas = el;
        if (!canvas || !canvas.getContext) return;
        ctx = canvas.getContext('2d', { alpha: true });
      },
      start: function () {
        if (!canvas || !ctx || reduceMotion) {
          resize();
          draw(0);
          return;
        }
        cancelAnimationFrame(raf);
        resize();
        raf = requestAnimationFrame(loop);
      },
      stop: function () {
        cancelAnimationFrame(raf);
        raf = 0;
      },
      resize: resize,
    };
  })();

  var splashStarfield = (function () {
    var canvas = null;
    var ctx = null;
    var stars = [];
    var lines = [];
    var raf = 0;
    var w = 0;
    var h = 0;
    var dpr = 1;
    var reduceMotion = false;

    try {
      reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    function mulberry32(a) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function buildScene() {
      stars = [];
      lines = [];
      var area = Math.max(1, w * h);
      var count = Math.min(120, Math.max(48, Math.floor(area / 9000)));
      var rand = mulberry32(((w * 73856093) ^ (h * 19349663)) >>> 0);
      var i;
      for (i = 0; i < count; i++) {
        stars.push({
          x: rand() * w,
          y: rand() * h,
          s: 0.24 + rand() * 0.55,
          a: 0.18 + rand() * 0.42,
          tw: 0.22 + rand() * 0.45,
          ph: rand() * Math.PI * 2,
        });
      }
      var groups = Math.min(12, Math.max(5, Math.floor(count / 48)));
      for (i = 0; i < groups; i++) {
        var cx = rand() * w;
        var cy = rand() * h;
        var spread = 16 + rand() * 60;
        var n = 4 + ((rand() * 3) | 0);
        var pts = [];
        var k;
        for (k = 0; k < n; k++) {
          pts.push({
            x: cx + (rand() - 0.5) * 2 * spread,
            y: cy + (rand() - 0.5) * 2 * spread,
          });
        }
        for (k = 0; k < pts.length - 1; k++) {
          lines.push({ x0: pts[k].x, y0: pts[k].y, x1: pts[k + 1].x, y1: pts[k + 1].y });
        }
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      var rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: 0, height: 0 };
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
    }

    function draw(t) {
      if (!ctx) return;
      var time = (typeof t === 'number' ? t : performance.now()) * 0.001;
      ctx.clearRect(0, 0, w, h);
      var i;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 0.6;
      for (i = 0; i < lines.length; i++) {
        var L = lines[i];
        ctx.beginPath();
        ctx.moveTo(L.x0, L.y0);
        ctx.lineTo(L.x1, L.y1);
        ctx.stroke();
      }
      for (i = 0; i < stars.length; i++) {
        var st = stars[i];
        var flick = reduceMotion ? 1 : 0.92 + 0.08 * Math.sin(time * st.tw + st.ph);
        ctx.globalAlpha = st.a * flick;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop(t) {
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    return {
      bind: function (el) {
        canvas = el;
        if (!canvas || !canvas.getContext) return;
        ctx = canvas.getContext('2d', { alpha: true });
      },
      start: function () {
        if (!canvas || !ctx || reduceMotion) {
          resize();
          draw(0);
          return;
        }
        cancelAnimationFrame(raf);
        resize();
        raf = requestAnimationFrame(loop);
      },
      stop: function () {
        cancelAnimationFrame(raf);
        raf = 0;
      },
      resize: resize,
    };
  })();

  if (lbStarfield) splashStarfield.bind(lbStarfield);
  if (lbDietParticles) splashDietParticles.bind(lbDietParticles);

  function getWorkLbTheme(work) {
    if (!work) return 'default';
    return WORK_LB_THEME_MAP[String(work.id || '')] || 'default';
  }

  function applyWorkLbTheme(work) {
    if (!lbVisual) return;
    var i;
    for (i = 0; i < WORK_LB_THEMES.length; i++) {
      lbVisual.classList.remove('lb-theme-' + WORK_LB_THEMES[i]);
    }
    lbVisual.classList.add('lb-theme-' + getWorkLbTheme(work));
  }

  function clearWorkLbTheme() {
    if (!lbVisual) return;
    var i;
    for (i = 0; i < WORK_LB_THEMES.length; i++) {
      lbVisual.classList.remove('lb-theme-' + WORK_LB_THEMES[i]);
    }
    lbVisual.classList.remove('is-splash-active');
  }

  function getSplashTheme(work, idx, src) {
    if (!work) return '';
    var cfg = SPLASH_CONFIG[String(work.id || '')];
    if (!cfg) return '';
    if (idx === 0) return cfg.theme;
    if (String(src || '').indexOf(cfg.launchSrc) >= 0) return cfg.theme;
    return '';
  }

  function setSplashFx(theme) {
    if (lbVisual) {
      lbVisual.classList.toggle('is-splash-active', !!theme);
    }
    if (lbSplashFx) {
      lbSplashFx.hidden = !theme;
      lbSplashFx.setAttribute('data-theme', theme || '');
    }
    if (lbSplashTravel) lbSplashTravel.hidden = theme !== 'travel';
    if (lbSplashDiet) lbSplashDiet.hidden = theme !== 'diet';
    splashStarfield.stop();
    splashDietParticles.stop();
    if (theme === 'travel') splashStarfield.start();
    if (theme === 'diet') splashDietParticles.start();
  }

  function replaySplashEnter() {
    if (!lbFrameInner) return;
    lbFrameInner.style.animation = 'none';
    void lbFrameInner.offsetWidth;
    lbFrameInner.style.animation = '';
    var img = document.getElementById('lb-image');
    if (img) {
      img.style.animation = 'none';
      void img.offsetWidth;
      img.style.animation = '';
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getWorkImages(work) {
    var list = [];
    var cover = String(work.cover || '').trim();
    var imgs = Array.isArray(work.images) ? work.images : [];
    var i;
    for (i = 0; i < imgs.length; i++) {
      var u = String(imgs[i] || '').trim();
      if (u) list.push(u);
    }
    if (!list.length && cover) list.push(cover);
    return list;
  }

  function workMatchesFilter(work) {
    if (activeFilter !== 'all' && String(work.category || '').trim() !== activeFilter) {
      return false;
    }
    var q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    var title = String(work.title || '').toLowerCase();
    var desc = String(work.description || '').toLowerCase();
    var role = String(work.role || '').toLowerCase();
    var tags = Array.isArray(work.tags) ? work.tags : [];
    var t;
    if (title.indexOf(q) >= 0 || desc.indexOf(q) >= 0 || role.indexOf(q) >= 0) return true;
    for (t = 0; t < tags.length; t++) {
      if (String(tags[t] || '').toLowerCase().indexOf(q) >= 0) return true;
    }
    return false;
  }

  function getVisibleWorks() {
    var list = [];
    var i;
    for (i = 0; i < items.length; i++) {
      if (workMatchesFilter(items[i])) list.push(items[i]);
    }
    return list;
  }

  function updateWorksMeta(count) {
    if (!worksMeta) return;
    var total = items.length;
    var q = searchQuery.trim();
    if (q) {
      worksMeta.textContent = '找到 ' + count + ' / ' + total + ' 个作品';
    } else if (activeFilter !== 'all') {
      worksMeta.textContent = '当前分类 ' + count + ' 个 · 共 ' + total + ' 个';
    } else {
      worksMeta.textContent = '共 ' + total + ' 个作品';
    }
  }

  function renderFilters() {
    if (!filterBar) return;
    var html = '';
    var i;
    for (i = 0; i < categories.length; i++) {
      var c = categories[i];
      var id = String(c.id || '').trim();
      var label = String(c.label || id).trim();
      if (!id) continue;
      html +=
        '<button type="button" class="filter-btn' +
        (id === activeFilter ? ' is-active' : '') +
        '" data-filter="' +
        escapeHtml(id) +
        '" role="tab" aria-selected="' +
        (id === activeFilter) +
        '">' +
        escapeHtml(label) +
        '</button>';
    }
    filterBar.innerHTML = html;
  }

  function renderGrid() {
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML = '';
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;

    var html = '';
    var visible = 0;
    var i;
    for (i = 0; i < items.length; i++) {
      var w = items[i];
      if (!workMatchesFilter(w)) continue;
      visible++;
      var id = String(w.id || 'work-' + i).trim();
      var title = String(w.title || '未命名').trim();
      var year = String(w.year || '').trim();
      var role = String(w.role || '').trim();
      var cover = String(w.cover || '').trim();
      var featured = !!w.featured;
      var desc = String(w.description || '').trim();
      var tags = Array.isArray(w.tags) ? w.tags : [];
      var tagHtml = '';
      var t;
      for (t = 0; t < tags.length; t++) {
        tagHtml += '<span class="work-tag">' + escapeHtml(tags[t]) + '</span>';
      }

      html +=
        '<button type="button" class="work-card work-card-theme-' +
        escapeHtml(getWorkLbTheme(w)) +
        (featured ? ' featured' : '') +
        '" data-work-id="' +
        escapeHtml(id) +
        '" style="animation-delay:' +
        visible * 0.05 +
        's" aria-label="查看：' +
        escapeHtml(title) +
        '">';
      html += '<div class="work-cover">';
      if (featured) html += '<span class="work-badge">FEATURED</span>';
      if (cover) {
        html +=
          '<img src="' +
          escapeHtml(cover) +
          '" alt="' +
          escapeHtml(title) +
          '" loading="lazy" />';
      } else {
        html += '<div class="work-cover--placeholder">NO IMAGE</div>';
      }
      html += '</div><div class="work-body">';
      if (year) html += '<span class="work-year">' + escapeHtml(year) + '</span>';
      html += '<h3 class="work-title">' + escapeHtml(title) + '</h3>';
      if (role) html += '<p class="work-role">' + escapeHtml(role) + '</p>';
      html += '<div class="work-tags">' + tagHtml + '</div>';
      if (desc) {
        html += '<p class="work-list-desc">' + escapeHtml(desc) + '</p>';
      }
      html += '</div></button>';
    }
    grid.innerHTML = html;
    updateWorksMeta(visible);

    if (!visible && emptyEl) {
      emptyEl.hidden = false;
      emptyEl.textContent = '当前分类下暂无作品';
    }
  }

  function findWork(id) {
    var i;
    for (i = 0; i < items.length; i++) {
      if (String(items[i].id || '') === id) return items[i];
    }
    return null;
  }

  function syncLightboxImageFit(imgEl) {
    if (!imgEl || !lbFrameInner) return;
    lbFrameInner.classList.remove('is-fit-width', 'is-fit-height');
    lbFrameInner.style.removeProperty('--lb-ar');

    function apply() {
      var nw = imgEl.naturalWidth;
      var nh = imgEl.naturalHeight;
      if (!nw || !nh) {
        nw = 1024;
        nh = 608;
      }
      lbFrameInner.style.setProperty('--lb-ar', nw + ' / ' + nh);
      var frame = lbFrameInner.closest('.lb-frame');
      var sw = frame ? frame.clientWidth : 0;
      var sh = frame ? frame.clientHeight : 0;
      if (sw <= 0 || sh <= 0) {
        requestAnimationFrame(apply);
        return;
      }
      if (nw / nh > sw / sh) {
        lbFrameInner.classList.add('is-fit-width');
      } else {
        lbFrameInner.classList.add('is-fit-height');
      }
    }

    imgEl.onload = function () {
      requestAnimationFrame(apply);
    };
    imgEl.onerror = function () {
      lbFrameInner.classList.add('is-fit-width');
    };
    if (imgEl.complete) {
      requestAnimationFrame(apply);
    }
  }

  function loadLightboxImage(imgEl, src) {
    if (!imgEl) return;
    var url = src;
    if (currentWork && src) {
      url =
        src +
        (src.indexOf('?') >= 0 ? '&' : '?') +
        'lb=' +
        encodeURIComponent(String(currentWork.id || 'work') + '-' + currentImageIndex);
    }
    if (imgEl.getAttribute('data-current-src') !== url) {
      imgEl.setAttribute('data-current-src', url);
      imgEl.src = url;
    } else {
      syncLightboxImageFit(imgEl);
    }
    imgEl.hidden = false;
    imgEl.alt = String((currentWork && currentWork.title) || '');
  }

  function openLightbox(work) {
    if (!lightbox || !work) return;
    currentWork = work;
    currentImageIndex = 0;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updateLightboxContent();
    requestAnimationFrame(function () {
      var imgEl = document.getElementById('lb-image');
      if (imgEl && imgEl.getAttribute('data-current-src')) {
        syncLightboxImageFit(imgEl);
      }
      var theme = getSplashTheme(work, 0, getWorkImages(work)[0] || '');
      if (theme === 'travel') splashStarfield.resize();
      if (theme === 'diet') splashDietParticles.resize();
    });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setSplashFx('');
    clearWorkLbTheme();
    currentWork = null;
  }

  function updateLightboxContent() {
    if (!currentWork) return;
    var imgs = getWorkImages(currentWork);
    if (!imgs.length) imgs = [''];

    var idx = currentImageIndex;
    if (idx >= imgs.length) idx = 0;
    currentImageIndex = idx;

    var imgEl = document.getElementById('lb-image');
    var titleEl = document.getElementById('lb-title');
    var metaEl = document.getElementById('lb-meta');
    var tagsEl = document.getElementById('lb-tags');
    var descEl = document.getElementById('lb-desc');
    var prevBtn = document.getElementById('lb-prev');
    var nextBtn = document.getElementById('lb-next');
    var dotsEl = document.getElementById('lb-dots');

    var src = imgs[idx];
    applyWorkLbTheme(currentWork);
    var splashTheme = getSplashTheme(currentWork, idx, src);
    setSplashFx(splashTheme);
    if (splashTheme) replaySplashEnter();

    if (imgEl) {
      if (src) {
        loadLightboxImage(imgEl, src);
      } else {
        imgEl.removeAttribute('src');
        imgEl.removeAttribute('data-current-src');
        imgEl.alt = '暂无图片';
        imgEl.hidden = true;
        if (lbFrameInner) {
          lbFrameInner.classList.remove('is-fit-width', 'is-fit-height');
          lbFrameInner.style.removeProperty('--lb-ar');
        }
      }
    }

    if (titleEl) titleEl.textContent = String(currentWork.title || '');
    if (metaEl) {
      var catLabel = '';
      var c;
      for (c = 0; c < categories.length; c++) {
        if (categories[c].id === currentWork.category) {
          catLabel = categories[c].label;
          break;
        }
      }
      var role = String(currentWork.role || '').trim();
      var parts = [];
      if (currentWork.year) parts.push(String(currentWork.year));
      if (catLabel) parts.push(catLabel);
      if (role) parts.push(role);
      metaEl.textContent = parts.join(' · ');
    }

    var counterEl = document.getElementById('lb-counter');

    if (tagsEl) {
      var tags = Array.isArray(currentWork.tags) ? currentWork.tags : [];
      var th = '';
      var t;
      for (t = 0; t < tags.length; t++) {
        th += '<span class="lb-tag">' + escapeHtml(tags[t]) + '</span>';
      }
      tagsEl.innerHTML = th;
    }

    if (descEl) descEl.textContent = String(currentWork.description || '');

    var multi = imgs.length > 1 && imgs[0];
    if (prevBtn) prevBtn.disabled = !multi;
    if (nextBtn) nextBtn.disabled = !multi;

    if (counterEl) {
      var counterParts = [];
      var visibleWorks = getVisibleWorks();
      var wi = -1;
      var wj;
      for (wj = 0; wj < visibleWorks.length; wj++) {
        if (String(visibleWorks[wj].id || '') === String(currentWork.id || '')) {
          wi = wj;
          break;
        }
      }
      if (visibleWorks.length > 1 && wi >= 0) {
        counterParts.push('作品 ' + (wi + 1) + ' / ' + visibleWorks.length);
      }
      if (multi) {
        counterParts.push('图 ' + (idx + 1) + ' / ' + imgs.length);
      }
      if (counterParts.length) {
        counterEl.textContent = counterParts.join(' · ');
        counterEl.hidden = false;
      } else {
        counterEl.hidden = true;
      }
    }

    if (dotsEl) {
      if (!multi) {
        dotsEl.innerHTML = '';
      } else {
        var dh = '';
        for (t = 0; t < imgs.length; t++) {
          dh +=
            '<button type="button" class="lb-dot' +
            (t === idx ? ' is-active' : '') +
            '" data-idx="' +
            t +
            '" aria-label="第' +
            (t + 1) +
            '张"></button>';
        }
        dotsEl.innerHTML = dh;
      }
    }
  }

  function stepImage(delta) {
    if (!currentWork) return;
    var imgs = getWorkImages(currentWork);
    if (imgs.length < 2) return;
    currentImageIndex = (currentImageIndex + delta + imgs.length) % imgs.length;
    updateLightboxContent();
  }

  function setViewMode(mode) {
    viewMode = mode === 'list' ? 'list' : 'grid';
    if (grid) grid.setAttribute('data-view-mode', viewMode);
    if (viewToggle) {
      var btns = viewToggle.querySelectorAll('.view-btn');
      var i;
      for (i = 0; i < btns.length; i++) {
        var on = btns[i].getAttribute('data-view') === viewMode;
        btns[i].classList.toggle('is-active', on);
        btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    }
  }

  if (searchInput) {
    var searchTimer = null;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        searchQuery = searchInput.value || '';
        renderGrid();
      }, 180);
    });
  }

  if (filterBar) {
    filterBar.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-filter]');
      if (!btn) return;
      activeFilter = btn.getAttribute('data-filter') || 'all';
      var btns = filterBar.querySelectorAll('.filter-btn');
      var j;
      for (j = 0; j < btns.length; j++) {
        var on = btns[j].getAttribute('data-filter') === activeFilter;
        btns[j].classList.toggle('is-active', on);
        btns[j].setAttribute('aria-selected', on ? 'true' : 'false');
      }
      renderGrid();
    });
  }

  if (viewToggle) {
    viewToggle.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-view]');
      if (!btn) return;
      setViewMode(btn.getAttribute('data-view'));
    });
  }

  if (grid) {
    grid.addEventListener('click', function (ev) {
      var card = ev.target.closest('[data-work-id]');
      if (!card) return;
      var work = findWork(card.getAttribute('data-work-id'));
      if (work) openLightbox(work);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (ev) {
      if (ev.target.hasAttribute('data-close')) closeLightbox();
      var dot = ev.target.closest('.lb-dot');
      if (dot) {
        currentImageIndex = parseInt(dot.getAttribute('data-idx'), 10) || 0;
        updateLightboxContent();
      }
    });
  }

  var prevBtn = document.getElementById('lb-prev');
  var nextBtn = document.getElementById('lb-next');
  if (prevBtn) prevBtn.addEventListener('click', function () { stepImage(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stepImage(1); });

  document.addEventListener('keydown', function (ev) {
    if (!lightbox || lightbox.hidden) return;
    if (ev.key === 'Escape') closeLightbox();
    if (ev.key === 'ArrowLeft') stepImage(-1);
    if (ev.key === 'ArrowRight') stepImage(1);
  });

  window.addEventListener('resize', function () {
    if (lbVisual && lbVisual.classList.contains('is-splash-active')) {
      if (lbVisual.classList.contains('lb-theme-travel')) splashStarfield.resize();
      if (lbVisual.classList.contains('lb-theme-diet')) splashDietParticles.resize();
    }
    var imgEl = document.getElementById('lb-image');
    if (lightbox && !lightbox.hidden && imgEl && imgEl.naturalWidth) {
      syncLightboxImageFit(imgEl);
    }
  });

  if (categories.length) {
    activeFilter = String(categories[0].id || 'all');
  }
  renderFilters();
  renderGrid();
  setViewMode('grid');

  window.SITE_WORKS = {
    openById: function (id) {
      var i;
      for (i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          openLightbox(items[i]);
          return;
        }
      }
    },
  };

  /* 作品卡片轻微 3D 倾斜 */
  if (grid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    grid.addEventListener('mousemove', function (ev) {
      var card = ev.target.closest('.work-card');
      var cards = grid.querySelectorAll('.work-card');
      var j;
      for (j = 0; j < cards.length; j++) {
        cards[j].style.setProperty('--tilt', '0deg');
      }
      if (!card) return;
      var r = card.getBoundingClientRect();
      var x = (ev.clientX - r.left) / r.width - 0.5;
      card.style.setProperty('--tilt', x * 2 + 'deg');
    });
  }
})();
