/* ==========================================================
   Data destinasi PasTrip (data contoh untuk tugas Desain Web)

   Cara membaca angka:
   - tiket   : [harga terendah, harga tertinggi] per orang, dalam rupiah. 0 = gratis
   - parkir  : biaya parkir motor. Isi parkirLabel bila tampil berupa teks
   - tambahan: [terendah, tertinggi] perkiraan biaya lain
   - Total per orang dihitung otomatis di js/app.js (tiket + parkir + tambahan)
   - video   : (opsional) lokasi file mp4. Thumbnail "Video" hanya muncul bila field ini ada

   PERLU DIVERIFIKASI sebelum dipakai sungguhan:
   - Tarif tiket dan parkir (sumber berita; bisa berubah)
   - Jam operasional, biaya tambahan, fasilitas, dan rute (perkiraan)
   - Rating dan ulasan: data contoh, bukan data nyata
   - Nomor WhatsApp dan telepon: nomor contoh
   ========================================================== */
const DESTINASI = [
  {
    id: 'pantai-parangtritis', urutan: 1, nama: 'Pantai Parangtritis', kategori: 'Pantai',
    lokasi: 'Kretek, Bantul, DI Yogyakarta', rating: 4.8, ulasan: 120,
    tiket: [15000, 15000], parkir: 5000, tambahan: [20000, 50000],
    tambahanLabel: 'delman, ATV, kuliner',
    catatan: 'Parkir mobil Rp 10.000.',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan', 'Penginapan', 'Akses Disabilitas'],
    aktivitas: ['Menikmati sunset', 'Fotografi', 'Naik delman', 'Bermain layang-layang', 'ATV pantai'],
    jam: 'Setiap hari, buka 24 jam',
    video: 'img/pantai-parangtritis.mp4',
    deskripsi: 'Pantai legendaris di pesisir selatan Bantul dengan ombak besar, gumuk pasir, dan pemandangan matahari terbenam. Cocok untuk wisata keluarga, foto, dan kuliner seafood. Ombaknya kuat, jadi patuhi arahan petugas SAR.',
    logistik: {
      jalan: '±27 km dari pusat Kota Yogyakarta; jalan aspal mulus.',
      parkir: 'Tersedia untuk motor, mobil, dan bus di area pantai.',
      transport: 'Kendaraan pribadi, ojek online, atau bus dari Terminal Giwangan.'
    },
    alamat: 'Jl. Parangtritis, Kretek, Bantul, DI Yogyakarta',
    peta: 'Pantai Parangtritis, Bantul',
    ulasanList: [
      { nama: 'Rina Putri', tanggal: '5 Okt 2026', bintang: 5, isi: 'Sunset-nya bagus dan pantainya luas. Ombak besar, tetap ikuti arahan petugas.' },
      { nama: 'Budi Santoso', tanggal: '28 Sep 2026', bintang: 4, isi: 'Biaya sesuai dengan yang tertulis di sini. Warung seafood banyak dan harganya wajar.' },
      { nama: 'Dewi Lestari', tanggal: '14 Sep 2026', bintang: 4.5, isi: 'Cocok untuk keluarga, tapi jangan berenang terlalu ke tengah.' }
    ]
  },
  {
    id: 'gunung-bromo', urutan: 2, nama: 'Gunung Bromo', kategori: 'Wisata Alam',
    lokasi: 'Probolinggo, Jawa Timur', rating: 4.7, ulasan: 98,
    tiket: [54000, 79000], parkir: 5000, tambahan: [30000, 100000],
    tambahanLabel: 'jeep patungan, kuda, kuliner',
    catatan: 'Tiket Rp 54.000 hari kerja dan Rp 79.000 hari libur; dibeli online.',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan', 'Penginapan'],
    aktivitas: ['Melihat sunrise', 'Fotografi', 'Berkuda', 'Wisata jeep'],
    jam: 'Setiap hari; cek status kawasan sebelum berangkat',
    deskripsi: 'Kawasan gunung berapi di Taman Nasional Bromo Tengger Semeru dengan lautan pasir, kawah, dan panorama sunrise. Status kawasan bisa berubah karena aktivitas gunung, jadi cek pengumuman resmi sebelum berangkat.',
    logistik: {
      jalan: 'Jalur ke penanjakan dan lautan pasir butuh jeep atau kendaraan 4WD.',
      parkir: 'Area parkir di titik masuk kawasan; kendaraan biasa tidak masuk ke lautan pasir.',
      transport: 'Kendaraan pribadi, travel, atau sewa jeep dari Probolinggo dan Malang.'
    },
    alamat: 'Taman Nasional Bromo Tengger Semeru, Probolinggo, Jawa Timur',
    peta: 'Gunung Bromo, Probolinggo'
  },
  {
    id: 'candi-borobudur', urutan: 3, nama: 'Candi Borobudur', kategori: 'Wisata Budaya',
    lokasi: 'Magelang, Jawa Tengah', rating: 4.9, ulasan: 210,
    tiket: [50000, 50000], parkir: 5000, tambahan: [20000, 120000],
    tambahanLabel: 'naik candi, kuliner, suvenir',
    catatan: 'Naik ke struktur candi memakai tiket terpisah (perkiraan Rp 120.000) dan kuota harian.',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan', 'Akses Disabilitas'],
    aktivitas: ['Berkeliling kompleks candi', 'Fotografi', 'Melihat sunrise', 'Belanja suvenir'],
    jam: 'Setiap hari; cek jadwal dan kuota naik candi',
    deskripsi: 'Candi Buddha abad ke-9 yang menjadi situs warisan dunia UNESCO. Tiket pelataran dan tiket naik candi dibeli terpisah, dan naik candi memakai sistem kuota.',
    logistik: {
      jalan: 'Akses jalan raya dari Magelang dan Yogyakarta, aspal mulus.',
      parkir: 'Area parkir luas untuk motor, mobil, dan bus.',
      transport: 'Kendaraan pribadi, travel, atau bus dari Yogyakarta dan Magelang.'
    },
    alamat: 'Jl. Badrawati, Borobudur, Magelang, Jawa Tengah',
    peta: 'Candi Borobudur, Magelang'
  },
  {
    id: 'desa-wisata-penglipuran', urutan: 4, nama: 'Desa Wisata Penglipuran', kategori: 'Wisata Budaya',
    lokasi: 'Bangli, Bali', rating: 4.6, ulasan: 76,
    tiket: [25000, 25000], parkir: 0, parkirLabel: 'Termasuk tiket', tambahan: [20000, 60000],
    tambahanLabel: 'kuliner, oleh-oleh',
    fasilitas: ['Parkir', 'Toilet', 'Warung Makan'],
    aktivitas: ['Berjalan di desa adat', 'Fotografi', 'Mencicipi kuliner lokal', 'Belanja kerajinan'],
    jam: 'Setiap hari; cek jam kunjungan terbaru',
    deskripsi: 'Desa adat di Bangli yang dikenal dengan tata ruang rapi dan rumah-rumah adat yang seragam. Pengunjung diminta menjaga kesopanan dan menghormati aturan desa.',
    logistik: {
      jalan: 'Jalan aspal menuju desa; perjalanan dari kawasan Ubud dan Denpasar dengan kendaraan.',
      parkir: 'Area parkir di pintu masuk desa.',
      transport: 'Kendaraan pribadi, atau sewa mobil atau motor dengan sopir.'
    },
    alamat: 'Desa Penglipuran, Bangli, Bali',
    peta: 'Desa Penglipuran, Bangli'
  },
  {
    id: 'air-terjun-tumpak-sewu', urutan: 5, nama: 'Air Terjun Tumpak Sewu', kategori: 'Petualangan',
    lokasi: 'Lumajang, Jawa Timur', rating: 4.7, ulasan: 88,
    tiket: [20000, 20000], parkir: 5000, tambahan: [20000, 100000],
    tambahanLabel: 'pemandu trekking, kuliner',
    fasilitas: ['Parkir', 'Toilet', 'Warung Makan'],
    aktivitas: ['Melihat air terjun dari titik pandang', 'Trekking ke dasar air terjun', 'Fotografi', 'Mencicipi kuliner lokal'],
    jam: 'Setiap hari; cek cuaca dan kondisi jalur',
    deskripsi: 'Air terjun bertingkat lebar di perbatasan Lumajang dan Malang. Jalur menuju dasar licin dan menantang, jadi gunakan alas kaki yang tepat dan pertimbangkan pemandu lokal.',
    logistik: {
      jalan: 'Sebagian jalan menuju lokasi sempit dan berkelok; hati-hati saat hujan.',
      parkir: 'Area parkir sederhana untuk motor dan mobil.',
      transport: 'Kendaraan pribadi atau ojek lokal dari terminal terdekat.'
    },
    alamat: 'Air Terjun Tumpak Sewu, Sidomulyo, Pronojiwo, Lumajang, Jawa Timur',
    peta: 'Air Terjun Tumpak Sewu, Lumajang'
  },
  {
    id: 'pasar-gede-hardjonagoro', urutan: 6, nama: 'Pasar Gede Hardjonagoro', kategori: 'Wisata Kuliner',
    lokasi: 'Surakarta, Jawa Tengah', rating: 4.5, ulasan: 140,
    tiket: [0, 0], parkir: 3000, tambahan: [30000, 80000],
    tambahanLabel: 'jajanan, es dawet, oleh-oleh',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan'],
    aktivitas: ['Berburu jajanan pasar', 'Fotografi arsitektur pasar', 'Belanja oleh-oleh', 'Menjelajah kawasan Pecinan Solo'],
    jam: 'Setiap hari, sekitar 08.00 - 17.00 WIB',
    deskripsi: 'Pasar tradisional bersejarah di tengah Kota Solo yang terkenal dengan jajanan dan kuliner khasnya. Waktu terbaik berkunjung adalah pagi sampai siang.',
    logistik: {
      jalan: 'Di pusat Kota Surakarta; jalan aspal mulus tapi ramai.',
      parkir: 'Parkir terbatas di sekitar pasar; datang lebih pagi.',
      transport: 'Mudah dijangkau dengan angkutan kota, Batik Solo Trans, atau ojek online.'
    },
    alamat: 'Jl. Jenderal Urip Sumoharjo, Sudiroprajan, Jebres, Surakarta',
    peta: 'Pasar Gede Hardjonagoro, Surakarta'
  },
  {
    id: 'candi-prambanan', urutan: 7, nama: 'Candi Prambanan', kategori: 'Wisata Budaya',
    lokasi: 'Sleman, DI Yogyakarta', rating: 4.8, ulasan: 132,
    tiket: [50000, 50000], parkir: 5000, tambahan: [20000, 60000],
    tambahanLabel: 'kereta wisata, kuliner, suvenir',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan', 'Akses Disabilitas'],
    aktivitas: ['Berkeliling kompleks candi', 'Fotografi', 'Menonton sendratari (jadwal tertentu)', 'Belanja suvenir'],
    jam: 'Setiap hari; cek jadwal terbaru',
    deskripsi: 'Kompleks candi Hindu abad ke-9 dengan candi-candi tinggi yang ramping, di perbatasan Yogyakarta dan Klaten. Sendratari Ramayana dipentaskan pada jadwal tertentu.',
    logistik: {
      jalan: 'Dekat jalan Yogyakarta-Solo, aspal mulus.',
      parkir: 'Area parkir luas untuk motor, mobil, dan bus.',
      transport: 'Kendaraan pribadi, Trans Jogja, atau ojek online.'
    },
    alamat: 'Jl. Raya Solo - Yogyakarta No.16, Prambanan, Sleman, DI Yogyakarta',
    peta: 'Candi Prambanan, Sleman'
  },
  {
    id: 'kawah-putih-ciwidey', urutan: 8, nama: 'Kawah Putih Ciwidey', kategori: 'Wisata Alam',
    lokasi: 'Bandung, Jawa Barat', rating: 4.6, ulasan: 104,
    tiket: [30000, 30000], parkir: 5000, tambahan: [29000, 60000],
    tambahanLabel: 'ontang-anting, kuliner',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan'],
    aktivitas: ['Berfoto di tepi kawah', 'Naik ontang-anting', 'Menikmati udara pegunungan', 'Mencicipi kuliner Ciwidey'],
    jam: 'Setiap hari, pagi sampai sore; cek jam terbaru',
    deskripsi: 'Danau kawah vulkanik berwarna putih kehijauan di dataran tinggi Ciwidey, Bandung Selatan. Udara dingin dan ada bau belerang, jadi bawa jaket dan masker bila perlu.',
    logistik: {
      jalan: 'Jalan menanjak dan berkelok dari Ciwidey; hati-hati saat berkabut.',
      parkir: 'Area parkir tersedia; dari parkiran naik kendaraan wisata atau berjalan.',
      transport: 'Kendaraan pribadi atau travel dari Bandung.'
    },
    alamat: 'Jl. Raya Soreang - Ciwidey, Alam Endah, Rancabali, Kabupaten Bandung, Jawa Barat',
    peta: 'Kawah Putih, Ciwidey'
  },
  {
    id: 'taman-sari', urutan: 9, nama: 'Taman Sari', kategori: 'Wisata Budaya',
    lokasi: 'Yogyakarta, DI Yogyakarta', rating: 4.5, ulasan: 118,
    tiket: [15000, 15000], parkir: 3000, tambahan: [20000, 60000],
    tambahanLabel: 'pemandu, kuliner, suvenir',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan'],
    aktivitas: ['Menyusuri bekas kompleks pemandian', 'Fotografi', 'Belajar sejarah bersama pemandu', 'Menjelajah kampung sekitar'],
    jam: 'Setiap hari, 09.00 - 15.00 WIB',
    deskripsi: 'Bekas taman dan tempat peristirahatan keluarga Keraton Yogyakarta dengan kolam pemandian, lorong, dan bangunan bergaya khas. Cocok dijelajahi dengan pemandu lokal.',
    logistik: {
      jalan: 'Di kawasan Keraton Yogyakarta; gang sekitar sempit.',
      parkir: 'Parkir terbatas, tersedia di sekitar kawasan.',
      transport: 'Mudah dijangkau dengan Trans Jogja, becak, atau ojek online.'
    },
    alamat: 'Jl. Tamansari, Patehan, Kraton, Yogyakarta',
    peta: 'Taman Sari, Yogyakarta'
  },
  {
    id: 'pura-mangkunegaran', urutan: 10, nama: 'Pura Mangkunegaran', kategori: 'Wisata Budaya',
    lokasi: 'Surakarta, Jawa Tengah', rating: 4.6, ulasan: 64,
    tiket: [30000, 30000], parkir: 3000, tambahan: [20000, 60000],
    tambahanLabel: 'kuliner, batik',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan'],
    aktivitas: ['Melihat bangunan dan koleksi istana', 'Fotografi', 'Mengenal budaya Jawa bersama pemandu', 'Belanja batik di sekitar'],
    jam: 'Cek jam kunjungan terbaru dari pengelola',
    deskripsi: 'Istana Kadipaten Mangkunegaran di Solo dengan pendapa luas dan koleksi budaya Jawa. Kunjungan biasanya disertai pemandu.',
    logistik: {
      jalan: 'Di pusat Kota Solo; jalan aspal mulus.',
      parkir: 'Area parkir terbatas di sekitar istana.',
      transport: 'Mudah dijangkau dengan Batik Solo Trans atau ojek online.'
    },
    alamat: 'Jl. Ronggowarsito No.67, Keprabon, Banjarsari, Surakarta',
    peta: 'Pura Mangkunegaran, Surakarta'
  },
  {
    id: 'kampung-batik-kauman', urutan: 11, nama: 'Kampung Batik Kauman', kategori: 'Wisata Budaya',
    lokasi: 'Surakarta, Jawa Tengah', rating: 4.4, ulasan: 52,
    tiket: [0, 0], parkir: 3000, tambahan: [25000, 100000],
    tambahanLabel: 'belanja batik, kelas membatik',
    fasilitas: ['Parkir', 'Musala', 'Warung Makan'],
    aktivitas: ['Berjalan di kampung batik', 'Melihat proses membatik', 'Belanja batik', 'Fotografi'],
    jam: 'Setiap hari; jam buka tiap toko berbeda',
    deskripsi: 'Kampung pengrajin batik di dekat Keraton Surakarta dan Masjid Agung. Tidak ada tiket masuk; biaya hanya untuk parkir, belanja, atau kelas membatik.',
    logistik: {
      jalan: 'Di pusat kota; gang kampung sempit, cocok ditelusuri dengan berjalan.',
      parkir: 'Parkir kendaraan di sekitar kawasan.',
      transport: 'Mudah dijangkau dengan Batik Solo Trans atau ojek online.'
    },
    alamat: 'Kauman, Pasar Kliwon, Surakarta',
    peta: 'Kampung Batik Kauman, Surakarta'
  },
  {
    id: 'malioboro', urutan: 12, nama: 'Malioboro', kategori: 'Wisata Kuliner',
    lokasi: 'Yogyakarta, DI Yogyakarta', rating: 4.5, ulasan: 230,
    tiket: [0, 0], parkir: 3000, tambahan: [30000, 100000],
    tambahanLabel: 'kuliner, oleh-oleh',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan', 'Akses Disabilitas'],
    aktivitas: ['Berburu kuliner kaki lima', 'Belanja batik dan suvenir', 'Berjalan di kawasan pedestrian', 'Naik andong'],
    jam: 'Setiap hari; paling ramai sore hingga malam',
    deskripsi: 'Jalan pusat wisata Yogyakarta yang ramai dengan pedagang, kuliner, dan toko oleh-oleh. Akhir pekan dan musim liburan biasanya sangat padat.',
    logistik: {
      jalan: 'Kawasan pedestrian di pusat kota; ramai saat akhir pekan.',
      parkir: 'Parkir tersedia di tempat parkir resmi sekitar kawasan.',
      transport: 'Dekat Stasiun Tugu; mudah dijangkau dengan Trans Jogja dan ojek online.'
    },
    alamat: 'Jl. Malioboro, Sosromenduran, Gedong Tengen, Yogyakarta',
    peta: 'Malioboro, Yogyakarta'
  },
  {
    id: 'pantai-kuta', urutan: 13, nama: 'Pantai Kuta', kategori: 'Pantai',
    lokasi: 'Badung, Bali', rating: 4.4, ulasan: 145,
    tiket: [0, 0], parkir: 5000, tambahan: [30000, 100000],
    tambahanLabel: 'sewa papan selancar, kuliner',
    fasilitas: ['Parkir', 'Toilet', 'Warung Makan', 'Penginapan'],
    aktivitas: ['Menikmati sunset', 'Belajar berselancar', 'Berjalan di tepi pantai', 'Fotografi'],
    jam: 'Setiap hari, buka 24 jam',
    deskripsi: 'Pantai terkenal di Bali dengan pasir luas dan ombak yang cocok untuk belajar berselancar. Perhatikan bendera dan arahan petugas penyelamat sebelum berenang.',
    logistik: {
      jalan: 'Dekat Bandara Ngurah Rai; lalu lintas ramai saat jam sibuk.',
      parkir: 'Area parkir tersedia di sekitar pantai.',
      transport: 'Taksi, ojek online, atau kendaraan sewaan.'
    },
    alamat: 'Kuta, Badung, Bali',
    peta: 'Pantai Kuta, Badung'
  },
  {
    id: 'pasar-beringharjo', urutan: 14, nama: 'Pasar Beringharjo', kategori: 'Wisata Kuliner',
    lokasi: 'Yogyakarta, DI Yogyakarta', rating: 4.4, ulasan: 96,
    tiket: [0, 0], parkir: 3000, tambahan: [30000, 150000],
    tambahanLabel: 'batik, jajanan, oleh-oleh',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan'],
    aktivitas: ['Belanja batik', 'Berburu jajanan pasar', 'Berfoto di kawasan Malioboro', 'Menawar harga oleh-oleh'],
    jam: 'Setiap hari; ramai pagi hingga sore',
    deskripsi: 'Pasar tradisional di ujung Malioboro yang terkenal dengan batik, jajanan, dan kebutuhan harian. Menawar harga sudah biasa di sini.',
    logistik: {
      jalan: 'Di kawasan Malioboro; padat saat akhir pekan.',
      parkir: 'Parkir terbatas; gunakan parkir resmi sekitar Malioboro.',
      transport: 'Dekat Stasiun Tugu dan halte Trans Jogja; mudah dijangkau dengan ojek online.'
    },
    alamat: 'Jl. Margo Mulyo No.16, Ngupasan, Gondomanan, Yogyakarta',
    peta: 'Pasar Beringharjo, Yogyakarta'
  },
  {
    id: 'dataran-tinggi-dieng', urutan: 15, nama: 'Dataran Tinggi Dieng', kategori: 'Wisata Alam',
    lokasi: 'Wonosobo, Jawa Tengah', rating: 4.7, ulasan: 87,
    tiket: [20000, 20000], parkir: 5000, tambahan: [30000, 100000],
    tambahanLabel: 'mi ongklok, carica, wahana',
    fasilitas: ['Parkir', 'Toilet', 'Musala', 'Warung Makan', 'Penginapan'],
    aktivitas: ['Menikmati udara pegunungan', 'Melihat kawah dan telaga', 'Fotografi', 'Mencicipi kuliner khas Dieng'],
    jam: 'Setiap hari; cek jam tiap objek wisata',
    deskripsi: 'Dataran tinggi di Wonosobo dan Banjarnegara dengan kawah, telaga, dan candi kuno. Udara sangat dingin, terutama pagi hari.',
    logistik: {
      jalan: 'Jalan menanjak dan berkelok; hati-hati saat berkabut.',
      parkir: 'Area parkir tersedia di tiap objek wisata.',
      transport: 'Kendaraan pribadi atau travel dari Wonosobo.'
    },
    alamat: 'Dieng, Wonosobo, Jawa Tengah',
    peta: 'Dataran Tinggi Dieng, Wonosobo'
  }
];
