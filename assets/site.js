/* =========================================================================
   藍・W・楽歌 Official Site — 共通スクリプト
   - ハンバーガーメニュー（Escape・フォーカス復帰つき）
   - data/schedule.json から番組表を描画（PC=表 / スマホ=リスト）
   - data/updates.json から更新情報を描画
   - GA4 イベント送信
   DOM生成は textContent のみ。innerHTML へ外部データを流し込まないこと。
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------- ナビ ---------------- */
  var nav = document.getElementById('siteNav');
  if (nav) {
    var burger = nav.querySelector('.burger');
    var menu = nav.querySelector('.nav-menu');

    var setOpen = function (open) {
      nav.setAttribute('data-open', String(open));
      if (burger) {
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      }
    };

    if (burger) {
      burger.addEventListener('click', function () {
        setOpen(nav.getAttribute('data-open') !== 'true');
      });
    }
    if (menu) {
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        setOpen(false);
        if (burger) burger.focus();
      }
    });
  }

  /* ---------------- GA4 ---------------- */
  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-analytics-event]');
    if (!link || typeof window.gtag !== 'function') return;
    var name = link.getAttribute('data-analytics-event');
    if (!/^[a-z][a-z0-9_]{0,39}$/.test(name)) return;
    window.gtag('event', name, {
      link_text: link.textContent.trim().replace(/\s+/g, ' ').slice(0, 100),
      link_url: link.href || ''
    });
  });

  /* ---------------- 小さなDOMヘルパ ---------------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = String(text);
    return n;
  }

  function getJSON(path) {
    return fetch(path + '?ts=' + Date.now(), { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('load failed: ' + path);
      return r.json();
    });
  }

  var SAFE_HREF = /^(?:#|\/(?!\/)|https?:\/\/)/;
  var DOW_JP = ['日', '月', '火', '水', '木', '金', '土'];

  /* range の先頭日を週の起点として、まだ始まっていない最初の放送を出す */
  function renderNextOnAir(data) {
    var node = document.getElementById('nextOnAir');
    if (!node) return;

    var m = /(\d{4})\.(\d{2})\.(\d{2})/.exec(String(data.range || ''));
    if (!m) return;
    var start = new Date(+m[1], +m[2] - 1, +m[3]);
    if (isNaN(start.getTime())) return;

    var now = new Date();
    var found = null;

    (Array.isArray(data.days) ? data.days : []).forEach(function (d, i) {
      if (found || d.off) return;
      var hm = /^(\d{1,2}):(\d{2})$/.exec(String(d.time || ''));
      if (!hm) return;                       /* 「未定」などは対象外 */
      var when = new Date(start.getTime());
      when.setDate(start.getDate() + i);
      when.setHours(+hm[1], +hm[2], 0, 0);
      if (when > now) found = { when: when, day: d };
    });

    if (!found) { node.textContent = '次回の放送は準備中です'; return; }

    var p2 = function (n) { return (n < 10 ? '0' : '') + n; };
    node.textContent =
      p2(found.when.getMonth() + 1) + '.' + p2(found.when.getDate()) +
      ' ' + DOW_JP[found.when.getDay()] +
      ' ' + found.day.time + ' ／ ' + (found.day.title || '');
  }

  var KIND_CLASS = { radio: 'radio', sing: 'sing', act: 'act', game: 'game', vlog: 'vlog', sp: 'sp' };
  var KIND_SWATCH = {
    radio: 'sw-radio', sing: 'sw-sing', act: 'sw-act',
    game: 'sw-game', vlog: 'sw-vlog', sp: 'sw-sp'
  };

  /* ---------------- 番組表 ---------------- */
  function renderWeek(data) {
    var days = Array.isArray(data.days) ? data.days : [];
    if (!days.length) return;

    renderNextOnAir(data);

    var period = document.getElementById('weekPeriod');
    if (period && data.range) period.textContent = data.range;
    var issue = document.getElementById('issueRange');
    if (issue && data.range) issue.textContent = data.range + ' ／ WEEKLY SCHEDULE';

    /* PC：7列の表 */
    var week = document.getElementById('week');
    if (week) {
      week.textContent = '';
      days.forEach(function (d) {
        var cell = el('div', 'day' + (d.off ? ' off' : ''));
        var head = el('div', 'day-head');
        head.appendChild(el('span', 'd', d.date));
        head.appendChild(el('span', 'w', d.dow));
        cell.appendChild(head);

        if (d.off) {
          cell.appendChild(el('p', 'off-txt', d.off));
        } else {
          var prog = el('div', 'prog ' + (KIND_CLASS[d.kind] || 'radio'));
          if (d.time) prog.appendChild(el('div', 'time', d.time));
          prog.appendChild(el('div', 'ttl', d.title || ''));
          if (d.genre) prog.appendChild(el('div', 'gen', d.genre));
          cell.appendChild(prog);
        }
        week.appendChild(cell);
      });
    }

    /* スマホ：7日ぶんを縦に並べる。放送のない日も1行として出し、列を揃える */
    var list = document.getElementById('weekList');
    if (list) {
      list.textContent = '';
      days.forEach(function (d) {
        var li = document.createElement('li');
        if (d.off) li.className = 'off';
        var row = el('div', 'row');
        row.appendChild(el('span', 'date', d.date));
        row.appendChild(el('span', 'dow', d.dow || ''));
        row.appendChild(el('span', 'time', d.off ? '' : (d.time || '')));
        row.appendChild(el('span', 'ttl', d.off ? String(d.off) : (d.title || '')));
        var dot = el('span', 'dot' + (d.off ? '' : ' ' + (KIND_SWATCH[d.kind] || 'sw-radio')));
        dot.setAttribute('aria-hidden', 'true');
        row.appendChild(dot);
        li.appendChild(row);
        list.appendChild(li);
      });
    }
  }

  /* ---------------- 更新情報 ---------------- */
  function renderUpdates(data) {
    var items = Array.isArray(data.items)
      ? data.items.filter(function (i) { return i.date && i.displayDate && i.text; }).slice(0, 5)
      : [];
    if (!items.length) return;

    var list = document.getElementById('updatesList');
    if (!list) return;
    list.textContent = '';

    items.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = SAFE_HREF.test(item.href || '') ? item.href : '#site-updates';

      var time = document.createElement('time');
      time.dateTime = item.date;
      time.textContent = item.displayDate;

      var arrow = el('span', 'arrow', '→');
      arrow.setAttribute('aria-hidden', 'true');

      a.appendChild(time);
      a.appendChild(el('span', null, item.text));
      a.appendChild(arrow);
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ---------------- 起動 ---------------- */
  var base = document.body.getAttribute('data-base') || '';

  if (document.getElementById('week') || document.getElementById('weekList')) {
    getJSON(base + 'data/schedule.json').then(renderWeek).catch(function () { /* HTMLの初期値を残す */ });
  }
  if (document.getElementById('updatesList')) {
    getJSON(base + 'data/updates.json').then(renderUpdates).catch(function () { /* 同上 */ });
  }
})();
