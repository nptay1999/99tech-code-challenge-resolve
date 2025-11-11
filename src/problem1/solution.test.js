const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("./solution");

const testCases = [
  { n: 0, expected: 0 },
  { n: 1, expected: 1 },
  { n: 5, expected: 15 },
  { n: 10, expected: 55 },
  { n: 100, expected: 5050 },
  { n: 1_000_000, expected: 500_000_500_000 },
];

describe("sum_to_n_a function - sum numbers with a loop", () => {
  testCases.forEach(({ n, expected }) => {
    test(`expect function returns ${expected} when n = ${n}`, () => {
      expect(sum_to_n_a(n)).toBe(expected);
    });
  });
});

describe("sum_to_n_b function - sum numbers with mathematical formula", () => {
  testCases.forEach(({ n, expected }) => {
    test(`expect function returns ${expected} when n = ${n}`, () => {
      expect(sum_to_n_b(n)).toBe(expected);
    });
  });
});

describe("sum_to_n_c functions - sum numbers with reduce function", () => {
  testCases.forEach(({ n, expected }) => {
    test(`expect returns ${expected} when n = ${n}`, () => {
      expect(sum_to_n_c(n)).toBe(expected);
    });
  });
});
