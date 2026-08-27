#!/usr/bin/env node
import { parseNIK } from "./nik.js";

const nik = process.argv[2];

if (!nik) {
  console.error("Pakai: nik-parser <NIK 16 digit>");
  process.exit(2);
}

try {
  console.log(JSON.stringify(parseNIK(nik), null, 2));
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
