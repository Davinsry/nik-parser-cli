import assert from "node:assert/strict";
import { parseNIK, isValidNIK } from "./nik.js";

// Laki-laki, 5 Maret 1992, DKI Jakarta
assert.deepEqual(parseNIK("3175030503920001"), {
  nik: "3175030503920001",
  kodeProvinsi: "31",
  provinsi: "DKI Jakarta",
  kodeKabupaten: "75",
  kodeKecamatan: "03",
  jenisKelamin: "L",
  tanggalLahir: "1992-03-05",
  urut: "0001",
});

// Perempuan: tanggal + 40
assert.equal(parseNIK("3175034503920001").jenisKelamin, "P");
assert.equal(parseNIK("3175034503920001").tanggalLahir, "1992-03-05");

// Tahun 2 digit: 05 <= abad ini -> 2005
assert.equal(parseNIK("3175030503050001").tanggalLahir, "2005-03-05");

// Kode provinsi Papua mengikuti Kemendagri, bukan BPS
assert.equal(parseNIK("9171030503920001").provinsi, "Papua");
assert.equal(parseNIK("9271030503920001").provinsi, "Papua Barat");
assert.equal(parseNIK("9371030503920001").provinsi, "Papua Selatan");
assert.equal(parseNIK("9471030503920001").provinsi, "Papua Tengah");
assert.equal(parseNIK("9571030503920001").provinsi, "Papua Pegunungan");
assert.equal(parseNIK("9671030503920001").provinsi, "Papua Barat Daya");
assert.equal(parseNIK("9771030503920001").provinsi, null);

// Kode provinsi tak dikenal -> null, bukan lempar error
assert.equal(parseNIK("9975030503920001").provinsi, null);

// Tanggal mustahil ditolak (30 Februari)
assert.throws(() => parseNIK("3175033002930001"), RangeError);
assert.throws(() => parseNIK("3175030513920001"), RangeError); // bulan 13
assert.throws(() => parseNIK("3175030003920001"), RangeError); // tanggal 00

// Bentuk salah
assert.throws(() => parseNIK("317503050392000"), TypeError); // 15 digit
assert.throws(() => parseNIK("31750305039200O1"), TypeError); // ada huruf
assert.throws(() => parseNIK(3175030503920001), TypeError); // bukan string

assert.equal(isValidNIK("3175030503920001"), true);
assert.equal(isValidNIK("halo"), false);

console.log("ok");
