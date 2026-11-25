/* Halaman Detail: dibangun dari data.js berdasarkan ?id= */
(() => {
  PT.layout('destinasi');

  const root = document.getElementById('detail');
  const id = new URLSearchParams(location.search).get('id');
  const d = DESTINASI.find((x) => x.id === id);

  if (!d) {
    document.title = 'Destinasi tidak ditemukan | PasTrip';
    root.innerHTML = `<div class="kosong my-5">
      <h1 class="h3">Destinasi tidak ditemukan</h1>
      <p>Alamat yang dibuka tidak cocok dengan destinasi mana pun.</p>
      <a class="btn btn-pt" href="destinasi.html">Lihat semua destinasi</a></div>`;
    return;
  }

  document.title = `${d.nama} | PasTrip`;
  const k = PT.KAT_KELAS[d.kategori];
  const b = PT.biaya(d);
  const bintang = (n) => { const r = Math.round(n * 2) / 2; return '★'.repeat(Math.floor(r)) + (r % 1 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r)); };
  const wa = `https://wa.me/${PT.KONTAK.wa}?text=${encodeURIComponent('Halo, saya ingin bertanya tentang tiket ' + d.nama)}`;
  const arah = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.peta)}`;

  /* galeri: 4 item (foto/video) dengan label pengunggah dan tanggal */
  const galeri = [
    { tipe: 'Foto', oleh: 'Pengunjung', tgl: '12 Okt 2026' },
    { tipe: 'Foto', oleh: 'Pengunjung', tgl: '3 Okt 2026' },
    { tipe: d.video ? 'Video' : 'Foto', oleh: 'Pengelola', tgl: '28 Sep 2026' }, // 'Video' hanya bila data.js punya field video
    { tipe: 'Foto', oleh: 'Pengunjung', tgl: '15 Sep 2026' }
  ];
  const labelTipe = (g) => (g.tipe === 'Video' ? '▶ Video' : 'Foto');

  const logistik = [
    ['road', 'Kondisi Jalan', d.logistik.jalan],
    ['car', 'Area Parkir', d.logistik.parkir],
    ['bus', 'Akses Transportasi', d.logistik.transport],
    ['clock', 'Jam Operasional', `${d.jam}. Diperbarui ${PT.DIPERBARUI}.`]
  ];

  const ulasanContoh = [
    { nama: 'Rina Putri', tanggal: '5 Okt 2026', bintang: 5, isi: 'Informasi biaya di sini cocok dengan yang saya temui di lokasi.' },
    { nama: 'Budi Santoso', tanggal: '28 Sep 2026', bintang: 4, isi: 'Tempatnya menarik dan mudah dicari. Datang lebih pagi supaya tidak terlalu ramai.' },
    { nama: 'Dewi Lestari', tanggal: '14 Sep 2026', bintang: 4.5, isi: 'Cocok untuk liburan bersama teman dan keluarga.' }
  ];
  const ulasan = d.ulasanList || ulasanContoh;

  const lainnya = DESTINASI.filter((x) => x.id !== d.id)
    .sort((x, y) => (y.kategori === d.kategori) - (x.kategori === d.kategori) || x.urutan - y.urutan)
    .slice(0, 4);

  root.innerHTML = `
    <div class="container py-3">
      <nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Beranda</a> / <a href="destinasi.html">Destinasi</a> / <span aria-current="page">${PT.esc(d.nama)}</span></nav>
      <div class="detail-judul"><h1>${PT.esc(d.nama)}</h1><span class="badge-kat kat-${k}">${d.kategori}</span></div>
      <p class="detail-meta"><span>${PT.esc(d.lokasi)}</span><span class="rating">★ ${d.rating.toFixed(1)} (${d.ulasan} ulasan) • Diperbarui ${PT.DIPERBARUI}</span></p>

      <div class="detail-grid">
        <section class="galeri" aria-label="Galeri foto dan video">
          <div class="galeri-utama bg-${k}" id="galeri-utama"></div>
          <div class="galeri-thumbs" id="galeri-thumbs">
            ${galeri.map((g, i) => `<button type="button" class="thumb bg-${k}" data-i="${i}" aria-pressed="${i === 0}" aria-label="Tampilkan ${g.tipe.toLowerCase()} ${i + 1}">
              ${PT.img(PT.fotoSrc(d, i + 1), `${d.nama}, ${g.tipe.toLowerCase()} ${i + 1}`)}
              ${g.tipe === 'Video' ? '<span class="play" aria-hidden="true">▶</span>' : ''}
              <span class="tag-atas">${labelTipe(g)}</span><span class="tag-bawah">${g.oleh} · ${g.tgl}</span></button>`).join('')}
          </div>
        </section>

        <aside class="samping" aria-label="Biaya dan kontak">
          <div class="kartu-samping">
            <h2>Rincian Biaya Perkiraan</h2>
            <dl class="rincian">
              <div class="baris"><dt>Tiket Masuk</dt><dd>${b.tiket}</dd></div>
              <div class="baris"><dt>${d.parkirLabel ? 'Parkir' : 'Parkir Motor'}</dt><dd>${PT.esc(b.parkir)}</dd></div>
              <div class="baris"><dt>Biaya Tambahan</dt><dd>${b.tambahan}</dd></div>
              <div class="baris total"><dt>Total / orang</dt><dd>${b.total}</dd></div>
            </dl>
            <p class="catatan-kecil">* Perkiraan, dapat berubah.${d.catatan ? ' ' + PT.esc(d.catatan) : ''} Tiket dibeli di loket atau hubungi pengelola.</p>
            <span class="terverifikasi">${PT.svg('check', 14)} Pengelola Terverifikasi</span>
            <div class="d-grid gap-2">
              <a class="btn btn-pt" href="${wa}" target="_blank" rel="noopener">Hubungi via WhatsApp</a>
              <a class="btn btn-outline-pt" href="tel:${PT.KONTAK.tel}">Telepon Pengelola</a>
            </div>
          </div>
        </aside>

        <div class="isi-detail">
          <section><h2>Tentang Destinasi</h2><p>${PT.esc(d.deskripsi)}</p></section>
          <section><h2>Fasilitas</h2><div class="chips">${d.fasilitas.map((f) => `<span class="chip">${PT.esc(f)}</span>`).join('')}</div></section>
          <section><h2>Rekomendasi Aktivitas</h2><div class="chips">${d.aktivitas.map((a) => `<span class="chip">${PT.esc(a)}</span>`).join('')}</div></section>
          <section><h2>Akses &amp; Logistik</h2>
            <div class="row row-cols-1 row-cols-sm-2 g-2">${logistik.map(([ik, jd, tx]) =>
              `<div class="col"><div class="info-kartu"><span class="ikon">${PT.svg(ik, 18)}</span><div><h3>${jd}</h3><p>${PT.esc(tx)}</p></div></div></div>`).join('')}</div>
          </section>
          <section><h2>Lokasi</h2>
            <div class="peta">${PT.svg('pin', 34)}<span>${PT.esc(d.alamat)}</span></div>
            <a class="btn btn-outline-pt btn-sm mt-2" href="${arah}" target="_blank" rel="noopener">Petunjuk Arah via Google Maps ↗</a>
          </section>
          <section><h2>Ulasan Pengunjung</h2>
            <div class="ulasan-ringkas"><span class="angka">${d.rating.toFixed(1)}</span><span><span class="bintang" aria-hidden="true">${bintang(d.rating)}</span><br><small class="text-secondary">dari ${d.ulasan} ulasan pengunjung</small></span></div>
            ${ulasan.map((u) => `<article class="ulasan-item"><span class="avatar" aria-hidden="true">${PT.esc(u.nama[0])}</span>
              <div class="flex-grow-1"><div class="d-flex"><span class="nama">${PT.esc(u.nama)}</span><span class="tgl">${u.tanggal}</span></div>
              <span class="bintang small" aria-label="${u.bintang} dari 5 bintang">${bintang(u.bintang)} <span class="text-body">${u.bintang.toFixed(1)}</span></span>
              <p>${PT.esc(u.isi)}</p></div></article>`).join('')}
          </section>
        </div>
      </div>
    </div>
    <section class="bagian bagian-mint" aria-labelledby="lain-judul">
      <div class="container">
        <h2 class="judul" id="lain-judul">Destinasi Populer Lainnya</h2>
        <p class="sub">Pilihan lain yang mungkin cocok untukmu</p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">${lainnya.map((x) => `<div class="col">${PT.kartu(x, 'ringkas')}</div>`).join('')}</div>
        <div class="text-center mt-4"><a class="btn btn-outline-pt px-4" href="destinasi.html">Lihat Semua Destinasi</a></div>
      </div>
    </section>`;

  /* galeri interaktif: klik thumbnail untuk mengganti foto utama */
  const utama = document.getElementById('galeri-utama');
  const tampil = (i) => {
    const g = galeri[i];
    const tag = `<span class="tag-atas">${labelTipe(g)}</span><span class="tag-bawah${g.tipe === 'Video' ? ' tag-kanan' : ''}">${g.oleh} · ${g.tgl}</span>`;
    if (g.tipe === 'Video') {
      /* video dimuat hanya saat diklik (preload="none") supaya halaman tetap ringan */
      utama.innerHTML = `<video class="video-utama" controls preload="none" playsinline poster="${PT.fotoSrc(d, i + 1)}" aria-label="Video ${PT.esc(d.nama)}">
          <source src="${PT.esc(d.video)}" type="video/mp4">Browser kamu belum mendukung video.</video>${tag}`;
      utama.querySelector('source').addEventListener('error', () => {
        utama.innerHTML = `<div class="video-kosong">Video belum tersedia</div>${tag}`;
      });
    } else {
      utama.innerHTML = `${PT.img(PT.fotoSrc(d, i + 1), `${d.nama}, foto ${i + 1}`)}${tag}`;
    }
    document.querySelectorAll('#galeri-thumbs .thumb').forEach((t) => t.setAttribute('aria-pressed', String(Number(t.dataset.i) === i)));
  };
  document.getElementById('galeri-thumbs').addEventListener('click', (e) => {
    const t = e.target.closest('.thumb');
    if (t) tampil(Number(t.dataset.i));
  });
  tampil(0);
})();
