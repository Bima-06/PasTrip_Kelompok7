(() => {
  PT.layout('beranda');

  document.getElementById('kategori-daftar').innerHTML = PT.KATEGORI.map((k) =>
    `<div class="col"><a class="kat-item" href="destinasi.html?kat=${encodeURIComponent(k)}">
       <span class="kat-ikon kat-${PT.KAT_KELAS[k]}">${PT.svg(PT.IKON_KAT[k], 24)}</span><span>${k}</span>
     </a></div>`).join('');

  const populer = DESTINASI.slice().sort((a, b) => a.urutan - b.urutan).slice(0, 4);
  document.getElementById('populer-daftar').innerHTML = populer.map((d) =>
    `<div class="col">${PT.kartu(d, 'ringkas')}</div>`).join('');

  document.getElementById('cari-ikon').innerHTML = PT.svg('search', 18);
  document.getElementById('form-cari').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('q').value.trim();
    location.href = 'destinasi.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  });
})();
