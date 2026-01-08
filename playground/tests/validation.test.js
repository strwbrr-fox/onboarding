import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

test("rejects Infinity value", () => {
  throws(
    () => convert("temperature", Infinity, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for Infinity"
  );
});

test("rejects negative Infinity value", () => {
  throws(
    () => convert("temperature", -Infinity, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for -Infinity"
  );
});

test("rejects unknown temperature unit code", () => {
  throws(
    () => convert("temperature", 100, "C", "R"),
    /unsupported.*conversion/i,
    "Should throw error for unsupported temperature units"
  );
});

test("rejects unknown distance unit code", () => {
  throws(
    () => convert("distance", 100, "km", "xyz"),
    /unsupported.*conversion/i,
    "Should throw error for unsupported distance units"
  );
});

test("rejects unknown weight unit code", () => {
  throws(
    () => convert("weight", 100, "g", "kg"),
    /unsupported.*conversion/i,
    "Should throw error for unsupported weight units"
  );
});
