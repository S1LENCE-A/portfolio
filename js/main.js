(function () {
  var cfg = window.SITE_CONFIG;
  if (!cfg || typeof cfg !== 'object') {
    document.body.innerHTML = '<p style="padding:40px">未找到 js/config.js</p>';
    return;
  }

  var profile = cfg.profile || {};
  var about = cfg.about || {};
  var contact = cfg.contact || {};
  var skills = Array.isArray(cfg.skills) ? cfg.skills : [];
  var skillGroups = Array.isArray(cfg.skillGroups) ? cfg.skillGroups : [];
  var experience = Array.isArray(cfg.experience) ? cfg.experience : [];
  var links = Array.isArray(cfg.links) ? cfg.links : [];
  var worksCfg = cfg.works || {};
  var lineArt = window.LINE_ART || {};
  var footer = String(cfg.footer || '').trim();
  var themeCfg = cfg.theme || {};

  function applyTheme() {
    var root = document.documentElement;
    var accent = String(themeCfg.accent || '#e07a5f').trim();
    var accent2 = String(themeCfg.accent2 || '#3d8b8b').trim();
    var accent3 = String(themeCfg.accent3 || '#d4a054').trim();
    var pattern = String(themeCfg.pattern || 'grid').trim();
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent2', accent2);
    root.style.setProperty('--accent3', accent3);
    root.style.setProperty('--accent-soft', 'color-mix(in srgb, ' + accent + ' 14%, transparent)');
    root.style.setProperty('--accent2-soft', 'color-mix(in srgb, ' + accent2 + ' 14%, transparent)');
    root.style.setProperty('--shadow-color', 'color-mix(in srgb, ' + accent + ' 35%, #000)');
    document.body.setAttribute('data-pattern', pattern);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', accent);
  }
  applyTheme();

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  var name = String(profile.name || '').trim();
  var role = String(profile.role || '').trim();

  setText('profile-name', name);
  setText('profile-role', role);
  setText('profile-headline', String(profile.headline || '').trim());

  var heroIntroEl = document.getElementById('hero-intro');
  var heroIntroLabelEl = document.getElementById('hero-intro-label');
  var heroIntro = String(profile.heroIntro || '').trim();
  var heroIntroLabel = String(profile.heroIntroLabel || '关于我').trim();
  if (heroIntroLabelEl) heroIntroLabelEl.textContent = heroIntroLabel;
  if (heroIntroEl) {
    if (heroIntro) {
      heroIntroEl.textContent = heroIntro;
    } else {
      var introBlock = heroIntroEl.closest('.hero-profile__body');
      if (introBlock) introBlock.hidden = true;
    }
  }

  var pillsEl = document.getElementById('hero-pills');
  if (pillsEl && role) {
    var parts = role.split(/[·\/|]/).map(function (s) {
      return String(s || '').trim();
    }).filter(Boolean);
    pillsEl.innerHTML = parts
      .slice(0, 4)
      .map(function (p) {
        return '<span class="hero-pill">' + escapeHtml(p) + '</span>';
      })
      .join('');
  }

  setText('about-title', String(about.title || '关于').trim());
  var aboutTextRaw = String(about.text || '').trim();
  setText('about-text', aboutTextRaw);
  setText('works-section-title', String(worksCfg.sectionTitle || '作品').trim());
  setText('works-section-sub', String(worksCfg.sectionSubtitle || 'WORKS').trim());
  setText('contact-title', String(contact.title || '联系').trim());
  setText('contact-note', String(contact.note || '').trim());
  if (footer) setText('site-footer', footer);
  document.title = (name || '简历') + ' · 作品集';

  var contactDetails = document.getElementById('contact-details');
  if (contactDetails) {
    var loc = String(profile.location || '').trim();
    var email = String(profile.email || '').trim();
    var phone = String(profile.phone || '').trim();
    var detailItems = [];
    if (loc) detailItems.push({ label: '所在地', value: loc });
    if (email) {
      detailItems.push({ label: '邮箱', value: email, href: 'mailto:' + email });
    }
    if (phone) {
      detailItems.push({ label: '电话', value: phone });
    }
    if (detailItems.length) {
      contactDetails.innerHTML = detailItems
        .map(function (item) {
          var valueHtml = item.href
            ? '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.value) + '</a>'
            : escapeHtml(item.value);
          return (
            '<li class="contact-detail">' +
            '<span class="contact-detail-label">' +
            escapeHtml(item.label) +
            '</span>' +
            '<span class="contact-detail-value">' +
            valueHtml +
            '</span></li>'
          );
        })
        .join('');
    } else {
      contactDetails.hidden = true;
    }
  }

  var availEl = document.getElementById('hero-availability');
  var availability = String(profile.availability || '').trim();
  if (availEl && availability) {
    availEl.textContent = availability;
    availEl.hidden = false;
  }

  var heroHighlights = document.getElementById('hero-highlights');
  var hl = Array.isArray(profile.highlights) ? profile.highlights : [];
  if (heroHighlights && hl.length) {
    heroHighlights.innerHTML = hl
      .map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      })
      .join('');
    heroHighlights.hidden = false;
  }

  var statsEl = document.getElementById('hero-stats');
  var stats = Array.isArray(profile.stats) ? profile.stats : [];
  if (statsEl && stats.length) {
    statsEl.innerHTML = stats
      .map(function (st, i) {
        var val = Number(st.value) || 0;
        var suffix = String(st.suffix || '').trim();
        return (
          '<div class="hero-stat reveal" style="transition-delay:' +
          i * 0.08 +
          's">' +
          '<span class="hero-stat-value" data-stat-value="' +
          val +
          '" data-stat-suffix="' +
          escapeHtml(suffix) +
          '">0' +
          escapeHtml(suffix) +
          '</span>' +
          '<span class="hero-stat-label">' +
          escapeHtml(st.label || '') +
          '</span></div>'
        );
      })
      .join('');
    statsEl.hidden = false;
  }

  var stackEl = document.getElementById('hero-stack');
  var stackList = Array.isArray(profile.heroStack) ? profile.heroStack : [];
  if (stackEl && stackList.length) {
    stackEl.innerHTML = stackList
      .map(function (tag, i) {
        return (
          '<span class="hero-stack__tag" style="animation-delay:' +
          i * 0.05 +
          's">' +
          escapeHtml(tag) +
          '</span>'
        );
      })
      .join('');
    stackEl.hidden = false;
  }

  var focusEl = document.getElementById('hero-focus');
  var focusList = Array.isArray(profile.heroFocus) ? profile.heroFocus : [];
  if (focusEl && focusList.length) {
    focusEl.innerHTML = focusList
      .map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      })
      .join('');
    focusEl.hidden = false;
  }

  var profileFoot = document.getElementById('hero-profile-foot');
  if (profileFoot && links.length) {
    profileFoot.innerHTML = links
      .slice(0, 2)
      .map(function (lk) {
        return (
          '<a href="' +
          escapeHtml(lk.url || '#') +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(lk.label || '') +
          ' →</a>'
        );
      })
      .join('');
    profileFoot.hidden = false;
  }

  var aboutExtras = document.getElementById('about-extras');
  var aboutHighlights = document.getElementById('about-highlights');
  var aboutHl = Array.isArray(about.highlights) ? about.highlights : [];
  if (aboutExtras && aboutHighlights && aboutHl.length) {
    aboutHighlights.innerHTML = aboutHl
      .map(function (item, i) {
        return (
          '<div class="about-card reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<h3>' +
          escapeHtml(item.title || '') +
          '</h3><p>' +
          escapeHtml(item.desc || '') +
          '</p></div>'
        );
      })
      .join('');
    aboutExtras.hidden = false;
  }

  var portraitSrc =
    String(profile.portraitImage || '').trim() || String(lineArt.portrait || '').trim();
  var portrait = document.getElementById('portrait');
  if (portrait && portraitSrc) {
    portrait.innerHTML =
      '<img src="' +
      escapeHtml(portraitSrc) +
      '" alt="' +
      escapeHtml(name) +
      ' 个人照片" />';
  }

  var resumePdf = String(profile.resumePdf || '').trim();
  var btnResume = document.getElementById('btn-resume');
  if (btnResume && resumePdf) {
    btnResume.href = resumePdf;
    btnResume.hidden = false;
  }

  var nav = document.getElementById('nav-links');
  if (nav) {
    var sections = [
      { href: '#about', label: '关于' },
      { href: '#skills', label: '技能' },
      { href: '#experience', label: '经历' },
      { href: '#works', label: '作品' },
      { href: '#contact', label: '联系' },
    ];
    nav.innerHTML = sections
      .map(function (s) {
        return (
          '<a href="' +
          s.href +
          '" data-nav="' +
          s.href.slice(1) +
          '">' +
          escapeHtml(s.label) +
          '</a>'
        );
      })
      .join('');
  }

  var skillsToolbar = document.getElementById('skills-toolbar');
  var skillsFilterEl = document.getElementById('skills-filter');
  if (skillsFilterEl && skillGroups.length > 1) {
    skillsFilterEl.innerHTML = skillGroups
      .map(function (g) {
        var id = String(g.id || '').trim();
        return (
          '<button type="button" class="filter-btn' +
          (id === 'all' ? ' is-active' : '') +
          '" data-skill-group="' +
          escapeHtml(id) +
          '" role="tab" aria-selected="' +
          (id === 'all') +
          '">' +
          escapeHtml(g.label || id) +
          '</button>'
        );
      })
      .join('');
    if (skillsToolbar) skillsToolbar.hidden = false;
  }

  var skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    if (!skills.length) {
      skillsGrid.innerHTML = '<p class="empty-hint">在 config.js 的 skills 中填写技能</p>';
    } else {
      skillsGrid.innerHTML = skills
        .map(function (sk, i) {
          var lvl = Math.min(100, Math.max(0, Number(sk.level) || 0));
          var note = String(sk.note || '').trim();
          var group = String(sk.group || '').trim();
          return (
            '<div class="skill-card reveal" style="transition-delay:' +
            i * 0.06 +
            's" data-level="' +
            lvl +
            '" data-accent="' +
            (i % 4) +
            '" data-group="' +
            escapeHtml(group) +
            '">' +
            '<div class="skill-top"><span class="skill-name">' +
            escapeHtml(sk.name || '') +
            '</span><span class="skill-pct">' +
            lvl +
            '%</span></div>' +
            '<div class="skill-bar"><div class="skill-bar-fill" style="--level:' +
            lvl +
            '%"></div></div>' +
            (note
              ? '<p class="skill-note">' + escapeHtml(note) + '</p>'
              : '<p class="skill-note"></p>') +
            '</div>'
          );
        })
        .join('');
    }
  }

  var timeline = document.getElementById('timeline');
  if (timeline) {
    if (!experience.length) {
      timeline.innerHTML = '<p class="empty-hint">在 config.js 的 experience 中填写经历</p>';
    } else {
      timeline.innerHTML = experience
        .map(function (exp, idx) {
          var id = String(exp.id || '').trim();
          var highlights = Array.isArray(exp.highlights) ? exp.highlights : [];
          var hl =
            highlights.length > 0
              ? '<ul>' +
                highlights
                  .map(function (h) {
                    return '<li>' + escapeHtml(h) + '</li>';
                  })
                  .join('') +
                '</ul>'
              : '';
          return (
            '<button type="button" class="exp-item reveal" data-exp-id="' +
            escapeHtml(id) +
            '" data-exp-index="' +
            idx +
            '" aria-expanded="false">' +
            '<span class="exp-dot" aria-hidden="true"></span>' +
            '<div class="exp-head">' +
            '<div><div class="exp-role">' +
            escapeHtml(exp.role || '') +
            '</div><div class="exp-company">' +
            escapeHtml(exp.company || '') +
            (exp.place ? ' · ' + escapeHtml(exp.place) : '') +
            '</div></div>' +
            '<span class="exp-period">' +
            escapeHtml(exp.period || '') +
            '</span>' +
            '<span class="exp-chevron" aria-hidden="true">⌄</span>' +
            '</div>' +
            '<div class="exp-body"><div class="exp-inner">' +
            '<p>' +
            escapeHtml(exp.summary || '') +
            '</p>' +
            hl +
            '</div></div></button>'
          );
        })
        .join('');
    }
  }

  var contactStatus = document.getElementById('contact-status');
  var statusList = Array.isArray(contact.status) ? contact.status : [];
  if (contactStatus && statusList.length) {
    contactStatus.innerHTML = statusList
      .map(function (st) {
        return (
          '<div class="contact-chip"><span class="contact-chip-label">' +
          escapeHtml(st.label || '') +
          '</span><span class="contact-chip-value">' +
          escapeHtml(st.value || '') +
          '</span></div>'
        );
      })
      .join('');
    contactStatus.hidden = false;
  }

  var contactActions = document.getElementById('contact-actions');
  if (contactActions) {
    var contactEmail = String(profile.email || '').trim();
    var html = '';
    if (contactEmail) {
      html +=
        '<a class="btn btn--fill" href="mailto:' +
        escapeHtml(contactEmail) +
        '">发送邮件</a>' +
        '<button type="button" class="btn btn--ghost" id="btn-copy-email" data-email="' +
        escapeHtml(contactEmail) +
        '">复制邮箱</button>';
    }
    contactActions.innerHTML = html;
  }

  var linkRow = document.getElementById('link-row');
  if (linkRow) {
    if (!links.length) {
      linkRow.hidden = true;
    } else {
      linkRow.innerHTML = links
        .map(function (lk) {
          return (
            '<a href="' +
            escapeHtml(lk.url || '#') +
            '" target="_blank" rel="noopener noreferrer">' +
            escapeHtml(lk.label || '') +
            '</a>'
          );
        })
        .join('');
    }
  }
})();
