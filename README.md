<!--
  File: README.md
  Tujuan: Dokumentasi ringkas project portfolio statis dan panduan maintenance repo.
  Dipakai oleh: Developer/maintainer repo ini.
  Dependensi utama: index.html, js/data.js, js/render.js, js/nav.js, js/tailwind.config.js, css/styles.css, assets/.
  Fungsi public/utama: Menjelaskan struktur project, fitur aktif, lokasi file penting, dan alur update.
  Side effect penting: Tidak ada runtime side effect; hanya referensi dokumentasi.
-->

# Portfolio - Dimas Robby Candra

Portfolio statis berbasis `HTML + Tailwind CDN + vanilla JavaScript` untuk menampilkan profil, experience, skills, certifications, project highlight, contact links, dan download CV.

## Struktur Project

```text
porto/
|-- index.html
|-- README.md
|-- assets/
|   `-- 
|-- css/
|   `-- styles.css
`-- js/
    |-- data.js
    |-- nav.js
    |-- render.js
    `-- tailwind.config.js
```

## Fungsi File

- `index.html`
  Entry page dan markup semua section utama.

- `js/data.js`
  Sumber konten utama: nama, role, stats, experience, skills, certifications, social links, dan path CV.

- `js/render.js`
  Render data dinamis dari `SITE_DATA` ke hero tags, stats, experience, skills, certifications, dan contact links.

- `js/nav.js`
  Interaksi navigasi: mobile menu overlay, animasi burger ke `X`, active nav state, dan reveal animation saat scroll.

- `js/tailwind.config.js`
  Design tokens Tailwind CDN: warna, spacing, typography, radius.

- `css/styles.css`
  Styling custom yang tidak efisien jika ditulis sebagai utility class, termasuk nav mobile animation, reveal motion, elegant card hover, dan scroll cue.

- `assets/`
  File CV yang diunduh dari tombol `Resume / CV`.

## Fitur Aktif Saat Ini

- Hero section dengan CTA, tag skills, dan scroll cue animated.
- Desktop nav dengan active dot indicator.
- Mobile nav overlay tanpa mendorong layout, plus animasi `3 garis -> X`.
- Highlight menu aktif di mobile sesuai section yang sedang dilihat.
- Reveal animation halus pada section dan card penting.
- Certifications card dengan hover state konsisten.
- Sertifikat online bisa diklik dan membuka detail di tab baru.
- Tombol `Resume / CV` mengunduh file PDF lokal dari folder `assets/`.

## Cara Update Cepat

- Ubah konten portfolio:
  edit `js/data.js`

- Ubah layout/section:
  edit `index.html`

- Ubah render data dinamis:
  edit `js/render.js`

- Ubah interaksi nav / active state / reveal observer:
  edit `js/nav.js`

- Ubah style / animasi / spacing:
  edit `css/styles.css`

- Ubah token warna / font / spacing global:
  edit `js/tailwind.config.js`

## Menjalankan Project

Project ini tidak membutuhkan build step.

Opsi sederhana:

1. Buka `index.html` langsung di browser.
2. Atau jalankan static server lokal jika ingin testing path/behavior lebih konsisten.

Contoh:

```powershell
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Publish ke GitHub Pages

Project ini sudah siap dipublish sebagai static site di GitHub Pages tanpa build process tambahan.

### Opsi URL

- Project site:
  repo bernama bebas, URL hasil publish akan berbentuk `https://USERNAME.github.io/NAMA-REPO/`

- User site:
  repo harus bernama `USERNAME.github.io`, URL hasil publish akan berbentuk `https://USERNAME.github.io/`

### Langkah Publish

1. Buat repository GitHub.
2. Push isi project ini ke branch `main`.
3. Buka `Settings -> Pages`.
4. Pada `Build and deployment`, pilih:
   `Source: Deploy from a branch`
5. Pilih:
   `Branch: main`
   `Folder: / (root)`
6. Simpan lalu tunggu GitHub Pages selesai publish.

### Command Push Awal

```powershell
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

### Catatan GitHub Pages

- File `.nojekyll` sudah disediakan agar GitHub Pages menyajikan repo ini sebagai static site apa adanya.
- Path asset pada project ini sudah relatif, jadi aman untuk mode project site maupun user site.
- CV di `assets/` akan ikut bisa diunduh setelah repo dipublish.

## Urutan Load Penting

```html
<script src="./js/data.js"></script>
<script src="./js/render.js"></script>
<script src="./js/nav.js"></script>
```

`data.js` harus dimuat sebelum `render.js`.

## Catatan Maintenance

- Repo ini adalah static site, jadi perubahan struktur folder harus selalu diikuti update path di `index.html`.
- Jika file/fungsi/fitur berubah, `README.md` ini harus ikut diperbarui agar tetap akurat.
