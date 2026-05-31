(function () {
  var cfg = window.SITE_CONFIG;
  if (!cfg) return;

  var splashCfg = cfg.splash || {};
  var splash = document.getElementById('site-splash');
  if (!splash) return;

  var STORAGE_KEY = String(splashCfg.storageKey || 'zxt-portfolio-splash').trim();
  var enabled = splashCfg.enabled !== false;
  var oncePerSession = splashCfg.oncePerSession !== false;
  var readyDelay = Math.max(800, Number(splashCfg.readyDelay) || 2400);
  var exitDuration = Math.max(400, Number(splashCfg.exitDuration) || 1000);
  var reduceMotion = false;

  var eyebrowEl = document.getElementById('splash-eyebrow');
  var welcomeLine1El = document.getElementById('splash-welcome-line1');
  var welcomeLine2El = document.getElementById('splash-welcome-line2');
  var subtitleEl = document.getElementById('splash-subtitle');
  var hintsEl = document.getElementById('splash-hints');
  var enterBtn = document.getElementById('splash-enter');
  var hintEl = document.getElementById('splash-hint');
  var progressEl = document.getElementById('splash-progress');
  var progressBar = document.getElementById('splash-progress-bar');
  var progressLabel = document.getElementById('splash-progress-label');
  var returnBtn = document.getElementById('btn-splash-return');
  var returnLabelEl = document.getElementById('splash-return-label');
  var steps = Array.isArray(splashCfg.progressSteps) ? splashCfg.progressSteps : ['ROUTE', 'LOAD', 'READY'];

  var exiting = false;
  var readyTimer = null;
  var progressTimer = null;
  var stepIndex = 0;
  var keyHandler = null;

  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function shouldAutoShow() {
    if (!enabled) return false;
    if (!oncePerSession) return true;
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== '1';
    } catch (err) {
      return true;
    }
  }

  function renderWelcomeChars(el, text, baseDelay) {
    if (!el || !text) return;
    var chars = text.split('');
    var html = '';
    var i;
    for (i = 0; i < chars.length; i++) {
      html +=
        '<span class="site-splash__char" style="animation-delay:' +
        (baseDelay + i * 0.07) +
        's">' +
        escapeHtml(chars[i]) +
        '</span>';
    }
    el.innerHTML = html;
  }

  function populateContent() {
    var eyebrow = String(splashCfg.eyebrow || '求职作品集').trim();
    var welcomeLine1 = String(splashCfg.welcomeLine1 || '欢迎').trim();
    var welcomeLine2 = String(splashCfg.welcomeLine2 || '').trim();
    var welcomeFont = String(splashCfg.welcomeFont || 'Ma Shan Zheng').trim();
    var subtitle = String(splashCfg.subtitle || '即将进入作品集站点').trim();
    var hints = Array.isArray(splashCfg.hints) ? splashCfg.hints : [
      '作品与交互体验一览',
      '面向面试官快速浏览',
      '纸飞机已就绪，随时出发',
    ];
    var enterLabel = String(splashCfg.enterLabel || '进入站点').trim();
    var hint = String(splashCfg.hint || 'Enter 进入').trim();
    var returnLabel = String(splashCfg.returnLabel || '启动页').trim();

    if (eyebrowEl) eyebrowEl.textContent = eyebrow;
    if (welcomeLine1El) {
      welcomeLine1El.style.fontFamily = "'" + welcomeFont + "', 'STKaiti', 'KaiTi', cursive";
    }
    if (welcomeLine2El && welcomeLine2) {
      welcomeLine2El.style.fontFamily = "'" + welcomeFont + "', 'STKaiti', 'KaiTi', cursive";
    }
    renderWelcomeChars(welcomeLine1El, welcomeLine1, 0.45);
    if (welcomeLine2El) {
      if (welcomeLine2) {
        welcomeLine2El.hidden = false;
        renderWelcomeChars(welcomeLine2El, welcomeLine2, 0.62);
      } else {
        welcomeLine2El.hidden = true;
        welcomeLine2El.innerHTML = '';
      }
    }
    if (subtitleEl) subtitleEl.textContent = subtitle;
    if (enterBtn) enterBtn.textContent = enterLabel;
    if (hintEl) hintEl.textContent = hint;
    if (returnLabelEl) returnLabelEl.textContent = returnLabel;
    if (returnBtn) returnBtn.setAttribute('aria-label', '返回' + returnLabel);

    if (hintsEl && hints.length) {
      var hh = '';
      var j;
      for (j = 0; j < Math.min(hints.length, 3); j++) {
        hh +=
          '<li class="site-splash__hint-item" style="animation-delay:' +
          (0.78 + j * 0.1) +
          's">' +
          escapeHtml(hints[j]) +
          '</li>';
      }
      hintsEl.innerHTML = hh;
    }
  }

  function setProgress(value, label) {
    if (progressBar) progressBar.style.width = Math.min(100, Math.max(0, value)) + '%';
    if (progressEl) progressEl.setAttribute('aria-valuenow', String(Math.round(value)));
    if (progressLabel && label) progressLabel.textContent = label;
  }

  function clearTimers() {
    clearTimeout(readyTimer);
    clearInterval(progressTimer);
    readyTimer = null;
    progressTimer = null;
  }

  function markSeen() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (err) {}
  }

  function revealHero() {
    revealHeroStaggered(false);
  }

  function revealHeroStaggered(stagger) {
    var heroReveals = document.querySelectorAll('.hero .reveal');
    var k;
    for (k = 0; k < heroReveals.length; k++) {
      if (stagger && !reduceMotion) {
        (function (el, delay) {
          setTimeout(function () {
            el.classList.add('is-visible');
          }, delay);
        })(heroReveals[k], 180 + k * 110);
      } else {
        heroReveals[k].classList.add('is-visible');
      }
    }
  }

  function resetSplashUi() {
    exiting = false;
    stepIndex = 0;
    splash.classList.remove('is-exiting', 'is-active');
    if (enterBtn) {
      enterBtn.disabled = true;
      enterBtn.classList.remove('is-ready');
    }
    if (progressEl) progressEl.classList.remove('is-complete');
    setProgress(0, steps[0] || 'INIT');
    if (progressBar) progressBar.style.width = '0%';

    var animated = splash.querySelectorAll(
      '.site-splash__route-path, .site-splash__plane, .site-splash__panel, .site-splash__orbit, .site-splash__scribble, .site-splash__subtitle, .site-splash__char'
    );
    var i;
    for (i = 0; i < animated.length; i++) {
      animated[i].style.animation = 'none';
      void animated[i].offsetWidth;
      animated[i].style.animation = '';
    }
  }

  function bindKeyHandler() {
    unbindKeyHandler();
    keyHandler = function (ev) {
      if (!document.body.classList.contains('is-splash-active')) return;
      if (ev.key === 'Enter' && enterBtn && !enterBtn.disabled) {
        ev.preventDefault();
        finishSplash();
      }
    };
    document.addEventListener('keydown', keyHandler);
  }

  function unbindKeyHandler() {
    if (keyHandler) {
      document.removeEventListener('keydown', keyHandler);
      keyHandler = null;
    }
  }

  function finishSplash() {
    if (exiting || !document.body.classList.contains('is-splash-active')) return;
    exiting = true;
    markSeen();
    clearTimers();
    unbindKeyHandler();

    splash.classList.add('is-exiting');
    splash.setAttribute('aria-hidden', 'true');
    document.body.classList.add('is-splash-leaving');

    requestAnimationFrame(function () {
      document.body.classList.remove('is-splash-active');
    });

    var done = function () {
      splash.hidden = true;
      splash.classList.remove('is-exiting', 'is-active');
      document.body.classList.remove('is-splash-leaving');
      document.body.classList.add('is-page-entered');
      exiting = false;
      window.dispatchEvent(new CustomEvent('splash:done'));
    };

    if (reduceMotion) {
      revealHeroStaggered(false);
      done();
      return;
    }

    setTimeout(function () {
      revealHeroStaggered(true);
    }, Math.floor(exitDuration * 0.28));

    setTimeout(done, exitDuration);
  }

  function enableEnter() {
    if (!enterBtn) return;
    enterBtn.disabled = false;
    enterBtn.classList.add('is-ready');
    setProgress(100, steps[steps.length - 1] || 'READY');
    if (progressEl) progressEl.classList.add('is-complete');
  }

  function runProgress() {
    if (reduceMotion) {
      setProgress(100, steps[steps.length - 1] || 'READY');
      enableEnter();
      return;
    }

    var total = readyDelay;
    var started = performance.now();
    setProgress(0, steps[0] || 'INIT');

    progressTimer = setInterval(function () {
      var elapsed = performance.now() - started;
      var pct = Math.min(100, (elapsed / total) * 100);
      var nextStep = Math.min(steps.length - 1, Math.floor((pct / 100) * steps.length));
      if (nextStep !== stepIndex) {
        stepIndex = nextStep;
      }
      setProgress(pct, steps[stepIndex] || steps[steps.length - 1] || 'READY');
      if (elapsed >= total) {
        clearInterval(progressTimer);
        progressTimer = null;
        enableEnter();
      }
    }, 40);
  }

  function openSplash() {
    if (!enabled) return;

    var nav = document.getElementById('nav-links');
    if (nav) nav.classList.remove('is-open');

    clearTimers();
    resetSplashUi();
    populateContent();

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

    document.body.classList.remove('is-page-entered', 'is-splash-leaving');
    document.body.classList.add('is-splash-active');
    splash.hidden = false;
    splash.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(function () {
      splash.classList.add('is-active');
      runProgress();
      readyTimer = setTimeout(enableEnter, readyDelay);
    });

    bindKeyHandler();
  }

  function setupReturnButton() {
    if (!returnBtn || !enabled) return;
    returnBtn.hidden = false;
    returnBtn.addEventListener('click', function () {
      openSplash();
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', finishSplash);
  }

  populateContent();
  setupReturnButton();

  window.SiteSplash = {
    open: openSplash,
    close: finishSplash,
    isEnabled: function () {
      return enabled;
    },
  };

  if (shouldAutoShow()) {
    openSplash();
  } else {
    splash.hidden = true;
    splash.setAttribute('aria-hidden', 'true');
    document.body.classList.add('is-page-entered');
  }
})();
