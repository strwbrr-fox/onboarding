/**
 * @typedef {("g"|"oz"|"lbs")} WeightUnit
 */

/**
 * Converts a weight value from one unit to another.
 * @param {number} value - The weight value to convert.
 * @param {WeightUnit} from - The source weight unit (grams, ounces, or pounds).
 * @param {WeightUnit} to - The target weight unit (grams, ounces, or pounds).
 * @returns {number} The converted weight value. Returns the input value unchanged if 'from' and 'to' are the same.
 * @throws {Error} If 'from' or 'to' are not valid weight units, or if the conversion from the specified units is not supported.
 */
export function convertWeight(value, from, to) {
  const validUnits = ["g", "oz", "lbs"];
  if (!validUnits.includes(from)) {
    throw new Error(`Invalid source unit: ${from}. Must be one of: ${validUnits.join(", ")}`);
  }
  if (!validUnits.includes(to)) {
    throw new Error(`Invalid target unit: ${to}. Must be one of: ${validUnits.join(", ")}`);
  }
  if (from === to) return value;
  if (from === "g" && to === "oz") return value / 28.3495;
  if (from === "oz" && to === "g") return value * 28.3495;
  if (from === "lbs" && to === "g") return value * 453.592;
  if (from === "g" && to === "lbs") return value / 453.592;
  if (from === "lbs" && to === "oz") return value * 16;
  if (from === "oz" && to === "lbs") return value / 16;
}
