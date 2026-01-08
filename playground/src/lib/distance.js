/**
 * @typedef {("km"|"mi"|"m")} DistanceUnit
 */

/**
 * Converts a distance value from one unit to another.
 * @param {number} value - The distance value to convert.
 * @param {DistanceUnit} from - The source distance unit (kilometers, miles, or meters).
 * @param {DistanceUnit} to - The target distance unit (kilometers, miles, or meters).
 * @returns {number} The converted distance value. Returns the input value unchanged if 'from' and 'to' are the same.
 * @throws {Error} If 'from' or 'to' are not valid distance units, or if the conversion from the specified units is not supported.
 */
export function convertDistance(value, from, to) {
  const validUnits = ["km", "mi", "m"];
  if (!validUnits.includes(from)) {
    throw new Error(`Invalid source unit: ${from}. Must be one of: ${validUnits.join(", ")}`);
  }
  if (!validUnits.includes(to)) {
    throw new Error(`Invalid target unit: ${to}. Must be one of: ${validUnits.join(", ")}`);
  }
  if (from === to) return value;
  if (from === "km" && to === "mi") return value * 0.621371;
  if (from === "mi" && to === "km") return value / 0.621371;
  if (from === "m" && to === "km") return value / 1000;
  if (from === "km" && to === "m") return value * 1000;
  if (from === "m" && to === "mi") return value * 0.000621371;
  if (from === "mi" && to === "m") return value / 0.000621371;
}
