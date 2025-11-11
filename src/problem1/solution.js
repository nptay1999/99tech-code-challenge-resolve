/**
 * Calculates the sum of all integers from 1 to n using a loop.
 * @param {number} n - The upper bound integer to sum up to (inclusive)
 * @returns {number} The total sum of numbers from 1 to n
 */
const sum_to_n_a = function (n) {
  if (typeof n !== "number" || n <= 0) {
    return 0;
  }

  let result = 0;

  while (n > 0) {
    result += n;
    n--;
  }

  return result;
};

/**
 * Calculates the sum of all integers from 1 to n using mathematical formula.
 * @param {number} n - The upper bound integer to sum up to (inclusive)
 * @returns {number} The total sum of numbers from 1 to n
 */
const sum_to_n_b = function (n) {
  if (typeof n !== "number" || n <= 0) {
    return 0;
  }

  return (n * (n + 1)) / 2;
};

/**
 * Calculates the sum of all integers from 1 to n using reduce function.
 * @param {number} n - The upper bound integer to sum up to (inclusive)
 * @returns {number} The total sum of numbers from 1 to n
 */
const sum_to_n_c = function (n) {
  if (typeof n !== "number" || n <= 0) {
    return 0;
  }

  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (prev, curr) => prev + curr,
    0
  );
};

module.exports = {
  sum_to_n_a,
  sum_to_n_b,
  sum_to_n_c,
};
