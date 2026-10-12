/* CARFOR — car database (INR, variants, specs) + helpers. Browser + Node. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.CarDB = factory(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CARS = [
    {
      id: 'tata-nexon', brand: 'Tata', model: 'Nexon', body: 'suv', type: 'SUV',
      tagline: 'India’s safest compact SUV', year: 2025, rating: 4.4, reviews: 2841, featured: true, popular: 98,
      colors: ['#25324f', '#b8bcc2', '#1c1d21'],
      fuel: ['Petrol', 'Diesel', 'CNG'], transmissions: ['Manual', 'AMT'],
      engine: '1199 cc Turbo Petrol / 1497 cc Diesel', power: '118 bhp', torque: '170 Nm',
      mileage: '17.4 kmpl', seating: 5, boot: '382 L', ground: '208 mm', safety: '5-star GNCAP',
      price: 809000, priceMax: 1399000,
      variants: [
        { name: 'Pure 1.2 MT', price: 809000, fuel: 'Petrol', trans: 'Manual', mileage: '17.4 kmpl' },
        { name: 'Creative 1.2 MT', price: 1049000, fuel: 'Petrol', trans: 'Manual', mileage: '17.4 kmpl' },
        { name: 'Creative Diesel MT', price: 1199000, fuel: 'Diesel', trans: 'Manual', mileage: '20.4 kmpl' },
        { name: 'Fearless+ DCA', price: 1399000, fuel: 'Petrol', trans: 'AMT', mileage: '16.5 kmpl' }
      ],
      blurb: '5-star safety, turbo punch and a feature-loaded cabin make the Nexon the default shortlist pick in its class.'
    },
    {
      id: 'tata-punch', brand: 'Tata', model: 'Punch', body: 'suv', type: 'Micro SUV',
      tagline: 'Small SUV, big confidence', year: 2025, rating: 4.3, reviews: 1996, featured: true, popular: 94,
      colors: ['#7a2f33', '#c9ccd1', '#2f6f6a'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'AMT'],
      engine: '1199 cc Revotron Petrol', power: '87 bhp', torque: '115 Nm',
      mileage: '18.8 kmpl', seating: 5, boot: '366 L', ground: '187 mm', safety: '5-star GNCAP',
      price: 610000, priceMax: 1000000,
      variants: [
        { name: 'Pure', price: 610000, fuel: 'Petrol', trans: 'Manual', mileage: '18.8 kmpl' },
        { name: 'Adventure', price: 735000, fuel: 'Petrol', trans: 'Manual', mileage: '18.8 kmpl' },
        { name: 'Creative DT', price: 880000, fuel: 'Petrol', trans: 'Manual', mileage: '18.5 kmpl' },
        { name: 'Accomplished AMT', price: 1000000, fuel: 'Petrol', trans: 'AMT', mileage: '18.0 kmpl' }
      ],
      blurb: 'A rugged, tall-boy micro SUV with SUV stance, high seating and unbeatable city efficiency.'
    },
    {
      id: 'tata-altroz', brand: 'Tata', model: 'Altroz', body: 'hatch', type: 'Hatchback',
      tagline: 'Premium hatch with 5-star safety', year: 2025, rating: 4.2, reviews: 1244, featured: false, popular: 76,
      colors: ['#d9d9dc', '#1f2a44', '#8f2f35'],
      fuel: ['Petrol', 'Diesel', 'CNG'], transmissions: ['Manual', 'DCT'],
      engine: '1199 cc Petrol / 1497 cc Diesel', power: '88 bhp', torque: '115 Nm',
      mileage: '19.0 kmpl', seating: 5, boot: '345 L', ground: '165 mm', safety: '5-star GNCAP',
      price: 679000, priceMax: 1120000,
      variants: [
        { name: 'XE', price: 679000, fuel: 'Petrol', trans: 'Manual', mileage: '19.0 kmpl' },
        { name: 'XM+ CNG', price: 835000, fuel: 'CNG', trans: 'Manual', mileage: '26.0 km/kg' },
        { name: 'XT Dazzle', price: 945000, fuel: 'Petrol', trans: 'Manual', mileage: '19.0 kmpl' },
        { name: 'XZ+ DCA', price: 1120000, fuel: 'Petrol', trans: 'DCT', mileage: '17.0 kmpl' }
      ],
      blurb: 'Sharp design, gold-standard crash protection and a calm, refined highway ride.'
    },
    {
      id: 'tata-harrier', brand: 'Tata', model: 'Harrier', body: 'suv', type: 'SUV',
      tagline: 'Bold mid-size SUV', year: 2025, rating: 4.4, reviews: 1587, featured: true, popular: 85,
      colors: ['#20242b', '#9fa4ab', '#31465f'],
      fuel: ['Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1956 cc Kryotec Diesel', power: '168 bhp', torque: '350 Nm',
      mileage: '16.8 kmpl', seating: 5, boot: '445 L', ground: '205 mm', safety: '5-star GNCAP',
      price: 1499000, priceMax: 2599000,
      variants: [
        { name: 'Pure S', price: 1499000, fuel: 'Diesel', trans: 'Manual', mileage: '16.8 kmpl' },
        { name: 'Smart S', price: 1799000, fuel: 'Diesel', trans: 'Manual', mileage: '16.8 kmpl' },
        { name: 'Adventure X', price: 2099000, fuel: 'Diesel', trans: 'Automatic', mileage: '15.8 kmpl' },
        { name: 'Accomplished+ DT', price: 2599000, fuel: 'Diesel', trans: 'Automatic', mileage: '15.8 kmpl' }
      ],
      blurb: 'Road presence for days, a torquey diesel and an interior that punches above its price.'
    },
    {
      id: 'mahindra-xuv700', brand: 'Mahindra', model: 'XUV700', body: 'suv', type: 'SUV',
      tagline: 'Flagship 7-seat SUV', year: 2025, rating: 4.5, reviews: 3120, featured: true, popular: 96,
      colors: ['#3d6b8f', '#141519', '#b9bdc4'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1997 cc Turbo Petrol / 2198 cc Diesel', power: '200 bhp', torque: '380 Nm',
      mileage: '16.5 kmpl', seating: 7, boot: '456 L', ground: '200 mm', safety: '5-star GNCAP',
      price: 1499000, priceMax: 2799000,
      variants: [
        { name: 'MX Petrol MT', price: 1499000, fuel: 'Petrol', trans: 'Manual', mileage: '17.0 kmpl' },
        { name: 'AX5 7-Str AT', price: 1999000, fuel: 'Diesel', trans: 'Automatic', mileage: '16.5 kmpl' },
        { name: 'AX7 L Diesel AT', price: 2499000, fuel: 'Diesel', trans: 'Automatic', mileage: '16.5 kmpl' },
        { name: 'AX7 L AWD AT', price: 2799000, fuel: 'Diesel', trans: 'Automatic', mileage: '15.8 kmpl' }
      ],
      blurb: 'Segment-defining power, ADAS and a panoramic sunroof — the SUV that rewrote the rules.'
    },
    {
      id: 'mahindra-thar', brand: 'Mahindra', model: 'Thar', body: 'suv', type: 'Off-roader',
      tagline: 'Born for the wild', year: 2025, rating: 4.5, reviews: 2410, featured: true, popular: 93,
      colors: ['#28313d', '#6d7278', '#7a3a2c'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1997 cc Turbo Petrol / 2184 cc Diesel', power: '150 bhp', torque: '300 Nm',
      mileage: '15.2 kmpl', seating: 4, boot: '257 L', ground: '226 mm', safety: '4-star GNCAP',
      price: 1135000, priceMax: 1950000,
      variants: [
        { name: 'LX Petrol MT', price: 1135000, fuel: 'Petrol', trans: 'Manual', mileage: '15.2 kmpl' },
        { name: 'LX Diesel MT', price: 1450000, fuel: 'Diesel', trans: 'Manual', mileage: '16.0 kmpl' },
        { name: 'LX Petrol AT', price: 1650000, fuel: 'Petrol', trans: 'Automatic', mileage: '14.5 kmpl' },
        { name: 'LX 4x4 Diesel AT', price: 1950000, fuel: 'Diesel', trans: 'Automatic', mileage: '15.0 kmpl' }
      ],
      blurb: 'Body-on-frame toughness with modern tech — equally happy on highways and trails.'
    },
    {
      id: 'mahindra-scorpio-n', brand: 'Mahindra', model: 'Scorpio-N', body: 'suv', type: 'SUV',
      tagline: 'The big daddy of SUVs', year: 2025, rating: 4.3, reviews: 1731, featured: false, popular: 82,
      colors: ['#1d2a3a', '#c7cace', '#3c3f45'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1997 cc Petrol / 2184 cc Diesel', power: '172 bhp', torque: '400 Nm',
      mileage: '15.8 kmpl', seating: 7, boot: '460 L', ground: '187 mm', safety: '5-star GNCAP',
      price: 1399000, priceMax: 2499000,
      variants: [
        { name: 'Z2 Petrol MT', price: 1399000, fuel: 'Petrol', trans: 'Manual', mileage: '16.0 kmpl' },
        { name: 'S6+ Diesel MT', price: 1699000, fuel: 'Diesel', trans: 'Manual', mileage: '15.8 kmpl' },
        { name: 'Z8 Diesel MT', price: 2099000, fuel: 'Diesel', trans: 'Manual', mileage: '15.8 kmpl' },
        { name: 'Z8 L Diesel AT', price: 2499000, fuel: 'Diesel', trans: 'Automatic', mileage: '14.9 kmpl' }
      ],
      blurb: 'Torque-rich diesel, rugged ladder frame and 7 seats — a proven family workhorse.'
    },
    {
      id: 'maruti-swift', brand: 'Maruti Suzuki', model: 'Swift', body: 'hatch', type: 'Hatchback',
      tagline: 'India’s favourite hatch', year: 2025, rating: 4.4, reviews: 4210, featured: true, popular: 99,
      colors: ['#b2352f', '#e3e4e7', '#2a2f38'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'AMT'],
      engine: '1197 cc Z-Series Petrol', power: '82 bhp', torque: '111 Nm',
      mileage: '22.4 kmpl', seating: 5, boot: '268 L', ground: '165 mm', safety: '4-star GNCAP',
      price: 649000, priceMax: 999000,
      variants: [
        { name: 'LXi', price: 649000, fuel: 'Petrol', trans: 'Manual', mileage: '22.4 kmpl' },
        { name: 'VXi', price: 745000, fuel: 'Petrol', trans: 'Manual', mileage: '22.4 kmpl' },
        { name: 'VXi CNG', price: 845000, fuel: 'CNG', trans: 'Manual', mileage: '32.5 km/kg' },
        { name: 'ZXi+ AMT', price: 999000, fuel: 'Petrol', trans: 'AMT', mileage: '22.0 kmpl' }
      ],
      blurb: 'Light, eager and famously efficient — the hatchback benchmark for city Indians.'
    },
    {
      id: 'maruti-baleno', brand: 'Maruti Suzuki', model: 'Baleno', body: 'hatch', type: 'Premium Hatchback',
      tagline: 'Premium & tech-loaded', year: 2025, rating: 4.3, reviews: 3080, featured: false, popular: 88,
      colors: ['#cfd2d7', '#1e2430', '#375d8c'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'AMT'],
      engine: '1197 cc DualJet Petrol', power: '89 bhp', torque: '113 Nm',
      mileage: '22.9 kmpl', seating: 5, boot: '268 L', ground: '170 mm', safety: '4-star GNCAP',
      price: 670000, priceMax: 1049000,
      variants: [
        { name: 'Sigma', price: 670000, fuel: 'Petrol', trans: 'Manual', mileage: '22.9 kmpl' },
        { name: 'Delta', price: 765000, fuel: 'Petrol', trans: 'Manual', mileage: '22.9 kmpl' },
        { name: 'Zeta CNG', price: 905000, fuel: 'CNG', trans: 'Manual', mileage: '30.6 km/kg' },
        { name: 'Alpha AMT', price: 1049000, fuel: 'Petrol', trans: 'AMT', mileage: '22.5 kmpl' }
      ],
      blurb: 'A roomy, smart hatch with a crisp 9-inch screen and mild-hybrid efficiency.'
    },
    {
      id: 'maruti-brezza', brand: 'Maruti Suzuki', model: 'Brezza', body: 'suv', type: 'Compact SUV',
      tagline: 'Urban compact SUV', year: 2025, rating: 4.3, reviews: 2640, featured: true, popular: 90,
      colors: ['#8f2f33', '#d8dade', '#20242b'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'Automatic'],
      engine: '1462 cc K-Series Petrol', power: '102 bhp', torque: '137 Nm',
      mileage: '19.8 kmpl', seating: 5, boot: '328 L', ground: '190 mm', safety: '4-star GNCAP',
      price: 834000, priceMax: 1414000,
      variants: [
        { name: 'LXi', price: 834000, fuel: 'Petrol', trans: 'Manual', mileage: '19.8 kmpl' },
        { name: 'VXi', price: 960000, fuel: 'Petrol', trans: 'Manual', mileage: '19.8 kmpl' },
        { name: 'ZXi AT', price: 1199000, fuel: 'Petrol', trans: 'Automatic', mileage: '19.5 kmpl' },
        { name: 'ZXi+ AT', price: 1414000, fuel: 'Petrol', trans: 'Automatic', mileage: '19.5 kmpl' }
      ],
      blurb: 'Dependable, easy to park and loaded with kit — the safe bet in the compact SUV race.'
    },
    {
      id: 'maruti-ertiga', brand: 'Maruti Suzuki', model: 'Ertiga', body: 'muv', type: 'MPV',
      tagline: 'The 7-seat people mover', year: 2025, rating: 4.2, reviews: 1840, featured: false, popular: 79,
      colors: ['#c9ccd1', '#2e3a4a', '#5a5f66'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'Automatic'],
      engine: '1462 cc DualJet Petrol', power: '102 bhp', torque: '137 Nm',
      mileage: '20.5 kmpl', seating: 7, boot: '209 L', ground: '185 mm', safety: '3-star GNCAP',
      price: 869000, priceMax: 1309000,
      variants: [
        { name: 'LXi', price: 869000, fuel: 'Petrol', trans: 'Manual', mileage: '20.5 kmpl' },
        { name: 'VXi', price: 995000, fuel: 'Petrol', trans: 'Manual', mileage: '20.5 kmpl' },
        { name: 'ZXi CNG', price: 1149000, fuel: 'CNG', trans: 'Manual', mileage: '26.1 km/kg' },
        { name: 'ZXi+ AT', price: 1309000, fuel: 'Petrol', trans: 'Automatic', mileage: '20.0 kmpl' }
      ],
      blurb: 'Seven genuinely usable seats, low running costs and an automatic for the school run.'
    },
    {
      id: 'maruti-grand-vitara', brand: 'Maruti Suzuki', model: 'Grand Vitara', body: 'suv', type: 'SUV',
      tagline: 'Strong hybrid efficiency', year: 2025, rating: 4.3, reviews: 1560, featured: false, popular: 80,
      colors: ['#28424f', '#d4d6da', '#1e1f23'],
      fuel: ['Petrol', 'CNG', 'Hybrid'], transmissions: ['Manual', 'Automatic'],
      engine: '1462 cc Hybrid Petrol', power: '115 bhp', torque: '144 Nm',
      mileage: '27.9 kmpl', seating: 5, boot: '373 L', ground: '185 mm', safety: '4-star GNCAP',
      price: 1099000, priceMax: 2009000,
      variants: [
        { name: 'Sigma', price: 1099000, fuel: 'Petrol', trans: 'Manual', mileage: '21.1 kmpl' },
        { name: 'Delta CNG', price: 1349000, fuel: 'CNG', trans: 'Manual', mileage: '26.1 km/kg' },
        { name: 'Zeta AT Hybrid', price: 1750000, fuel: 'Hybrid', trans: 'Automatic', mileage: '27.9 kmpl' },
        { name: 'Alpha+ AWD AT', price: 2009000, fuel: 'Hybrid', trans: 'Automatic', mileage: '27.9 kmpl' }
      ],
      blurb: 'A strong-hybrid SUV that regularly delivers close to 28 kmpl in real-world use.'
    },
    {
      id: 'hyundai-creta', brand: 'Hyundai', model: 'Creta', body: 'suv', type: 'SUV',
      tagline: 'The segment ruler', year: 2025, rating: 4.5, reviews: 5120, featured: true, popular: 100,
      colors: ['#e5e6e9', '#1c2027', '#2c4a6e'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1493 cc Petrol / Diesel', power: '113 bhp', torque: '144 Nm',
      mileage: '17.4 kmpl', seating: 5, boot: '433 L', ground: '170 mm', safety: '5-star GNCAP',
      price: 1111000, priceMax: 2049000,
      variants: [
        { name: 'E Petrol MT', price: 1111000, fuel: 'Petrol', trans: 'Manual', mileage: '17.4 kmpl' },
        { name: 'S (O) Petrol MT', price: 1350000, fuel: 'Petrol', trans: 'Manual', mileage: '17.4 kmpl' },
        { name: 'SX (O) Diesel AT', price: 1849000, fuel: 'Diesel', trans: 'Automatic', mileage: '16.8 kmpl' },
        { name: 'SX (O) Knight DCT', price: 2049000, fuel: 'Petrol', trans: 'Automatic', mileage: '16.8 kmpl' }
      ],
      blurb: 'Polished ride, loaded cabin and resale that keeps buyers coming back.'
    },
    {
      id: 'hyundai-venue', brand: 'Hyundai', model: 'Venue', body: 'suv', type: 'Compact SUV',
      tagline: 'Connected city SUV', year: 2025, rating: 4.2, reviews: 2910, featured: false, popular: 87,
      colors: ['#3c4a5c', '#d6d8dc', '#8f3a30'],
      fuel: ['Petrol', 'Diesel', 'CNG'], transmissions: ['Manual', 'DCT'],
      engine: '998 cc Turbo Petrol / 1493 cc Diesel', power: '118 bhp', torque: '172 Nm',
      mileage: '18.0 kmpl', seating: 5, boot: '350 L', ground: '190 mm', safety: '4-star GNCAP',
      price: 794000, priceMax: 1364000,
      variants: [
        { name: 'E Petrol', price: 794000, fuel: 'Petrol', trans: 'Manual', mileage: '17.0 kmpl' },
        { name: 'S (O) Diesel', price: 1099000, fuel: 'Diesel', trans: 'Manual', mileage: '20.0 kmpl' },
        { name: 'SX (O) Turbo DCT', price: 1364000, fuel: 'Petrol', trans: 'DCT', mileage: '18.0 kmpl' }
      ],
      blurb: 'Big-car features, turbo punch and a full connected-car suite in a tidy footprint.'
    },
    {
      id: 'hyundai-i20', brand: 'Hyundai', model: 'i20', body: 'hatch', type: 'Premium Hatchback',
      tagline: 'Sporty premium hatch', year: 2025, rating: 4.2, reviews: 1740, featured: false, popular: 74,
      colors: ['#b9bdc3', '#17181c', '#274a7c'],
      fuel: ['Petrol'], transmissions: ['Manual', 'IVT'],
      engine: '1197 cc Kappa Petrol', power: '87 bhp', torque: '112 Nm',
      mileage: '19.0 kmpl', seating: 5, boot: '311 L', ground: '170 mm', safety: '4-star GNCAP',
      price: 704000, priceMax: 1135000,
      variants: [
        { name: 'Era', price: 704000, fuel: 'Petrol', trans: 'Manual', mileage: '19.0 kmpl' },
        { name: 'Magna', price: 835000, fuel: 'Petrol', trans: 'Manual', mileage: '19.0 kmpl' },
        { name: 'Sportz IVT', price: 1010000, fuel: 'Petrol', trans: 'IVT', mileage: '19.0 kmpl' },
        { name: 'Asta (O)', price: 1135000, fuel: 'Petrol', trans: 'Manual', mileage: '19.0 kmpl' }
      ],
      blurb: 'Sculpted styling, sunroof and a smooth IVT — the enthusiast’s city hatch.'
    },
    {
      id: 'hyundai-verna', brand: 'Hyundai', model: 'Verna', body: 'sedan', type: 'Sedan',
      tagline: 'Fastest in class', year: 2025, rating: 4.4, reviews: 1320, featured: false, popular: 72,
      colors: ['#1b1c20', '#cfd2d7', '#7c2f34'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1482 cc Turbo Petrol / 1493 cc Diesel', power: '158 bhp', torque: '253 Nm',
      mileage: '18.6 kmpl', seating: 5, boot: '525 L', ground: '165 mm', safety: '5-star GNCAP',
      price: 1107000, priceMax: 1760000,
      variants: [
        { name: 'E Petrol', price: 1107000, fuel: 'Petrol', trans: 'Manual', mileage: '17.5 kmpl' },
        { name: 'S (O) Diesel', price: 1399000, fuel: 'Diesel', trans: 'Manual', mileage: '20.0 kmpl' },
        { name: 'SX (O) Turbo DCT', price: 1760000, fuel: 'Petrol', trans: 'Automatic', mileage: '18.6 kmpl' }
      ],
      blurb: 'A 158 bhp turbo, huge boot and 5-star safety — the driver’s family sedan.'
    },
    {
      id: 'kia-seltos', brand: 'Kia', model: 'Seltos', body: 'suv', type: 'SUV',
      tagline: 'Style-led mid-size SUV', year: 2025, rating: 4.4, reviews: 3410, featured: true, popular: 91,
      colors: ['#243b57', '#d9dbdf', '#3c4148'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1493 cc Petrol / Diesel', power: '160 bhp', torque: '253 Nm',
      mileage: '17.0 kmpl', seating: 5, boot: '433 L', ground: '170 mm', safety: '5-star GNCAP',
      price: 1119000, priceMax: 2069000,
      variants: [
        { name: 'HTE Petrol', price: 1119000, fuel: 'Petrol', trans: 'Manual', mileage: '17.0 kmpl' },
        { name: 'HTX (O) Diesel', price: 1599000, fuel: 'Diesel', trans: 'Manual', mileage: '19.0 kmpl' },
        { name: 'GTX+ Turbo DCT', price: 1999000, fuel: 'Petrol', trans: 'Automatic', mileage: '17.0 kmpl' },
        { name: 'X-Line Diesel AT', price: 2069000, fuel: 'Diesel', trans: 'Automatic', mileage: '16.8 kmpl' }
      ],
      blurb: 'Sharp looks, a 160 bhp turbo option and that signature Kia feature depth.'
    },
    {
      id: 'kia-sonet', brand: 'Kia', model: 'Sonet', body: 'suv', type: 'Compact SUV',
      tagline: 'Bold & efficient', year: 2025, rating: 4.3, reviews: 2870, featured: false, popular: 86,
      colors: ['#9c3a30', '#dcdde0', '#1f232a'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '998 cc Turbo Petrol / 1493 cc Diesel', power: '118 bhp', torque: '172 Nm',
      mileage: '18.4 kmpl', seating: 5, boot: '385 L', ground: '205 mm', safety: '4-star GNCAP',
      price: 799000, priceMax: 1579000,
      variants: [
        { name: 'HTE Petrol', price: 799000, fuel: 'Petrol', trans: 'Manual', mileage: '17.0 kmpl' },
        { name: 'HTX Diesel MT', price: 1249000, fuel: 'Diesel', trans: 'Manual', mileage: '20.0 kmpl' },
        { name: 'GTX+ Turbo DCT', price: 1579000, fuel: 'Petrol', trans: 'Automatic', mileage: '18.4 kmpl' }
      ],
      blurb: 'SuV stance, ventillated seats and a punchy turbo — small outside, big inside.'
    },
    {
      id: 'kia-carens', brand: 'Kia', model: 'Carens', body: 'muv', type: 'MPV',
      tagline: 'Family luxury mover', year: 2025, rating: 4.3, reviews: 1490, featured: false, popular: 71,
      colors: ['#cfd1d5', '#24303f', '#4a5560'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '1493 cc Petrol / Diesel', power: '158 bhp', torque: '253 Nm',
      mileage: '17.0 kmpl', seating: 7, boot: '240 L', ground: '195 mm', safety: '4-star GNCAP',
      price: 1119000, priceMax: 1949000,
      variants: [
        { name: 'Premium Petrol', price: 1119000, fuel: 'Petrol', trans: 'Manual', mileage: '16.2 kmpl' },
        { name: 'Luxury Petrol', price: 1499000, fuel: 'Petrol', trans: 'Manual', mileage: '16.2 kmpl' },
        { name: 'Luxury Plus Diesel AT', price: 1949000, fuel: 'Diesel', trans: 'Automatic', mileage: '17.0 kmpl' }
      ],
      blurb: 'Six or seven seats, sunroof and a premium cabin — road trips sorted.'
    },
    {
      id: 'toyota-innova-crysta', brand: 'Toyota', model: 'Innova Crysta', body: 'muv', type: 'MPV',
      tagline: 'The evergreen people mover', year: 2025, rating: 4.5, reviews: 2960, featured: true, popular: 89,
      colors: ['#d3d5d9', '#1e2431', '#4c5158'],
      fuel: ['Diesel'], transmissions: ['Manual'],
      engine: '2393 cc GD Diesel', power: '148 bhp', torque: '343 Nm',
      mileage: '15.6 kmpl', seating: 7, boot: '300 L', ground: '178 mm', safety: '4-star GNCAP',
      price: 1613000, priceMax: 2603000,
      variants: [
        { name: 'GX 2.4 7-STR', price: 1613000, fuel: 'Diesel', trans: 'Manual', mileage: '15.6 kmpl' },
        { name: 'VX 2.4 7-STR', price: 1950000, fuel: 'Diesel', trans: 'Manual', mileage: '15.6 kmpl' },
        { name: 'ZX 2.4 7-STR', price: 2350000, fuel: 'Diesel', trans: 'Manual', mileage: '15.6 kmpl' },
        { name: 'ZX 2.4 7-STR AT', price: 2603000, fuel: 'Diesel', trans: 'Manual', mileage: '15.0 kmpl' }
      ],
      blurb: 'Legendary reliability, resale and a cabin built for Indian families and fleets.'
    },
    {
      id: 'toyota-fortuner', brand: 'Toyota', model: 'Fortuner', body: 'suv', type: 'SUV',
      tagline: 'The big daddy', year: 2025, rating: 4.6, reviews: 1940, featured: true, popular: 83,
      colors: ['#1a1c20', '#dfe0e3', '#5f4335'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'Automatic'],
      engine: '2755 cc GD Diesel / 2694 cc Petrol', power: '204 bhp', torque: '500 Nm',
      mileage: '14.4 kmpl', seating: 7, boot: '300 L', ground: '225 mm', safety: '5-star ANCAP',
      price: 3343000, priceMax: 5144000,
      variants: [
        { name: '4x2 MT', price: 3343000, fuel: 'Diesel', trans: 'Manual', mileage: '14.4 kmpl' },
        { name: '4x2 AT', price: 3600000, fuel: 'Diesel', trans: 'Automatic', mileage: '14.4 kmpl' },
        { name: 'Legender 4x4 AT', price: 4300000, fuel: 'Diesel', trans: 'Automatic', mileage: '14.4 kmpl' },
        { name: 'GR-S 4x4 AT', price: 5144000, fuel: 'Diesel', trans: 'Automatic', mileage: '14.2 kmpl' }
      ],
      blurb: 'Sheer presence, unstoppable diesel torque and Toyota-grade peace of mind.'
    },
    {
      id: 'toyota-glanza', brand: 'Toyota', model: 'Glanza', body: 'hatch', type: 'Hatchback',
      tagline: 'Efficient city companion', year: 2025, rating: 4.2, reviews: 1160, featured: false, popular: 68,
      colors: ['#d8dade', '#22252b', '#7a3a41'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'AMT'],
      engine: '1197 cc DualJet Petrol', power: '88 bhp', torque: '113 Nm',
      mileage: '22.9 kmpl', seating: 5, boot: '313 L', ground: '170 mm', safety: '4-star GNCAP',
      price: 699000, priceMax: 1049000,
      variants: [
        { name: 'E', price: 699000, fuel: 'Petrol', trans: 'Manual', mileage: '22.9 kmpl' },
        { name: 'S CNG', price: 905000, fuel: 'CNG', trans: 'Manual', mileage: '30.6 km/kg' },
        { name: 'G AMT', price: 1049000, fuel: 'Petrol', trans: 'AMT', mileage: '22.5 kmpl' }
      ],
      blurb: 'Toyota reliability on a proven Maruti platform — efficiency without drama.'
    },
    {
      id: 'honda-city', brand: 'Honda', model: 'City', body: 'sedan', type: 'Sedan',
      tagline: 'The original Indian sedan', year: 2025, rating: 4.4, reviews: 2110, featured: true, popular: 78,
      colors: ['#cfd2d7', '#1d1f24', '#33475e'],
      fuel: ['Petrol', 'Hybrid'], transmissions: ['Manual', 'CVT'],
      engine: '1498 cc i-VTEC / e:HEV', power: '119 bhp', torque: '145 Nm',
      mileage: '18.4 kmpl', seating: 5, boot: '506 L', ground: '165 mm', safety: '4-star GNCAP',
      price: 1116000, priceMax: 1940000,
      variants: [
        { name: 'E CVT', price: 1316000, fuel: 'Petrol', trans: 'CVT', mileage: '18.4 kmpl' },
        { name: 'V MT', price: 1116000, fuel: 'Petrol', trans: 'Manual', mileage: '18.4 kmpl' },
        { name: 'ZX CVT', price: 1649000, fuel: 'Petrol', trans: 'CVT', mileage: '18.4 kmpl' },
        { name: 'e:HEV ZX', price: 1940000, fuel: 'Hybrid', trans: 'CVT', mileage: '26.1 kmpl' }
      ],
      blurb: 'Refined, spacious and available as a petrol hybrid — a sedan that still feels special.'
    },
    {
      id: 'honda-amaze', brand: 'Honda', model: 'Amaze', body: 'sedan', type: 'Compact Sedan',
      tagline: 'Compact with a boot', year: 2025, rating: 4.1, reviews: 980, featured: false, popular: 64,
      colors: ['#d7d9dd', '#232830', '#4a6f9b'],
      fuel: ['Petrol'], transmissions: ['Manual', 'CVT'],
      engine: '1199 cc i-VTEC Petrol', power: '89 bhp', torque: '110 Nm',
      mileage: '18.6 kmpl', seating: 5, boot: '420 L', ground: '170 mm', safety: '4-star GNCAP',
      price: 755000, priceMax: 1110000,
      variants: [
        { name: 'E MT', price: 755000, fuel: 'Petrol', trans: 'Manual', mileage: '18.6 kmpl' },
        { name: 'S MT', price: 845000, fuel: 'Petrol', trans: 'Manual', mileage: '18.6 kmpl' },
        { name: 'V CVT', price: 1110000, fuel: 'Petrol', trans: 'CVT', mileage: '18.3 kmpl' }
      ],
      blurb: 'A proper sedan in a sub-4-metre body — big boot, light controls, easy ownership.'
    },
    {
      id: 'honda-elevate', brand: 'Honda', model: 'Elevate', body: 'suv', type: 'SUV',
      tagline: 'Honda’s family SUV', year: 2025, rating: 4.2, reviews: 1120, featured: false, popular: 69,
      colors: ['#1f232b', '#dcdde1', '#2f5f4f'],
      fuel: ['Petrol'], transmissions: ['Manual', 'CVT'],
      engine: '1498 cc i-VTEC Petrol', power: '119 bhp', torque: '145 Nm',
      mileage: '15.3 kmpl', seating: 5, boot: '458 L', ground: '200 mm', safety: '4-star GNCAP',
      price: 1127000, priceMax: 1649000,
      variants: [
        { name: 'SV MT', price: 1127000, fuel: 'Petrol', trans: 'Manual', mileage: '15.3 kmpl' },
        { name: 'V MT', price: 1279000, fuel: 'Petrol', trans: 'Manual', mileage: '15.3 kmpl' },
        { name: 'ZX CVT', price: 1649000, fuel: 'Petrol', trans: 'CVT', mileage: '15.0 kmpl' }
      ],
      blurb: 'Square, confident styling, Honda’s sweet CVT and a genuinely huge boot.'
    },
    {
      id: 'mg-hector', brand: 'MG', model: 'Hector', body: 'suv', type: 'SUV',
      tagline: 'Feature king', year: 2025, rating: 4.3, reviews: 1880, featured: false, popular: 75,
      colors: ['#20242c', '#cfd1d6', '#8a3a33'],
      fuel: ['Petrol', 'Diesel'], transmissions: ['Manual', 'CVT'],
      engine: '1451 cc Turbo Petrol / 1956 cc Diesel', power: '141 bhp', torque: '250 Nm',
      mileage: '14.1 kmpl', seating: 7, boot: '587 L', ground: '192 mm', safety: '4-star GNCAP',
      price: 1549000, priceMax: 2300000,
      variants: [
        { name: 'Style Petrol MT', price: 1549000, fuel: 'Petrol', trans: 'Manual', mileage: '14.1 kmpl' },
        { name: 'Sharp Pro Petrol CVT', price: 2099000, fuel: 'Petrol', trans: 'CVT', mileage: '14.1 kmpl' },
        { name: 'Sharp Pro Diesel MT', price: 2300000, fuel: 'Diesel', trans: 'Manual', mileage: '16.4 kmpl' }
      ],
      blurb: 'That 14-inch portrait screen, ADAS and a panoramic roof — maximum kit per rupee.'
    },
    {
      id: 'skoda-kushaq', brand: 'Skoda', model: 'Kushaq', body: 'suv', type: 'Compact SUV',
      tagline: 'European dynamics', year: 2025, rating: 4.3, reviews: 1040, featured: false, popular: 66,
      colors: ['#3a5f4f', '#d6d8dc', '#23262c'],
      fuel: ['Petrol'], transmissions: ['Manual', 'Automatic'],
      engine: '999 cc / 1498 cc TSI', power: '148 bhp', torque: '250 Nm',
      mileage: '17.9 kmpl', seating: 5, boot: '385 L', ground: '188 mm', safety: '5-star GNCAP',
      price: 1189000, priceMax: 2179000,
      variants: [
        { name: 'Active 1.0 TSI', price: 1189000, fuel: 'Petrol', trans: 'Manual', mileage: '17.9 kmpl' },
        { name: 'Ambition 1.0 TSI', price: 1459000, fuel: 'Petrol', trans: 'Manual', mileage: '17.9 kmpl' },
        { name: 'Style 1.5 TSI DSG', price: 2179000, fuel: 'Petrol', trans: 'Automatic', mileage: '17.9 kmpl' }
      ],
      blurb: 'Crisp handling, strong TSI engines and solid build — the driver’s compact SUV.'
    },
    {
      id: 'vw-taigun', brand: 'Volkswagen', model: 'Taigun', body: 'suv', type: 'Compact SUV',
      tagline: 'German solid & simple', year: 2025, rating: 4.3, reviews: 990, featured: false, popular: 65,
      colors: ['#2b4c6f', '#dcdde0', '#4d5158'],
      fuel: ['Petrol'], transmissions: ['Manual', 'Automatic'],
      engine: '999 cc / 1498 cc TSI', power: '148 bhp', torque: '250 Nm',
      mileage: '17.9 kmpl', seating: 5, boot: '385 L', ground: '188 mm', safety: '5-star GNCAP',
      price: 1170000, priceMax: 2070000,
      variants: [
        { name: 'Comfortline 1.0', price: 1170000, fuel: 'Petrol', trans: 'Manual', mileage: '17.9 kmpl' },
        { name: 'Highline 1.0', price: 1459000, fuel: 'Petrol', trans: 'Manual', mileage: '17.9 kmpl' },
        { name: 'Top Line 1.5 DSG', price: 2070000, fuel: 'Petrol', trans: 'Automatic', mileage: '17.9 kmpl' }
      ],
      blurb: 'Understated German design, stout TSI power and 5-star crash protection.'
    },
    {
      id: 'renault-kiger', brand: 'Renault', model: 'Kiger', body: 'suv', type: 'Compact SUV',
      tagline: 'Value SUV fighter', year: 2025, rating: 4.0, reviews: 860, featured: false, popular: 58,
      colors: ['#9a3b34', '#d4d6da', '#2a2e35'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'AMT'],
      engine: '999 cc Turbo Petrol', power: '99 bhp', torque: '160 Nm',
      mileage: '19.0 kmpl', seating: 5, boot: '405 L', ground: '205 mm', safety: '1-star GNCAP',
      price: 615000, priceMax: 1125000,
      variants: [
        { name: 'RXE', price: 615000, fuel: 'Petrol', trans: 'Manual', mileage: '19.0 kmpl' },
        { name: 'RXL Turbo', price: 850000, fuel: 'Petrol', trans: 'Manual', mileage: '20.5 kmpl' },
        { name: 'RXT AMT', price: 1040000, fuel: 'Petrol', trans: 'AMT', mileage: '19.0 kmpl' },
        { name: 'Intens Turbo CVT', price: 1125000, fuel: 'Petrol', trans: 'AMT', mileage: '20.5 kmpl' }
      ],
      blurb: 'Big on space, light on wallet — a turbo engine at hatchback money.'
    },
    {
      id: 'nissan-magnite', brand: 'Nissan', model: 'Magnite', body: 'suv', type: 'Compact SUV',
      tagline: 'Premium on a budget', year: 2025, rating: 4.1, reviews: 1210, featured: false, popular: 62,
      colors: ['#b8542f', '#d9dade', '#20242b'],
      fuel: ['Petrol', 'CNG'], transmissions: ['Manual', 'AMT'],
      engine: '999 cc Turbo Petrol', power: '99 bhp', torque: '160 Nm',
      mileage: '19.0 kmpl', seating: 5, boot: '336 L', ground: '205 mm', safety: '4-star GNCAP',
      price: 600000, priceMax: 1150000,
      variants: [
        { name: 'Visia', price: 600000, fuel: 'Petrol', trans: 'Manual', mileage: '18.0 kmpl' },
        { name: 'Acenta CNG', price: 830000, fuel: 'CNG', trans: 'Manual', mileage: '25.0 km/kg' },
        { name: 'Tekna Turbo', price: 1040000, fuel: 'Petrol', trans: 'Manual', mileage: '20.0 kmpl' },
        { name: 'Tekna+ Turbo CVT', price: 1150000, fuel: 'Petrol', trans: 'AMT', mileage: '19.0 kmpl' }
      ],
      blurb: 'Sharp pricing, a sweet turbo and loads of space — the smart budget SUV.'
    }
  ];

  var BRANDS = [];
  CARS.forEach(function (c) { if (BRANDS.indexOf(c.brand) === -1) { BRANDS.push(c.brand); } });
  BRANDS.sort();

  function byId(id) {
    for (var i = 0; i < CARS.length; i++) { if (CARS[i].id === id) { return CARS[i]; } }
    return null;
  }

  function money(n) {
    n = Math.round(Number(n) || 0);
    return '₹' + n.toLocaleString('en-IN');
  }

  function lakh(n) {
    var v = Number(n) || 0;
    if (v >= 10000000) { return '₹' + (v / 10000000).toFixed(2) + ' Cr'; }
    return '₹' + (v / 100000).toFixed(2) + ' Lakh';
  }

  function filter(opts) {
    opts = opts || {};
    var q = (opts.q || '').trim().toLowerCase();
    var out = CARS.filter(function (c) {
      if (opts.brands && opts.brands.length && opts.brands.indexOf(c.brand) === -1) { return false; }
      if (opts.bodies && opts.bodies.length && opts.bodies.indexOf(c.type) === -1 && opts.bodies.indexOf(c.body) === -1) { return false; }
      if (opts.fuel && opts.fuel.length) {
        var hit = c.fuel.some(function (f) { return opts.fuel.indexOf(f) !== -1; });
        if (!hit) { return false; }
      }
      if (opts.trans && opts.trans.length) {
        var ht = c.transmissions.some(function (t) { return opts.trans.indexOf(t) !== -1; });
        if (!ht) { return false; }
      }
      if (opts.min && c.priceMax < opts.min) { return false; }
      if (opts.max && c.price > opts.max) { return false; }
      if (q) {
        var hay = (c.brand + ' ' + c.model + ' ' + c.type + ' ' + c.tagline + ' ' + c.fuel.join(' ')).toLowerCase();
        if (hay.indexOf(q) === -1) { return false; }
      }
      return true;
    });
    var sort = opts.sort || 'popular';
    out.sort(function (a, b) {
      if (sort === 'price-asc') { return a.price - b.price; }
      if (sort === 'price-desc') { return b.price - a.price; }
      if (sort === 'rating') { return b.rating - a.rating; }
      if (sort === 'mileage') { return parseFloat(b.mileage) - parseFloat(a.mileage); }
      return b.popular - a.popular;
    });
    return out;
  }

  return { cars: CARS, brands: BRANDS, byId: byId, money: money, lakh: lakh, filter: filter };
});
