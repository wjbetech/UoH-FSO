import { test, describe } from "node:test";
import assert from "node:assert";
import tests from "./test.js";

const { blogDummy, totalLikes } = tests;

describe("Blog", () => {
  test("returns a value of 1", () => {
    const blogs = [];
    assert.strictEqual(blogDummy(blogs), 1);
  });
});

describe("Blog total likes when", () => {
  const oneBlog = [
    {
      title: "Blog post one",
      author: "John Doe",
      url: "https://www.example.com",
      likes: 8
    }
  ];

  const multiBlog = [
    {
      title: "Blog post one",
      author: "John Doe",
      url: "https://www.example.com",
      likes: 8
    },
    {
      title: "Blog post two",
      author: "Jane Doe",
      url: "https://www.example.net",
      likes: 5
    },
    {
      title: "Blog post three",
      author: "Bob Smith",
      url: "https://www.example.org",
      likes: 12
    }
  ];

  test("list has one blog", () => {
    assert.strictEqual(totalLikes(oneBlog), 8);
  });

  test("list has multiple blogs", () => {
    assert.strictEqual(totalLikes(multiBlog), 25);
  });
});
