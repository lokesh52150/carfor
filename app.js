/* CARFOR — shared behaviour: nav, toast, reveal, compare store, forms, whatsapp */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function money(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function lakh(n) {
    var v = Number(n) || 0;
    if (v >= 10000000) { return '₹' + (v / 10000000).toFixed(2) + ' Cr'; }
    return '₹' + (v / 100000).toFixed(2) + ' Lakh';
  }

  /* ---------- compare store ---------- */
  var KEY = 'carfor_compare';
  function readStore() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function writeStore(ids) {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) { }
    paintBadge(ids.length);
  }
  function paintBadge(n) {
    $$('[data-compare-badge]').forEach(function (b) {
      b.textContent = n;
      b.style.display = n > 0 ? 'inline-flex' : 'none';
    });
    $$('[data-compare-link]').forEach(function (a) {
      a.classList.toggle('has-items', n > 0);
    });
  }
  function toggleCompare(id) {
    var ids = readStore();
    var i = ids.indexOf(id);
    if (i === -1) {
      if (ids.length >= 3) { toast('Compare up to 3 cars at a time', 'warn'); return false; }
      ids.push(id);
    } else { ids.splice(i, 1); }
    writeStore(ids);
    return true;
  }
  function inCompare(id) { return readStore().indexOf(id) !== -1; }

  /* ---------- toast ---------- */
  var toastEl, toastT;
  function toast(msg, kind) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.className = 'toast show' + (kind ? ' ' + kind : '');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- mobile nav ---------- */
  function initNav() {
    var btn = $('[data-nav-toggle]');
    var nav = $('#main-nav');
    if (!btn || !nav) { return; }
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- forms ---------- */
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;
  var PHONE_RE = /^[6-9][0-9]{9}$/;
  function digits(v) { return String(v || '').replace(/[^0-9]/g, ''); }

  function fieldError(input, msg) {
    var wrap = input.closest('.field') || input.parentElement;
    var e = wrap.querySelector('.err');
    if (msg) {
      wrap.classList.add('bad');
      if (!e) { e = document.createElement('span'); e.className = 'err'; wrap.appendChild(e); }
      e.textContent = msg;
    } else {
      wrap.classList.remove('bad');
      if (e) { e.textContent = ''; }
    }
  }

  function validateForm(form, rules) {
    var ok = true;
    rules.forEach(function (r) {
      var input = form.querySelector('[name="' + r.name + '"]');
      if (!input) { return; }
      var v = input.value.trim();
      if (r.required && !v) { fieldError(input, r.label + ' is required'); ok = false; return; }
      if (r.type === 'email' && v && !EMAIL_RE.test(v)) { fieldError(input, 'Enter a valid email'); ok = false; return; }
      if (r.type === 'phone' && v && !PHONE_RE.test(digits(v))) { fieldError(input, 'Enter a valid 10-digit mobile'); ok = false; return; }
      fieldError(input, '');
    });
    return ok;
  }

  function refId() { return 'CF-' + Math.random().toString(36).slice(2, 8).toUpperCase(); }

  function wireInquiryForm(form, kind) {
    if (!form) { return; }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var rules = [
        { name: 'name', required: true, label: 'Name' },
        { name: 'email', required: true, type: 'email', label: 'Email' },
        { name: 'phone', required: true, type: 'phone', label: 'Mobile' }
      ];
      if (kind === 'drive') {
        rules.push({ name: 'city', required: true, label: 'City' });
        rules.push({ name: 'date', required: true, label: 'Preferred date' });
      } else {
        rules.push({ name: 'car', required: true, label: 'Car' });
      }
      if (!validateForm(form, rules)) { toast('Please fix the highlighted fields', 'warn'); return; }
      var rid = refId();
      var panel = $('[data-success]') || form.parentElement.querySelector('[data-success]');
      if (panel) {
        var label = kind === 'drive' ? 'Test drive' : 'Inquiry';
        panel.querySelector('[data-ref]').textContent = rid;
        panel.querySelector('[data-msg]').textContent =
          label + ' received for ' + (form.querySelector('[name=car]') ? form.querySelector('[name=car]').value : 'your shortlisted car') +
          '. Our team will call you within 24 hours.';
        panel.hidden = false;
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      toast(labelFor(kind) + ' sent — ' + rid, 'ok');
    });
    function labelFor(k) { return k === 'drive' ? 'Test-drive request' : 'Inquiry'; }
  }

  /* ---------- newsletter ---------- */
  function initNewsletter() {
    var f = $('#newsletter-form');
    if (!f) { return; }
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var input = f.querySelector('input[type=email]');
      if (!input || !EMAIL_RE.test(input.value.trim())) { toast('Enter a valid email', 'warn'); return; }
      input.value = '';
      toast('Subscribed — weekly deals on the way', 'ok');
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initReveal();
    initNewsletter();
    paintBadge(readStore().length);
    wireInquiryForm($('#inquiry-form'), 'inquiry');
    wireInquiryForm($('#drive-form'), 'drive');

    $$('[data-compare-toggle]').forEach(function (btn) {
      var id = btn.getAttribute('data-compare-toggle');
      function sync() {
        var on = inCompare(id);
        btn.classList.toggle('on', on);
        btn.textContent = on ? 'In compare' : 'Compare';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      sync();
      btn.addEventListener('click', function () {
        if (toggleCompare(id)) { sync(); toast(inCompare(id) ? 'Added to compare' : 'Removed from compare', 'ok'); }
      });
    });

    $$('img[data-fallback]').forEach(function (img) {
      img.addEventListener('error', function () {
        img.classList.add('img-fail');
        img.alt = img.getAttribute('alt') || '';
      });
    });

    document.body.classList.add('ready');
  });

  window.CarFor = { money: money, lakh: lakh, toast: toast, compare: { read: readStore, toggle: toggleCompare, has: inCompare } };
})();
