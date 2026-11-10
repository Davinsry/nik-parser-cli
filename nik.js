// Kode provinsi mengikuti Kepmendagri 050-145/2022 (38 provinsi).
// Kode Papua di NIK tidak berubah (91=Papua, 92=Papua Barat); provinsi baru
// mendapat 93-96. Urutan BPS (94=Papua, 97) tidak dipakai di NIK.
const PROVINSI = {
  11: "Aceh",
  12: "Sumatera Utara",
  13: "Sumatera Barat",
  14: "Riau",
  15: "Jambi",
  16: "Sumatera Selatan",
  17: "Bengkulu",
  18: "Lampung",
  19: "Kepulauan Bangka Belitung",
  21: "Kepulauan Riau",
  31: "DKI Jakarta",
  32: "Jawa Barat",
  33: "Jawa Tengah",
  34: "DI Yogyakarta",
  35: "Jawa Timur",
  36: "Banten",
  51: "Bali",
  52: "Nusa Tenggara Barat",
  53: "Nusa Tenggara Timur",
  61: "Kalimantan Barat",
  62: "Kalimantan Tengah",
  63: "Kalimantan Selatan",
  64: "Kalimantan Timur",
  65: "Kalimantan Utara",
  71: "Sulawesi Utara",
  72: "Sulawesi Tengah",
  73: "Sulawesi Selatan",
  74: "Sulawesi Tenggara",
  75: "Gorontalo",
  76: "Sulawesi Barat",
  81: "Maluku",
  82: "Maluku Utara",
  91: "Papua",
  92: "Papua Barat",
  93: "Papua Selatan",
  94: "Papua Tengah",
  95: "Papua Pegunungan",
  96: "Papua Barat Daya",
};

/**
 * Bongkar NIK 16 digit jadi komponennya.
 * @param {string} nik
 * @returns {{nik: string, kodeProvinsi: string, provinsi: string|null,
 *   kodeKabupaten: string, kodeKecamatan: string, jenisKelamin: "L"|"P",
 *   tanggalLahir: string, urut: string}}
 * @throws {TypeError|RangeError} kalau NIK tidak valid
 */
export function parseNIK(nik) {
  if (typeof nik !== "string" || !/^\d{16}$/.test(nik)) {
    throw new TypeError("NIK harus berupa string 16 digit angka");
  }

  const hh = Number(nik.slice(6, 8));
  const bb = Number(nik.slice(8, 10));
  const tt = Number(nik.slice(10, 12));

  const perempuan = hh > 40;
  const tanggal = perempuan ? hh - 40 : hh;

  // ponytail: tahun 2 digit ambigu. Asumsi: <= tahun sekarang berarti 2000-an.
  // Artinya lansia >100 tahun salah abad — ganti kalau memang jadi masalah.
  const abadIni = new Date().getFullYear() % 100;
  const tahun = tt <= abadIni ? 2000 + tt : 1900 + tt;

  const lahir = new Date(Date.UTC(tahun, bb - 1, tanggal));
  const valid =
    tanggal >= 1 &&
    bb >= 1 &&
    bb <= 12 &&
    lahir.getUTCDate() === tanggal &&
    lahir.getUTCMonth() === bb - 1;
  if (!valid) throw new RangeError(`Tanggal lahir tidak valid pada NIK: ${nik}`);

  const kodeProvinsi = nik.slice(0, 2);
  return {
    nik,
    kodeProvinsi,
    provinsi: PROVINSI[kodeProvinsi] ?? null,
    kodeKabupaten: nik.slice(2, 4),
    kodeKecamatan: nik.slice(4, 6),
    jenisKelamin: perempuan ? "P" : "L",
    tanggalLahir: lahir.toISOString().slice(0, 10),
    urut: nik.slice(12),
  };
}

/** True kalau NIK bisa diparse. */
export function isValidNIK(nik) {
  try {
    parseNIK(nik);
    return true;
  } catch {
    return false;
  }
}

export { PROVINSI };
