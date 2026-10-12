/* CARFOR — car detail page */
(function () {
  'use strict';

  function id() { return new URLSearchParams(location.search).get('id'); }

  function uidOf(c) { return 'd' + c.id.replace(/[^a-z0-9]/g, ''); }

  function el(sel) { return document.querySelector(sel); }

  function render(car) {
    document.title = car.brand + ' ' + car.model + ' — CARFOR';
    el('#crumb-name').textContent = car.brand + ' ' + car.model;
    el('#p-type').textContent = car.type;
    el('#p-name').textContent = car.brand + ' ' + car.model;
    el('#p-tag').textContent = car.tagline;
    el('#p-rate').textContent = car.rating.toFixed(1);
    el('#p-reviews').textContent = '(' + car.reviews.toLocaleString('en-IN') + ' reviews)';
    el('#p-year').textContent = 'MY ' + car.year;
    el('#p-price').innerHTML = CarFor.lakh(car.price) + '<small>ex-showroom, starting price · up to ' + CarFor.lakh(car.priceMax) + '</small>';
    el('#p-blurb').textContent = car.blurb;
    el('#p-quote').textContent = '“' + car.tagline + ' — ' + car.type.toLowerCase() + ' with ' + car.safety + ' safety and ' + car.mileage + ' real-world mileage.”';

    var specs = [
      ['Engine', car.engine],
      ['Power', car.power],
      ['Torque', car.torque],
      ['Mileage', car.mileage],
      ['Seating', car.seating + ' seats'],
      ['Boot space', car.boot],
      ['Ground clearance', car.ground],
      ['Safety', car.safety]
    ];
    el('#p-specs').innerHTML = specs.map(function (s) {
      return '<div class="spec"><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>';
    }).join('');

    el('#p-variants tbody').innerHTML = car.variants.map(function (v) {
      return '<tr><td><strong>' + v.name + '</strong></td><td>' + v.fuel + '</td><td>' + v.trans +
        '</td><td>' + v.mileage + '</td><td class="vprice">' + CarFor.money(v.price) + '</td></tr>';
    }).join('');

    el('#d-car').value = car.brand + ' ' + car.model;

    var btn = el('#cmp-btn');
    btn.setAttribute('data-compare-toggle', car.id);
    btn.addEventListener('click', function () {
      if (CarFor.compare.toggle(car.id)) {
        var on = CarFor.compare.has(car.id);
        btn.classList.toggle('on', on);
        btn.textContent = on ? 'In compare' : 'Compare';
        CarFor.toast(on ? 'Added to compare' : 'Removed from compare', 'ok');
      }
    });
    var on0 = CarFor.compare.has(car.id);
    btn.classList.toggle('on', on0);
    btn.textContent = on0 ? 'In compare' : 'Compare';

    buildGallery(car);
    buildEmi(car);
    var d = el('#d-date');
    if (d) { d.min = new Date().toISOString().slice(0, 10); }
  }

  function buildGallery(car) {
    var uid = uidOf(car);
    var color = car.colors[0];
    var views = [
      { key: 'side', label: 'Side profile' },
      { key: 'side-alt', label: 'Alt. colour' },
      { key: 'side-dark', label: 'Dark trim' }
    ];
    var stage = el('#stage');
    var thumbs = el('#thumbs');
    var swatches = el('#swatches');
    var current = 0;
    var colors = car.colors.slice();
    var activeColor = 0;

    function artFor(i, col) {
      return CarArt.car({
        body: car.body, color: col, accent: '#e8c972',
        uid: uid + 'v' + i + col.replace('#', ''), label: car.brand + ' ' + car.model + ' ' + views[i].label
      });
    }

    function paint() {
      stage.innerHTML = artFor(current, colors[activeColor]);
    }

    thumbs.innerHTML = views.map(function (v, i) {
      return '<button class="thumb' + (i === 0 ? ' on' : '') + '" data-i="' + i + '" title="' + v.label + '">' +
        artFor(i, colors[i % colors.length]) + '</button>';
    }).join('');

    thumbs.addEventListener('click', function (e) {
      var b = e.target.closest('.thumb');
      if (!b) { return; }
      current = Number(b.getAttribute('data-i'));
      thumbs.querySelectorAll('.thumb').forEach(function (t) { t.classList.remove('on'); });
      b.classList.add('on');
      paint();
    });

    swatches.innerHTML = colors.map(function (c, i) {
      return '<button class="sw' + (i === 0 ? ' on' : '') + '" style="background:' + c + '" data-i="' + i + '" aria-label="Colour ' + (i + 1) + '"></button>';
    }).join('');

    swatches.addEventListener('click', function (e) {
      var b = e.target.closest('.sw');
      if (!b) { return; }
      activeColor = Number(b.getAttribute('data-i'));
      swatches.querySelectorAll('.sw').forEach(function (t) { t.classList.remove('on'); });
      b.classList.add('on');
      paint();
    });

    paint();
  }

  function buildEmi(car) {
    var slider = el('#emi-price');
    var out = el('#emi-out');
    var val = el('#emi-price-val');
    var note = el('#emi-note');
    var lo = car.price, hi = Math.round(car.priceMax * 1.18);
    slider.min = 0; slider.max = 100; slider.value = 25;

    function calc() {
      var t = Number(slider.value) / 100;
      var onRoad = Math.round(lo + (hi - lo) * t);
      var p = onRoad * 0.85;
      var r = 9.2 / 12 / 100;
      var n = 60;
      var emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      val.textContent = CarFor.money(onRoad);
      out.textContent = CarFor.money(Math.round(emi)) + ' / month';
      note.textContent = '85% funding · 9.2% p.a. · 60 months · total interest ' + CarFor.money(Math.round(emi * n - p));
    }
    slider.addEventListener('input', calc);
    calc();
  }

  function boot() {
    var car = CarDB.byId(id()) || CarDB.cars[0];
    render(car);
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
