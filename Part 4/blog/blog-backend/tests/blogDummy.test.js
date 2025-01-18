import { test, describe } from "node:test";
import assert from "node:assert";
import tests from "./test.js";

const { blogDummy } = tests;

describe("Blog", () => {
  test("returns a value of 1", () => {
    const blogs = [];
    assert.strictEqual(blogDummy(blogs), 1);
  });
});
