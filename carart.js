/* CARFOR — procedural car artwork (pure SVG, no external assets). Browser + Node. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.CarArt = factory(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var GROUND = 352, W1 = 230, W2 = 610, CY = 298, WR = 54;

  var BODIES = {
    suv: {
      body: 'M70 300 C62 258 64 210 86 194 L292 164 L366 100 C378 88 396 82 418 82 L562 82 C590 83 608 92 620 110 L674 184 L744 196 C764 202 774 220 772 248 L770 300 Z',
      glass: 'M310 162 L376 102 C384 93 398 89 416 89 L552 89 C574 90 588 97 598 114 L642 184 Z',
      pillars: [[472, 95, 14], [566, 97, 12]],
      seams: [478, 592],
      crease: 'M112 244 L744 236',
      rock: 'M150 282 L740 276',
      lampX: 100, lampY: 214, tailX: 742, tailY: 210
    },
    sedan: {
      body: 'M76 300 C68 262 70 218 92 202 L264 182 L360 118 C372 107 388 101 410 101 L566 101 C592 102 610 110 622 126 L700 196 L758 208 C778 214 786 230 784 254 L782 300 Z',
      glass: 'M286 180 L374 120 C382 112 394 108 410 108 L558 108 C578 109 592 115 602 130 L666 196 Z',
      pillars: [[474, 112, 13], [570, 114, 11]],
      seams: [480, 588],
      crease: 'M120 248 L766 240',
      rock: 'M160 284 L754 278',
      lampX: 106, lampY: 222, tailX: 754, tailY: 216
    },
    hatch: {
      body: 'M84 300 C76 264 78 220 98 204 L272 184 L368 120 C380 109 396 103 418 103 L556 103 C580 104 598 112 610 128 L660 190 L704 200 C724 206 734 222 732 250 L730 300 Z',
      glass: 'M294 182 L382 122 C390 114 402 110 418 110 L548 110 C568 111 582 117 592 132 L640 190 Z',
      pillars: [[478, 114, 13]],
      seams: [484, 578],
      crease: 'M126 250 L710 242',
      rock: 'M166 284 L706 278',
      lampX: 112, lampY: 224, tailX: 702, tailY: 216
    },
    muv: {
      body: 'M68 300 C60 256 62 208 84 192 L286 164 L360 96 C372 84 390 78 412 78 L604 78 C632 79 650 88 662 108 L706 180 L750 192 C770 198 780 216 778 244 L776 300 Z',
      glass: 'M304 162 L370 98 C378 89 392 85 410 85 L596 85 C618 86 632 93 642 110 L684 180 Z',
      pillars: [[468, 90, 14], [556, 88, 13]],
      seams: [474, 562, 650],
      crease: 'M108 242 L748 234',
      rock: 'M146 282 L744 276',
      lampX: 98, lampY: 212, tailX: 748, tailY: 206
    }
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function hex(h) {
    h = String(h || '').replace('#', '');
    if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
    if (h.length !== 6) { h = '2e3440'; }
    return h;
  }

  function shade(h, amt) {
    var n = parseInt(hex(h), 16), t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    var ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    return '#' + ch.map(function (v) {
      var x = Math.round(v + (t - v) * p);
      x = x < 0 ? 0 : x > 255 ? 255 : x;
      return ('0' + x.toString(16)).slice(-2);
    }).join('');
  }

  function wheelSVG(cx, u, accent) {
    var rim = 34, spokes = '';
    for (var i = 0; i < 5; i++) {
      var a = (i * 72) * Math.PI / 180;
      var x1 = cx + Math.cos(a) * 10, y1 = CY + Math.sin(a) * 10;
      var x2 = cx + Math.cos(a) * (rim - 5), y2 = CY + Math.sin(a) * (rim - 5);
      spokes += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>';
    }
    return '<g>' +
      '<circle cx="' + cx + '" cy="' + CY + '" r="' + WR + '" fill="#101014"/>' +
      '<circle cx="' + cx + '" cy="' + CY + '" r="' + (WR - 7) + '" fill="#17171c"/>' +
      '<circle cx="' + cx + '" cy="' + CY + '" r="' + rim + '" fill="url(#rim' + u + ')"/>' +
      '<g stroke="#6d7280" stroke-width="7" stroke-linecap="round">' + spokes + '</g>' +
      '<circle cx="' + cx + '" cy="' + CY + '" r="9" fill="#26262e"/>' +
      '<circle cx="' + cx + '" cy="' + CY + '" r="4" fill="' + accent + '"/>' +
      '</g>';
  }

  function car(o) {
    o = o || {};
    var B = BODIES[o.body] && BODIES[o.body].body ? BODIES[o.body] : BODIES.suv;
    var color = o.color || '#2e3440';
    var accent = o.accent || '#e8c972';
    var uid = o.uid || ('c' + Math.random().toString(36).slice(2, 8));
    var label = esc(o.label || 'Car illustration');
    var top = shade(color, 0.34), mid = shade(color, 0.04), bot = shade(color, -0.45);
    var arch = shade(color, -0.62);
    var seams = '', pil = '', i;

    for (i = 0; i < B.seams.length; i++) {
      var sx = B.seams[i];
      seams += '<line x1="' + sx + '" y1="150" x2="' + (sx - 5) + '" y2="296"/>';
    }
    for (i = 0; i < B.pillars.length; i++) {
      var p = B.pillars[i];
      pil += '<rect x="' + p[0] + '" y="' + p[1] + '" width="' + p[2] + '" height="98" fill="' + bot + '" opacity="0.92" transform="skewX(-5)"/>';
    }

    return '<svg class="art" viewBox="0 0 820 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '">' +
      '<defs>' +
      '<linearGradient id="paint' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + top + '"/><stop offset="0.45" stop-color="' + mid + '"/><stop offset="1" stop-color="' + bot + '"/>' +
      '</linearGradient>' +
      '<linearGradient id="glass' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#2b3138"/><stop offset="1" stop-color="#12151a"/>' +
      '</linearGradient>' +
      '<linearGradient id="rim' + uid + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#f2f3f5"/><stop offset="1" stop-color="#8f959f"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<ellipse cx="420" cy="' + (GROUND + 4) + '" rx="330" ry="14" fill="#000" opacity="0.32"/>' +
      '<path d="' + B.body + '" fill="url(#paint' + uid + ')"/>' +
      '<path d="' + B.crack + '" stroke="#ffffff" stroke-opacity="0.35" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="' + B.rock + '" stroke="' + bot + '" stroke-width="15" stroke-linecap="round" fill="none" opacity="0.8"/>' +
      '<g stroke="' + bot + '" stroke-width="3" opacity="0.7">' + seams + '</g>' +
      '<path d="' + B.glass + '" fill="url(#glass' + uid + ')"/>' +
      pil +
      '<rect x="' + B.lampX + '" y="' + B.lampY + '" width="70" height="15" rx="7" fill="#fdf7d8" opacity="0.95"/>' +
      '<rect x="' + B.tailX + '" y="' + B.tailY + '" width="34" height="17" rx="5" fill="#e2574c"/>' +
      '<rect x="410" y="216" width="30" height="7" rx="3.5" fill="#ffffff" opacity="0.5"/>' +
      '<rect x="530" y="214" width="30" height="7" rx="3.5" fill="#ffffff" opacity="0.5"/>' +
      '<circle cx="' + W1 + '" cy="' + CY + '" r="68" fill="' + arch + '"/>' +
      '<circle cx="' + W2 + '" cy="' + CY + '" r="68" fill="' + arch + '"/>' +
      wheelSVG(W1, uid + 'a', accent) + wheelSVG(W2, uid + 'b', accent) +
      '</svg>';
  }

  return { car: car, shade: shade, esc: esc, bodies: ['suv', 'sedan', 'hatch', 'muv'] };
});
