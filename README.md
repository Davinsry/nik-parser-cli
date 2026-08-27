# nik-parser-cli

Parser NIK KTP Indonesia sebagai container. Kasih NIK, dapat JSON.

```
docker run --rm ghcr.io/davinsry/nik-parser-cli 3175034503920001
```

```json
{
  "nik": "3175034503920001",
  "kodeProvinsi": "31",
  "provinsi": "DKI Jakarta",
  "kodeKabupaten": "75",
  "kodeKecamatan": "03",
  "jenisKelamin": "P",
  "tanggalLahir": "1992-03-05",
  "urut": "0001"
}
```

Exit code: `0` sukses, `1` NIK tidak valid (pesan error ke stderr), `2` argumen
kurang. Jadi enak dipakai di shell script:

```bash
docker run --rm ghcr.io/davinsry/nik-parser-cli "$NIK" > hasil.json || echo "NIK ngawur"
```

## Cara baca NIK

`31 75 03 450392 0001`

| Bagian | Arti |
| --- | --- |
| `31` | Provinsi |
| `75` | Kabupaten/kota |
| `03` | Kecamatan |
| `450392` | Tanggal lahir (DDMMYY, **DD + 40 untuk perempuan**) |
| `0001` | Nomor urut penerbitan |

## Catatan

`nik.js` adalah salinan dari [nik-parser](https://github.com/Davinsry/nik-parser).
Sengaja di-vendor, bukan di-`npm install`, supaya `docker build` nggak butuh
autentikasi ke GitHub Packages. Kalau parser-nya berubah, salin ulang.

Ini parser format, bukan validasi identitas — NIK yang formatnya benar belum
tentu terdaftar di Dukcapil.

## Lisensi

MIT
