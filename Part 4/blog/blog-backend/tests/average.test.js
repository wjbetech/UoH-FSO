import { test, describe } from "node:test";
import assert from "node:assert";
import tests from "./test.js";

const { arrAverage } = tests;

describe("average", () => {
  test("of an empty array", () => {
    assert.strictEqual(arrAverage([]), 0);
  });

  test("of a single value x is x", () => {
    assert.strictEqual(arrAverage([1]), 1);
  });

  test("of a whole number array", () => {
    assert.strictEqual(arrAverage([1, 2, 3, 4, 5, 6]), 3.5);
  });

  test("of a negative whole number array", () => {
    assert.strictEqual(arrAverage([-1, -2, -3, -4, -5]), -3);
  });
});
