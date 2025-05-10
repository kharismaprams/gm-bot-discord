````markdown
# Discord GM Sender Bot

## Deskripsi

Script ini digunakan untuk mengirim pesan "GM" (Good Morning) otomatis ke banyak channel Discord menggunakan beberapa akun Discord. Tergantung pada mode yang dipilih, bot dapat berjalan otomatis pada waktu tertentu (auto mode) atau dikendalikan secara manual (manual mode). Setiap akun Discord yang digunakan akan login secara otomatis dan mengirimkan pesan ke channel-channel yang telah dikonfigurasi.

## Fitur

- **Auto Mode**: Mengirimkan pesan "GM" otomatis pada waktu yang dijadwalkan.
- **Manual Mode**: Menjalankan pengiriman pesan "GM" segera setelah script dijalankan.
- **Multiple Accounts**: Mendukung pengiriman pesan menggunakan banyak akun Discord.
- **Logging**: Mencatat log setiap kali pesan berhasil dikirim, termasuk nama server dan channel.
- **Token Management**: Mendukung token yang disimpan dalam file `token.json`.

## Persyaratan

- Node.js (v14 atau lebih baru)
- Package NPM yang dibutuhkan
  - `discord.js-selfbot-v13`
  - `node-cron`
  - `moment`
  
Untuk menginstal dependensi yang diperlukan, jalankan perintah berikut di terminal:

```bash
npm install discord.js-selfbot-v13 node-cron moment
````

## Instalasi

1. Clone atau download repositori ini.

2. Instal dependensi yang diperlukan dengan menjalankan perintah:

   ```bash
   npm install
   ```

3. Buat file `config.json` di direktori yang sama dengan `gm.js`. Contoh struktur file `config.json`:

   ```json
   {
  "schedule": "0 7 * * *",
  "mode": "auto", // atau mode manual, ubah "auto" jadi "manual"
  "accounts": [
    {
      "servers": [
        {
          "label": "NAMA PROJECT",
          "guildId": "SERVER_ID_1",
          "channels": [
            {
              "id": "CHANNEL_ID_1",
              "message": "ISI PESAN GM"
            }
          ] 
          },
        {
          "label": "NAMA PROJECT 2",
          "guildId": "SERVER_ID_2",
          "channels": [
            {
              "id": "CHANNEL_ID_2",
              "message": "ISI PESAN GM"
            }
          ]
           }
         ]
       }
     ]
   }
   ```

   * **mode**: Pilihan antara `auto` atau `manual`.
   * **schedule**: Waktu otomatis pengiriman pesan jika mode `auto`. Format cron (misal, `"0 7 * * *"` untuk jam 7 pagi setiap hari).
   * **accounts**: Daftar akun Discord yang digunakan. Tiap akun memiliki token, server, dan channel yang diinginkan untuk mengirimkan pesan.

4. Buat file `token.json` yang berisi token Discord untuk setiap akun yang akan digunakan. Format file `token.json`:

   ```json
   {
     "Account1": "YOUR_DISCORD_TOKEN_1",
     "Account2": "YOUR_DISCORD_TOKEN_2"
   }
   ```

5. Jalankan script:

   ```bash
   node gm.js
   ```

## Cara Mendapatkan API Token Discord

Untuk mendapatkan token API Discord, kamu bisa menggunakan cara berikut dengan mengeksekusi kode JavaScript pada konsol browser:

1. **Login ke Discord Web**: Masuk ke [Discord Web](https://discord.com/login) dengan akun Discord yang digunakan.

2. **Buka Developer Tools**:

   * Di browser Chrome atau Firefox, tekan `Ctrl + Shift + I` atau `Cmd + Option + I` di Mac untuk membuka Developer Tools.

3. **Buka Tab Console**: Setelah Developer Tools terbuka, pilih tab `Console`.

4. **Masukkan Kode berikut**:
   Salin dan jalankan kode ini di konsol:

   ```javascript
   window.webpackChunkdiscord_app.push([
     [Math.random()],
     {},
     (req) => {
       for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) {
         if (m.default && m.default.getToken) {
           console.log("✅ Token kamu:", m.default.getToken());
           break;
         }
       }
     }
   ]);
   ```

   * Setelah menjalankan kode ini, token Discord kamu akan dicetak di konsol. Token ini bisa digunakan dalam file `token.json` untuk login dengan bot menggunakan `discord.js-selfbot-v13`.

5. **Perhatian**: Token ini adalah akses pribadi ke akun Discord kamu. Jangan membagikan token ini kepada orang lain atau menyimpannya di tempat yang tidak aman.

## Struktur Direktori

```
/discord-gm-bot
├── config.json         # Konfigurasi bot
├── token.json          # Token API Discord untuk setiap akun
├── gm.js            # Script utama
├── README.md           # Dokumentasi ini
└── node_modules/       # Modul-modul Node.js yang diinstal
```

## Menjalankan Bot di Mode Otomatis

Untuk menjalankan bot dalam mode otomatis yang mengirimkan pesan pada jadwal tertentu (misalnya jam 7 pagi setiap hari), pastikan `mode` di `config.json` diatur ke `"auto"`, dan tentukan jadwal cron yang sesuai di `schedule`.

Setelah itu, jalankan bot dengan perintah:

```bash
node gm.js
```

## Menjalankan Bot di Mode Manual

Untuk menjalankan bot dalam mode manual, di mana bot mengirimkan pesan segera setelah script dijalankan, pastikan `mode` di `config.json` diatur ke `"manual"`.

Jalankan bot dengan perintah:

```bash
node gm.js
```

Bot akan mengirimkan pesan "GM" ke server dan channel yang telah dikonfigurasi.

## Penggunaan Lain

* **Menambah Akun**: Kamu bisa menambah akun baru dengan menambahkan token baru di `token.json` dan menambah konfigurasi akun di `config.json`.
* **Menambah Server/Channel**: Kamu bisa menambah server dan channel dengan menambahkan ID server dan ID channel pada bagian `servers` di konfigurasi akun di `config.json`.

## Lisensi

MIT License. Lihat file `LICENSE` untuk informasi lebih lanjut.

```
