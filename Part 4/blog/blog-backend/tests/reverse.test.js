import test from "node:test";
import assert from "node:assert";
import tests from "./test.js";

const { reverseString } = tests;

test("reverse of a", () => {
  const result = reverseString("a");
  assert.strictEqual(result, "a");
});

test("reverse of the word 'react'", () => {
  const result = reverseString("react");
  assert.strictEqual(result, "tcaer");
});

test("reverse of the sentence 'hello world'", () => {
  const result = reverseString("hello world");
  assert.strictEqual(result, "dlrow olleh");
});

// test("breaking the test, reversing 'react' badly", () => {
//   const result = reverseString("react");
//   assert.strictEqual(result, "tacer");
//
// // Incorrect, should be "tcaer"
//
// });
