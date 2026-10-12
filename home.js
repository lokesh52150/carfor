/* CARFOR — home page */
(function () {
  'use strict';

  function stars(r) {
    return '★ ' + r.toFixed(1);
  }

  function cardHTML(c) {
    return '<article class="card">' +
      '<div class="art-wrap">' +
      (c.featured ? '<span class="flag">Featured</span>' : '<span class="flag dark">' + c.type + '</span>') +
      CarArt.car({ body: c.body, color: c.colors[0], accent: '#e8c972', uid: 'h' + c.id.replace(/[^a-z0-9]/g, ''), label: c.brand + ' ' + c.model }) +
      '</div>' +
      '<div class="body">' +
      '<div class="toprow">' +
      '<div class="name">' + c.brand + ' ' + c.model + '<small>' + c.type + '</small></div>' +
      '<span class="rate">' + stars(c.rating) + '</span>' +
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
      '<a class="btn btn-p btn-sm" href="compare.html?ids=' + c.id + '">Compare</a>' +
      '</div></div></div></article>';
  }

  function fill(id, cars) {
    var el = document.getElementById(id);
    if (el) { el.innerHTML = cars.map(cardHTML).join(''); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var featured = CarDB.cars.filter(function (c) { return c.featured; }).slice(0, 4);
    var popular = CarDB.cars.slice().sort(function (a, b) { return b.popular - a.popular; }).slice(0, 4);
    fill('featured-grid', featured);
    fill('popular-grid', popular);

    var bg = document.getElementById('brand-grid');
    if (bg) {
      bg.innerHTML = CarDB.brands.map(function (b) {
        var n = CarDB.cars.filter(function (c) { return c.brand === b; }).length;
        return '<a class="brand-tile" href="cars.html?brand=' + encodeURIComponent(b) + '">' + b + '<small>' + n + ' model' + (n > 1 ? 's' : '') + '</small></a>';
      }).join('');
    }

    var hero = document.getElementById('hero-art');
    if (hero) {
      var art = document.createElement('div');
      art.innerHTML = CarArt.car({ body: 'suv', color: '#2b3a55', accent: '#e8c972', uid: 'hero', label: 'Featured SUV' });
      hero.insertBefore(art.firstChild, hero.firstChild);
    }

    var qa = document.getElementById('quote-art');
    if (qa) {
      var wrap = document.createElement('div');
      wrap.innerHTML = CarArt.car({ body: 'suv', color: '#2f6f6a', accent: '#e8c972', uid: 'quote', label: 'Grand Vitara' });
      qa.appendChild(wrap.firstChild);
    }

    var sel = document.getElementById('q-car');
    if (sel) {
      var opts = '<option value="">Select a car…</option>';
      CarDB.cars.forEach(function (c) {
        opts += '<option value="' + c.brand + ' ' + c.model + '">' + c.brand + ' ' + c.model + '</option>';
      });
      sel.innerHTML = opts;
    }
  });
})();
