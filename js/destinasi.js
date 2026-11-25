/* Halaman Destinasi: pencarian, filter, urutan, pagination.
   Semua pilihan disimpan di URL (?q=&kat=&harga=&fas=&urut=&hal=) agar bisa dibagikan. */
(() => {
  PT.layout('destinasi');

  const PER_HALAMAN = 6;
  const HARGA = [
    ['semua', 'Semua harga'], ['gratis', 'Gratis'], ['murah', '< Rp 25.000'],
    ['sedang', 'Rp 25.000 - 75.000'], ['mahal', '> Rp 75.000']
  ];
  const el = (id) => document.getElementById(id);

  /* ---------- filter harga memakai harga tiket terendah ----------
     Gratis = 0 | < 25.000 = 1 s.d. 24.999 | 25.000 - 75.000 = batas inklusif | > 75.000 */
  const cocokHarga = (t, h) => {
    if (h === 'gratis') return t === 0;
    if (h === 'murah') return t > 0 && t < 25000;
    if (h === 'sedang') return t >= 25000 && t <= 75000;
    if (h === 'mahal') return t > 75000;
    return true;
  };

  const baca = () => {
    const p = new URLSearchParams(location.search);
    const daftar = (k) => (p.get(k) || '').split(',').filter(Boolean);
    return {
      q: p.get('q') || '', kat: daftar('kat'), fas: daftar('fas'),
      harga: p.get('harga') || 'semua', urut: p.get('urut') || 'populer',
      hal: Math.max(1, parseInt(p.get('hal') || '1', 10) || 1)
    };
  };
  let state = baca();

  const tulisUrl = () => {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.kat.length) p.set('kat', state.kat.join(','));
    if (state.harga !== 'semua') p.set('harga', state.harga);
    if (state.fas.length) p.set('fas', state.fas.join(','));
    if (state.urut !== 'populer') p.set('urut', state.urut);
    if (state.hal > 1) p.set('hal', String(state.hal));
    const s = p.toString();
    history.replaceState(null, '', s ? '?' + s : location.pathname);
  };

  /* ---------- bangun kontrol filter ---------- */
  const cek = (tipe, nama, nilai, label, id) =>
    `<div class="form-check"><input class="form-check-input" type="${tipe}" name="${nama}" value="${PT.esc(nilai)}" id="${id}">
       <label class="form-check-label" for="${id}">${PT.esc(label)}</label></div>`;
  el('filter-harga').innerHTML = HARGA.map(([v, l]) => cek('radio', 'harga', v, l, 'h-' + v)).join('');
  el('filter-kat').innerHTML = PT.KATEGORI.map((k, i) => cek('checkbox', 'kat', k, k, 'k-' + i)).join('');
  el('filter-fas').innerHTML = PT.FASILITAS.map((f, i) => cek('checkbox', 'fas', f, f, 'f-' + i)).join('');

  const isiForm = () => {
    el('q').value = state.q;
    el('urut').value = state.urut;
    document.querySelectorAll('#form-filter input[name="harga"]').forEach((i) => { i.checked = i.value === state.harga; });
    document.querySelectorAll('#form-filter input[name="kat"]').forEach((i) => { i.checked = state.kat.includes(i.value); });
    document.querySelectorAll('#form-filter input[name="fas"]').forEach((i) => { i.checked = state.fas.includes(i.value); });
  };
  const dariForm = () => {
    const nilai = (nama) => [...document.querySelectorAll(`#form-filter input[name="${nama}"]:checked`)].map((i) => i.value);
    state = {
      q: el('q').value.trim(), kat: nilai('kat'), fas: nilai('fas'),
      harga: nilai('harga')[0] || 'semua', urut: el('urut').value, hal: 1
    };
  };

  /* ---------- logika ---------- */
  const cocok = (d) => {
    if (state.q) {
      const teks = `${d.nama} ${d.lokasi} ${d.kategori}`.toLowerCase();
      if (!teks.includes(state.q.toLowerCase())) return false;
    }
    if (state.kat.length && !state.kat.includes(d.kategori)) return false;
    if (!cocokHarga(d.tiket[0], state.harga)) return false;
    return state.fas.every((f) => d.fasilitas.includes(f));
  };
  const urutkan = (arr) => {
    const a = arr.slice();
    if (state.urut === 'rating') a.sort((x, y) => y.rating - x.rating || y.ulasan - x.ulasan);
    else if (state.urut === 'tiket') a.sort((x, y) => x.tiket[0] - y.tiket[0] || x.urutan - y.urutan);
    else if (state.urut === 'total') a.sort((x, y) => PT.hitung(x).totalMin - PT.hitung(y).totalMin || x.urutan - y.urutan);
    else a.sort((x, y) => x.urutan - y.urutan);
    return a;
  };

  const tombolHal = (n, label, aktif, mati, aria) =>
    `<li class="page-item${aktif ? ' active' : ''}${mati ? ' disabled' : ''}">
       <button type="button" class="page-link" data-hal="${n}"${aktif ? ' aria-current="page"' : ''}${mati ? ' disabled' : ''} aria-label="${aria || 'Halaman ' + label}">${label}</button></li>`;

  const render = () => {
    const hasil = urutkan(DESTINASI.filter(cocok));
    const total = hasil.length;
    const jumlahHal = Math.max(1, Math.ceil(total / PER_HALAMAN));
    state.hal = Math.min(state.hal, jumlahHal);
    const awal = (state.hal - 1) * PER_HALAMAN;
    const tampil = hasil.slice(awal, awal + PER_HALAMAN);

    el('hasil-info').textContent = total
      ? `Menampilkan ${awal + 1}–${awal + tampil.length} dari ${total} destinasi`
      : 'Menampilkan 0 destinasi';

    el('daftar').innerHTML = total
      ? tampil.map((d) => `<div class="col">${PT.kartu(d, 'lengkap')}</div>`).join('')
      : `<div class="col-12"><div class="kosong">
           <h3>Destinasi tidak ditemukan</h3>
           <p>Coba ubah kata kunci atau kurangi filter yang dipilih.</p>
           <button type="button" class="btn btn-outline-pt" id="kosong-reset">Reset filter</button>
         </div></div>`;

    let paging = '';
    if (jumlahHal > 1) {
      paging = tombolHal(state.hal - 1, '‹', false, state.hal === 1, 'Halaman sebelumnya');
      for (let i = 1; i <= jumlahHal; i++) paging += tombolHal(i, i, i === state.hal, false);
      paging += tombolHal(state.hal + 1, '›', false, state.hal === jumlahHal, 'Halaman berikutnya');
      paging = `<nav aria-label="Halaman destinasi"><ul class="pagination justify-content-center mt-4 mb-0">${paging}</ul></nav>`;
    }
    el('paging').innerHTML = paging;
    tulisUrl();
  };

  const tutupPanel = () => {
    const panel = el('panel-filter');
    if (window.bootstrap && panel.classList.contains('show')) bootstrap.Offcanvas.getOrCreateInstance(panel).hide();
  };
  const terapkan = () => { dariForm(); render(); tutupPanel(); };
  const reset = () => {
    state = { q: '', kat: [], fas: [], harga: 'semua', urut: 'populer', hal: 1 };
    isiForm(); render(); tutupPanel();
  };

  /* ---------- event ---------- */
  el('form-cari').addEventListener('submit', (e) => { e.preventDefault(); terapkan(); });
  el('form-filter').addEventListener('submit', (e) => { e.preventDefault(); terapkan(); });
  el('btn-reset').addEventListener('click', reset);
  el('urut').addEventListener('change', () => { state.urut = el('urut').value; state.hal = 1; render(); });
  el('paging').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-hal]');
    if (!b || b.disabled) return;
    state.hal = parseInt(b.dataset.hal, 10);
    render();
    el('hasil-info').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  el('daftar').addEventListener('click', (e) => { if (e.target.id === 'kosong-reset') reset(); });
  el('cari-ikon').innerHTML = PT.svg('search', 18);

  isiForm();
  render();
})();
