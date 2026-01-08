#!/usr/bin/env node
import { convert } from "../src/convert.js";

const [, , type, value, from, to] = process.argv;

if (!type || !value) {
  console.error("Usage: convert <type> <value> [from] [to]");
  process.exit(1);
}

// Type assertions needed because process.argv provides strings at runtime
// The convert function will validate the type and units at runtime
const result = convert(
  /** @type {any} */ (type),
  Number(value),
  /** @type {any} */ (from),
  /** @type {any} */ (to)
);
console.log(result);
