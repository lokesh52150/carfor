/* CARFOR — compare page */
(function () {
  'use strict';

  var ROWS = [
    { label: 'Starting price', best: 'min', get: function (c) { return c.price; }, fmt: function (c) { return CarFor.lakh(c.price); } },
    { label: 'Top price', best: null, get: function (c) { return c.priceMax; }, fmt: function (c) { return CarFor.lakh(c.priceMax); } },
    { label: 'Body type', best: null, get: null, fmt: function (c) { return c.type; } },
    { label: 'Engine', best: null, get: null, fmt: function (c) { return c.engine; } },
    { label: 'Power', best: 'max', get: function (c) { return parseFloat(c.power); }, fmt: function (c) { return c.power; } },
    { label: 'Torque', best: 'max', get: function (c) { return parseFloat(c.torque); }, fmt: function (c) { return c.torque; } },
    { label: 'Mileage', best: 'max', get: function (c) { return parseFloat(c.mileage); }, fmt: function (c) { return c.mileage; } },
    { label: 'Seating', best: 'max', get: function (c) { return c.seating; }, fmt: function (c) { return c.seating + ' seats'; } },
    { label: 'Boot space', best: null, get: null, fmt: function (c) { return c.boot; } },
    { label: 'Ground clearance', best: 'max', get: function (c) { return parseFloat(c.ground); }, fmt: function (c) { return c.ground; } },
    { label: 'Safety rating', best: 'max', get: function (c) { return parseFloat(c.safety); }, fmt: function (c) { return c.safety; } },
    { label: 'Fuel options', best: null, get: null, fmt: function (c) { return c.fuel.join(', '); } },
    { label: 'Transmissions', best: null, get: null, fmt: function (c) { return c.transmissions.join(', '); } },
    { label: 'Rating', best: 'max', get: function (c) { return c.rating; }, fmt: function (c) { return '★ ' + c.rating.toFixed(1) + ' (' + c.reviews + ')'; } }
  ];

  function ids() {
    var q = new URLSearchParams(location.search).get('ids');
    if (q) {
      var list = q.split(',').filter(Boolean).slice(0, 3);
      try { localStorage.setItem('carfor_compare', JSON.stringify(list)); } catch (e) { }
      return list;
    }
    return CarFor.compare.read();
  }

  function save(list) {
    try { localStorage.setItem('carfor_compare', JSON.stringify(list)); } catch (e) { }
    var badge = document.querySelector('[data-compare-badge]');
    if (badge) { badge.textContent = list.length; badge.style.display = list.length ? 'inline-flex' : 'none'; }
  }

  function render() {
    var list = ids().map(function (i) { return CarDB.byId(i); }).filter(Boolean);
    var table = document.getElementById('cmp-table');
    var empty = document.getElementById('cmp-empty');
    var head = document.getElementById('cmp-head');
    var body = document.getElementById('cmp-body');

    if (!list.length) {
      table.hidden = true; empty.hidden = false; return;
    }
    table.hidden = false; empty.hidden = true;

    head.innerHTML = '<th></th>' + list.map(function (c) {
      return '<th class="ccar">' +
        CarArt.car({ body: c.body, color: c.colors[0], accent: '#e8c972', uid: 'cp' + c.id.replace(/[^a-z0-9]/g, ''), label: c.brand + ' ' + c.model }) +
        '<div style="margin-top:8px"><a href="car.html?id=' + c.id + '"><strong>' + c.brand + ' ' + c.model + '</strong></a>' +
        '<div class="dim" style="font-size:.8rem">' + c.type + '</div>' +
        '<button class="rm" data-rm="' + c.id + '" style="margin-top:8px">Remove</button></div></th>';
    }).join('');

    body.innerHTML = ROWS.map(function (row) {
      var vals = list.map(function (c) { return row.get ? row.get(c) : null; });
      var bestIdx = -1;
      if (row.best === 'max') {
        var mx = Math.max.apply(null, vals.map(function (v) { return v == null ? -Infinity : v; }));
        bestIdx = vals.indexOf(mx);
      } else if (row.best === 'min') {
        var mn = Math.min.apply(null, vals.map(function (v) { return v == null ? Infinity : v; }));
        bestIdx = vals.indexOf(mn);
      }
      return '<tr><th>' + row.label + '</th>' + list.map(function (c, i) {
        var cls = (i === bestIdx && list.length > 1) ? ' class="best"' : '';
        return '<td' + cls + '>' + row.fmt(c) + '</td>';
      }).join('') + '</tr>';
    }).join('');

    body.querySelectorAll('[data-rm]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-rm');
        save(ids().filter(function (x) { return x !== id; }));
        history.replaceState(null, '', location.pathname);
        render();
        CarFor.toast('Removed from compare', 'ok');
      });
    });
  }

  function quickAdd() {
    var wrap = document.getElementById('quick-tags');
    var chosen = ids();
    var pool = CarDB.cars.filter(function (c) { return chosen.indexOf(c.id) === -1; }).slice(0, 12);
    wrap.innerHTML = pool.map(function (c) {
      return '<button class="tag-btn" data-add="' + c.id + '">+ ' + c.brand + ' ' + c.model + '</button>';
    }).join('');
    wrap.querySelectorAll('[data-add]').forEach(function (b) {
      b.addEventListener('click', function () {
        var cur = ids();
        if (cur.length >= 3) { CarFor.toast('Compare up to 3 cars at a time', 'warn'); return; }
        cur.push(b.getAttribute('data-add'));
        save(cur);
        render();
        quickAdd();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var init = ids();
    if (init.length) { save(init); }
    render();
    quickAdd();
  });
})();
