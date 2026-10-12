/* CARFOR — listings page: URL-synced filters */
(function () {
  'use strict';

  var els = {
    q: document.getElementById('f-q'),
    brand: document.getElementById('f-brand'),
    budget: document.getElementById('f-budget'),
    fuel: document.getElementById('f-fuel'),
    trans: document.getElementById('f-trans'),
    sort: document.getElementById('f-sort'),
    grid: document.getElementById('cars-grid'),
    empty: document.getElementById('empty'),
    count: document.getElementById('result-count'),
    tags: document.getElementById('active-tags')
  };

  function param(k) { return new URLSearchParams(location.search).get(k) || ''; }

  function readURL() {
    els.q.value = param('q');
    els.brand.value = param('brand');
    els.budget.value = param('budget');
    els.fuel.value = param('fuel');
    els.trans.value = param('trans');
    var s = param('sort');
    els.sort.value = s ? s : 'popular';
  }

  function writeURL() {
    var p = new URLSearchParams();
    if (els.q.value.trim()) { p.set('q', els.q.value.trim()); }
    if (els.brand.value) { p.set('brand', els.brand.value); }
    if (els.budget.value) { p.set('budget', els.budget.value); }
    if (els.fuel.value) { p.set('fuel', els.fuel.value); }
    if (els.trans.value) { p.set('trans', els.trans.value); }
    if (els.sort.value && els.sort.value !== 'popular') { p.set('sort', els.sort.value); }
    var qs = p.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
  }

  function parseBudget() {
    if (!els.budget.value) { return {}; }
    var parts = els.budget.value.split('-');
    return { min: Number(parts[0]) || 0, max: Number(parts[1]) || 0 };
  }

  function brands() {
    var list = CarDB.brands.slice();
    els.brand.innerHTML = '<option value="">All brands</option>' +
      list.map(function (b) { return '<option>' + b + '</option>'; }).join('');
  }

  function tags() {
    var t = [];
    if (els.brand.value) { t.push(els.brand.value); }
    if (els.fuel.value) { t.push(els.fuel.value); }
    if (els.trans.value) { t.push(els.trans.value); }
    if (els.budget.value) { t.push(els.budget.options[els.budget.selectedIndex].text); }
    if (els.q.value.trim()) { t.push('“' + els.q.value.trim() + '”'); }
    els.tags.innerHTML = t.map(function (x) { return '<span class="chip">' + x + '</span>'; }).join('');
  }

  function card(c) {
    return '<article class="card">' +
      '<div class="art-wrap">' +
      (c.featured ? '<span class="flag">Featured</span>' : '<span class="flag dark">' + c.type + '</span>') +
      CarArt.car({ body: c.body, color: c.colors[0], accent: '#e8c972', uid: 'c' + c.id.replace(/[^a-z0-9]/g, ''), label: c.brand + ' ' + c.model }) +
      '</div>' +
      '<div class="body">' +
      '<div class="toprow">' +
      '<div class="name">' + c.brand + ' ' + c.model + '<small>' + c.type + '</small></div>' +
      '<span class="rate">★ ' + c.rating.toFixed(1) + '</span>' +
      '</div>' +
      '<p class="tag">' + c.tagline + '</p>' +
      '<div class="specs">' +
      '<span class="chip">' + c.fuel[0] + '</span>' +
      '<span class="chip">' + c.transmissions[c.transmissions.length - 1] + '</span>' +
      '<span class="chip">' + c.mileage + '</span>' +
      '<span class="chip">' + c.seating + ' seats</span>' +
      '</div>' +
      '<div class="foot">' +
      '<div class="price">' + CarFor.lakh(c.price) + '<small>ex-showroom</small></div>' +
      '<div class="acts">' +
      '<a class="btn btn-s btn-sm" href="car.html?id=' + c.id + '">Details</a>' +
      '<button class="btn btn-p btn-sm" data-compare-toggle="' + c.id + '">Compare</button>' +
      '</div></div></div></article>';
  }

  function render() {
    var b = parseBudget();
    var res = CarDB.filter({
      q: els.q.value,
      brands: els.brand.value ? [els.brand.value] : null,
      fuel: els.fuel.value ? [els.fuel.value] : null,
      trans: els.trans.value ? [els.trans.value] : null,
      min: b.min, max: b.max,
      sort: els.sort.value
    });
    els.count.textContent = res.length + ' car' + (res.length === 1 ? '' : 's') + ' found';
    els.grid.innerHTML = res.map(card).join('');
    els.grid.hidden = res.length === 0;
    els.empty.hidden = res.length !== 0;
    tags();
    writeURL();
    wireCompareToggles();
  }

  function wireCompareToggles() {
    els.grid.querySelectorAll('[data-compare-toggle]').forEach(function (btn) {
      var id = btn.getAttribute('data-compare-toggle');
      function sync() {
        var on = CarFor.compare.has(id);
        btn.classList.toggle('on', on);
        btn.textContent = on ? 'In compare' : 'Compare';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      sync();
      btn.addEventListener('click', function () {
        if (CarFor.compare.toggle(id)) { sync(); CarFor.toast(CarFor.compare.has(id) ? 'Added to compare' : 'Removed from compare', 'ok'); }
      });
    });
  }

  function init() {
    brands();
    readURL();
    [els.q, els.brand, els.budget, els.fuel, els.trans, els.sort].forEach(function (el) {
      el.addEventListener('change', render);
      if (el === els.q) {
        var t;
        el.addEventListener('input', function () { clearTimeout(t); t = setTimeout(render, 180); });
      }
    });
    var clear = document.getElementById('clear-all');
    if (clear) {
      clear.addEventListener('click', function () {
        els.q.value = ''; els.brand.value = ''; els.budget.value = '';
        els.fuel.value = ''; els.trans.value = ''; els.sort.value = 'popular';
        render();
      });
    }
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
