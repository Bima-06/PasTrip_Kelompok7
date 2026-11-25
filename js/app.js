/* ==========================================================
   PasTrip - fungsi bersama (format rupiah, kartu, navbar, footer)
   Dipakai oleh semua halaman. Dimuat setelah data.js.
   ========================================================== */
const PT = (() => {
  const KATEGORI = ['Wisata Alam', 'Wisata Budaya', 'Wisata Kuliner', 'Petualangan', 'Pantai', 'Religi'];
  const KAT_KELAS = { 'Wisata Alam': 'alam', 'Wisata Budaya': 'budaya', 'Wisata Kuliner': 'kuliner', 'Petualangan': 'petualangan', 'Pantai': 'pantai', 'Religi': 'religi' };
  const IKON_KAT = { 'Wisata Alam': 'mountain', 'Wisata Budaya': 'landmark', 'Wisata Kuliner': 'utensils', 'Petualangan': 'compass', 'Pantai': 'waves', 'Religi': 'pin' };
  const FASILITAS = ['Parkir', 'Toilet', 'Musala', 'Warung Makan', 'Penginapan', 'Akses Disabilitas'];
  const DIPERBARUI = '12 Okt 2026';
  const KONTAK = { wa: '6281200000000', tel: '+6281200000000' }; // nomor contoh

  /* ---- ikon (garis, 24px) ---- */
  const ICONS = {
    mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    road: '<path d="M4 19 8 5"/><path d="m16 5 4 14"/><path d="M12 6v2"/><path d="M12 11v2"/><path d="M12 16v2"/>',
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>'
  };
  const svg = (nama, ukuran = 24) =>
    `<svg width="${ukuran}" height="${ukuran}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[nama]}</svg>`;

  /* ---- format ---- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const titik = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const rp = (n) => (n === 0 ? 'Gratis' : 'Rp ' + titik(n));
  const rentang = (a, b) => (a === b ? rp(a) : 'Rp ' + titik(a) + '-' + titik(b));

  /* ---- hitung biaya (total selalu dihitung dari data, tidak diketik manual) ---- */
  const hitung = (d) => {
    const parkir = d.parkir || 0;
    return {
      totalMin: d.tiket[0] + parkir + d.tambahan[0],
      totalMax: d.tiket[1] + parkir + d.tambahan[1]
    };
  };
  const biaya = (d) => {
    const h = hitung(d);
    return {
      tiket: rentang(d.tiket[0], d.tiket[1]),
      parkir: d.parkirLabel || rp(d.parkir),
      tambahan: rentang(d.tambahan[0], d.tambahan[1]),
      total: rentang(h.totalMin, h.totalMax)
    };
  };

  /* ---- foto: file di /img, bila belum ada tampil gradasi kategori ---- */
  const fotoSrc = (d, n) => `img/${d.id}${n ? '-' + n : ''}.webp`;
  const img = (src, alt) => `<img class="foto" src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.remove()">`;

  /* ---- kartu destinasi ---- */
  const kartu = (d, mode) => {
    const k = KAT_KELAS[d.kategori];
    const b = biaya(d);
    const bawah = mode === 'ringkas'
      ? `<div class="harga-mulai"><span>Tiket mulai dari</span><strong>${rp(d.tiket[0])}</strong></div>`
      : `<div class="rincian">
           <p class="judul-kecil">Rincian Biaya Perkiraan</p>
           <dl class="m-0">
             <div class="baris"><dt>Tiket Masuk</dt><dd>${b.tiket}</dd></div>
             <div class="baris"><dt>Parkir</dt><dd>${esc(b.parkir)}</dd></div>
             <div class="baris"><dt>Biaya Tambahan</dt><dd>${b.tambahan}</dd></div>
             <div class="baris total"><dt>Total / orang</dt><dd>${b.total}</dd></div>
           </dl>
         </div>
         <p class="catatan-kecil">* Perkiraan, dapat berubah sewaktu-waktu.</p>`;
    return `<article class="kartu">
      <a class="kartu-foto bg-${k}" href="detail.html?id=${d.id}" tabindex="-1" aria-hidden="true">${img(fotoSrc(d), d.nama)}</a>
      <div class="kartu-isi">
        <div class="kartu-atas"><span class="badge-kat kat-${k}">${d.kategori}</span><span class="rating">★ ${d.rating.toFixed(1)} (${d.ulasan})</span></div>
        <h3 class="kartu-judul"><a href="detail.html?id=${d.id}">${esc(d.nama)}</a></h3>
        <p class="kartu-lokasi">${esc(d.lokasi)}</p>
        ${bawah}
        <a class="lihat" href="detail.html?id=${d.id}" aria-label="Lihat detail ${esc(d.nama)}">Lihat Detail →</a>
      </div>
    </article>`;
  };

  /* ---- navbar dan footer (disisipkan agar tidak diulang di tiap halaman) ---- */
  const layout = (aktif) => {
    const menu = [['Beranda', 'index.html', 'beranda'], ['Destinasi', 'destinasi.html', 'destinasi'], ['Tentang', '#footer', ''], ['Kontak', '#footer', '']];
    document.getElementById('header').innerHTML = `
      <nav class="navbar navbar-expand-md pt-nav" aria-label="Menu utama">
        <div class="container">
          <a class="navbar-brand brand" href="index.html">PasTrip</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Buka menu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="menu">
            <ul class="navbar-nav gap-md-4">
              ${menu.map(([t, h, k]) => `<li class="nav-item"><a class="nav-link${k && k === aktif ? ' active' : ''}" href="${h}"${k && k === aktif ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}
            </ul>
          </div>
        </div>
      </nav>`;
    document.getElementById('footer').innerHTML = `
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-md-5">
            <a class="brand" href="index.html">PasTrip</a>
            <p class="mb-0">Informasi wisata Nusantara: biaya perkiraan, fasilitas, dan akses yang transparan.</p>
          </div>
          <div class="col-6 col-md-2"><h2>Jelajahi</h2><ul><li><a href="index.html">Beranda</a></li><li><a href="destinasi.html">Semua Destinasi</a></li><li><a href="index.html#kategori">Kategori Wisata</a></li></ul></div>
          <div class="col-6 col-md-2"><h2>Informasi</h2><ul><li><a href="#footer">Tentang Kami</a></li><li><a href="#footer">FAQ</a></li><li><a href="#footer">Kebijakan Privasi</a></li></ul></div>
          <div class="col-12 col-md-3"><h2>Kontak</h2><ul><li>email@wisata.id</li><li>+62 000 0000 0000</li><li>Media Sosial</li></ul></div>
        </div>
        <hr>
        <small>© 2026 PasTrip. Biaya bersifat perkiraan dan dapat berubah.</small>
      </div>`;
  };

  return { KATEGORI, KAT_KELAS, IKON_KAT, FASILITAS, DIPERBARUI, KONTAK, svg, esc, rp, rentang, hitung, biaya, fotoSrc, img, kartu, layout };
})();
