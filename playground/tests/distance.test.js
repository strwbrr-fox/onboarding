import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(5000, "m", "km"), 5);
});

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(2.5, "km", "m"), 2500);
});

test("converts meters to miles", () => {
  const result = convertDistance(1000, "m", "mi");
  strictEqual(Math.round(result * 1000) / 1000, 0.621);
});

test("converts miles to meters", () => {
  const result = convertDistance(1, "mi", "m");
  strictEqual(Math.round(result * 1000) / 1000, 1609.344);
});

test("converts kilometers to miles", () => {
  strictEqual(convertDistance(10, "km", "mi"), 6.21371);
});

test("converts miles to kilometers", () => {
  const result = convertDistance(10, "mi", "km");
  strictEqual(Math.round(result * 100000) / 100000, 16.09344);
});
