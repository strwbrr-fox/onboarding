import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertWeight } from "../src/lib/weight.js";

test("converts pounds to grams", () => {
  strictEqual(convertWeight(1, "lbs", "g"), 453.592);
  strictEqual(convertWeight(2, "lbs", "g"), 907.184);
});

test("converts grams to pounds", () => {
  strictEqual(convertWeight(453.592, "g", "lbs"), 1);
});

test("converts pounds to ounces", () => {
  strictEqual(convertWeight(1, "lbs", "oz"), 16);
  strictEqual(convertWeight(2.5, "lbs", "oz"), 40);
});

test("converts ounces to pounds", () => {
  strictEqual(convertWeight(16, "oz", "lbs"), 1);
  strictEqual(convertWeight(32, "oz", "lbs"), 2);
});

test("converts grams to ounces", () => {
  strictEqual(convertWeight(28.3495, "g", "oz"), 1);
});

test("converts ounces to grams", () => {
  strictEqual(convertWeight(1, "oz", "g"), 28.3495);
});
