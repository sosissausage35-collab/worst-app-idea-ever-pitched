import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Snoopalot is the app that sends you a push notification every time your houseplants stop thinking about you, so you never miss a single moment of their indifference.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 240 characters.
const MAX_CHARS = 240;
const OUT = "/output/entry.txt";

// Validate before writing: non-empty, not only whitespace, 1-240 chars, single line.
if (LINE.length === 0 || LINE.trim().length === 0) {
  throw new Error("entry must not be empty or only whitespace");
}
if (LINE.length > MAX_CHARS) {
  throw new Error(`entry is ${LINE.length} characters, over the ${MAX_CHARS} limit`);
}
if (LINE.includes("\r") || LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Read back and require byte-identical output.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}

console.log(`Wrote ${LINE.length} characters to ${OUT}`);
