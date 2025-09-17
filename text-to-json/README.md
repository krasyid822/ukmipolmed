# WhatsApp Text to Messages.json Converter

Tool untuk mengkonversi teks WhatsApp menjadi format JSON yang kompatibel dengan aplikasi chat viewer.

## Cara Penggunaan

1. **Input Format:**
   ```
   Nama Pengirim: Teks pesan
   avatar: nama_file_avatar.jpg
   media: gambar1.jpg,gambar2.jpg,gambar3.jpg
   ```

2. **Contoh Input:**
   ```
   BgRio UKMI: Bahwa mentoring adalah tentang memulai perjalanan bersama..
   Berbagi suka dan duka..
   
   AYO IKUT MENTORING
   
   Langsung aja ya isi g-form pendaftaran nya..
   https://forms.gle/e4e6egXHiRnyQVPV7
   
   Gratis yg pasti...
   avatar: avatar-bgrio.jpg
   media: foto1.jpg,foto2.jpg,foto3.jpg,foto4.jpg
   ```

3. **Output JSON:**
   ```json
   [
     {
       "sender": "BgRio UKMI",
       "avatar": "avatar-bgrio.jpg",
       "media": ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"],
       "text": "Bahwa mentoring adalah tentang memulai perjalanan bersama..\nBerbagi suka dan duka..\n\nAYO IKUT MENTORING\n\nLangsung aja ya isi g-form pendaftaran nya..\nhttps://forms.gle/e4e6egXHiRnyQVPV7\n\nGratis yg pasti..."
     }
   ]
   ```

## Fitur

- ✅ Parsing otomatis format WhatsApp
- ✅ Support multiple media files
- ✅ Auto-convert saat mengetik
- ✅ Copy to clipboard
- ✅ Responsive design
- ✅ Error handling

## Tips

- Pisahkan setiap pesan dengan baris kosong
- Format sender: `Nama: pesan`
- Format avatar: `avatar: nama_file.jpg`
- Format media: `media: file1.jpg,file2.jpg,file3.jpg`
- Media bisa kosong jika hanya teks
- Gunakan tombol copy untuk menyalin JSON result

Buka `index.html` di browser untuk menggunakan converter.