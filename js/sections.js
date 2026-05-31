(function () {
  var cfg = window.SITE_CONFIG;
  if (!cfg) return;

  var profile = cfg.profile || {};
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  /* Hero：副标题轮播 */
  var headlineEl = document.getElementById('profile-headline');
  var taglines = Array.isArray(profile.taglines) ? profile.taglines : [];
  var baseHeadline = String(profile.headline || '').trim();
  var rotateList = taglines.length ? taglines : baseHeadline ? [baseHeadline] : [];
  if (headlineEl && rotateList.length > 1 && !reduceMotion) {
    var hi = 0;
    headlineEl.textContent = rotateList[0];
    setInterval(function () {
      hi = (hi + 1) % rotateList.length;
      headlineEl.classList.add('is-switching');
      setTimeout(function () {
        headlineEl.textContent = rotateList[hi];
        headlineEl.classList.remove('is-switching');
      }, 220);
    }, 4200);
  }

  /* Hero：数据计数 */
  var statsEl = document.getElementById('hero-stats');
  function animateStat(el, target, suffix) {
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    var start = 0;
    var t0 = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - t0) / 900);
      var val = Math.round(start + (target - start) * p);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (statsEl && statsEl.children.length) {
    if ('IntersectionObserver' in window) {
      var statIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var nodes = statsEl.querySelectorAll('[data-stat-value]');
            var i;
            for (i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              if (node.getAttribute('data-done') === '1') continue;
              node.setAttribute('data-done', '1');
              animateStat(
                node,
                parseInt(node.getAttribute('data-stat-value'), 10) || 0,
                node.getAttribute('data-stat-suffix') || ''
              );
            }
            statIo.disconnect();
          });
        },
        { threshold: 0.4 }
      );
      statIo.observe(statsEl);
    }
  }

  /* About：长文展开 */
  var aboutText = document.getElementById('about-text');
  var aboutToggle = document.getElementById('about-toggle');
  if (aboutText && aboutToggle) {
    var fullText = aboutText.textContent || '';
    var limit = 160;
    if (fullText.length > limit) {
      aboutText.setAttribute('data-full', fullText);
      aboutText.textContent = fullText.slice(0, limit).trim() + '…';
      aboutText.classList.add('is-clamped');
      aboutToggle.hidden = false;
      aboutToggle.addEventListener('click', function () {
        var open = aboutText.classList.toggle('is-clamped');
        if (open) {
          aboutText.textContent = fullText.slice(0, limit).trim() + '…';
          aboutToggle.textContent = '展开全文';
        } else {
          aboutText.textContent = fullText;
          aboutToggle.textContent = '收起';
        }
      });
    }
  }

  /* Skills：分类筛选 */
  var skillsFilter = document.getElementById('skills-filter');
  var skillsGrid = document.getElementById('skills-grid');
  var skillsSummary = document.getElementById('skills-summary');
  var activeSkillGroup = 'all';

  function updateSkillsSummary() {
    if (!skillsSummary || !skillsGrid) return;
    var cards = skillsGrid.querySelectorAll('.skill-card');
    var visible = 0;
    var totalLevel = 0;
    var i;
    for (i = 0; i < cards.length; i++) {
      if (cards[i].hidden) continue;
      visible += 1;
      totalLevel += parseInt(cards[i].getAttribute('data-level'), 10) || 0;
    }
    if (!visible) {
      skillsSummary.textContent = '该分类暂无技能';
      return;
    }
    var avg = Math.round(totalLevel / visible);
    skillsSummary.textContent = '共 ' + visible + ' 项 · 平均熟练度 ' + avg + '%';
  }

  function filterSkills(group) {
    if (!skillsGrid) return;
    activeSkillGroup = group || 'all';
    var cards = skillsGrid.querySelectorAll('.skill-card');
    var i;
    for (i = 0; i < cards.length; i++) {
      var g = cards[i].getAttribute('data-group') || '';
      var show = activeSkillGroup === 'all' || g === activeSkillGroup;
      cards[i].hidden = !show;
      if (show) cards[i].classList.remove('is-filtered-out');
      else cards[i].classList.add('is-filtered-out');
    }
    if (skillsFilter) {
      var btns = skillsFilter.querySelectorAll('[data-skill-group]');
      for (i = 0; i < btns.length; i++) {
        var on = btns[i].getAttribute('data-skill-group') === activeSkillGroup;
        btns[i].classList.toggle('is-active', on);
        btns[i].setAttribute('aria-selected', on ? 'true' : 'false');
      }
    }
    updateSkillsSummary();
  }

  if (skillsFilter) {
    skillsFilter.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-skill-group]');
      if (!btn) return;
      filterSkills(btn.getAttribute('data-skill-group'));
    });
    filterSkills('all');
  }

  window.SITE_SECTIONS = {
    filterSkills: filterSkills,
    updateSkillsSummary: updateSkillsSummary,
  };
})();
