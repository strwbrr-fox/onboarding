/**
 * @typedef {("C"|"F"|"K")} TemperatureUnit
 */

/**
 * Converts a temperature value from one unit to another.
 * @param {number} value - The temperature value to convert.
 * @param {TemperatureUnit} from - The source temperature unit (Celsius, Fahrenheit, or Kelvin).
 * @param {TemperatureUnit} to - The target temperature unit (Celsius, Fahrenheit, or Kelvin).
 * @returns {number} The converted temperature value. Returns the input value unchanged if 'from' and 'to' are the same.
 * @throws {Error} If 'from' or 'to' are not valid temperature units, or if the conversion from the specified units is not supported.
 */
export function convertTemperature(value, from, to) {
  const validUnits = ["C", "F", "K"];
  if (!validUnits.includes(from)) {
    throw new Error(`Invalid source unit: ${from}. Must be one of: ${validUnits.join(", ")}`);
  }
  if (!validUnits.includes(to)) {
    throw new Error(`Invalid target unit: ${to}. Must be one of: ${validUnits.join(", ")}`);
  }
  if (from === to) return value;
  if (from === "C" && to === "F") return value * (9 / 5) + 32;
  if (from === "F" && to === "C") return (value - 32) * (5 / 9);
  if (from === "K" && to === "C") return value - 273.15;
  if (from === "C" && to === "K") return value + 273.15;
  if (from === "K" && to === "F") return (value - 273.15) * (9 / 5) + 32;
  if (from === "F" && to === "K") return (value - 32) * (5 / 9) + 273.15;
}
