/* CARFOR — contact page extras */
(function () {
  'use strict';

  function fillSelects() {
    var opts = '<option value="">Select a car…</option>';
    CarDB.cars.forEach(function (c) {
      opts += '<option value="' + c.brand + ' ' + c.model + '">' + c.brand + ' ' + c.model + '</option>';
    });
    document.querySelectorAll('#i-car, #t-car').forEach(function (sel) { sel.innerHTML = opts; });
  }

  function minDates() {
    var today = new Date().toISOString().slice(0, 10);
    document.querySelectorAll('input[type=date]').forEach(function (d) { d.min = today; });
  }

  function deepLink() {
    if (location.hash === '#test-drive') {
      var d = document.getElementById('test-drive');
      if (d) { setTimeout(function () { d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150); }
    } else if (location.hash === '#inquiry') {
      var i = document.getElementById('inquiry');
      if (i) { setTimeout(function () { i.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150); }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    fillSelects();
    minDates();
    deepLink();
  });
})();
