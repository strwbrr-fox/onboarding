import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

/**
 * @typedef {import("./lib/distance.js").DistanceUnit} DistanceUnit
 */

/**
 * @typedef {import("./lib/weight.js").WeightUnit} WeightUnit
 */

/**
 * @typedef {import("./lib/temperature.js").TemperatureUnit} TemperatureUnit
 */

/**
 * @typedef {("temperature"|"distance"|"weight")} ConversionType
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

/**
 * Applies precision rounding to a numeric value based on the configured precision.
 * @param {number} value - The numeric value to round.
 * @returns {number} The value rounded to the configured number of decimal places.
 */
function applyPrecision(value) {
  return Number(value.toFixed(defaults.precision));
}

/**
 * @overload
 * @param {"distance"} type - The type of conversion to perform.
 * @param {number|string} value - The numeric value to convert (will be converted to number).
 * @param {DistanceUnit} from - The source distance unit.
 * @param {DistanceUnit} to - The target distance unit.
 * @returns {number} The converted value rounded to the configured precision.
 */

/**
 * @overload
 * @param {"weight"} type - The type of conversion to perform.
 * @param {number|string} value - The numeric value to convert (will be converted to number).
 * @param {WeightUnit} from - The source weight unit.
 * @param {WeightUnit} to - The target weight unit.
 * @returns {number} The converted value rounded to the configured precision.
 */

/**
 * @overload
 * @param {"temperature"} type - The type of conversion to perform.
 * @param {number|string} value - The numeric value to convert (will be converted to number).
 * @param {TemperatureUnit} [from] - The source temperature unit. If not provided, defaults are used.
 * @param {TemperatureUnit} [to] - The target temperature unit. If not provided, defaults are used.
 * @returns {number} The converted value rounded to the configured precision.
 */

/**
 * Converts a value from one unit to another for the specified conversion type.
 * @param {ConversionType} type - The type of conversion to perform.
 * @param {number|string} value - The numeric value to convert (will be converted to number).
 * @param {string} [from] - The source unit. If not provided, defaults may be used for temperature.
 * @param {string} [to] - The target unit. If not provided, defaults may be used for temperature.
 * @returns {number} The converted value rounded to the configured precision.
 * @throws {Error} If the value is not a valid number, or if the conversion type/units are unsupported.
 */
export function convert(type, value, from, to) {
  // Validate numeric input
  const numericValue = Number(value);
  if (isNaN(numericValue) || !isFinite(numericValue)) {
    throw new Error("Invalid value: must be a valid number");
  }

  let result;
  switch (type) {
    case "temperature":
      result = temperature.convertTemperature(
        numericValue,
        /** @type {("C"|"F"|"K")} */ (from || defaults.temperature.defaultFrom),
        /** @type {("C"|"F"|"K")} */ (to || defaults.temperature.defaultTo)
      );
      break;
    case "distance":
      result = distance.convertDistance(
        numericValue,
        /** @type {("km"|"mi"|"m")} */ (from),
        /** @type {("km"|"mi"|"m")} */ (to)
      );
      break;
    case "weight":
      result = weight.convertWeight(
        numericValue,
        /** @type {("g"|"oz"|"lbs")} */ (from),
        /** @type {("g"|"oz"|"lbs")} */ (to)
      );
      break;
    default:
      throw new Error("Unknown type " + type);
  }

  return applyPrecision(result);
}
