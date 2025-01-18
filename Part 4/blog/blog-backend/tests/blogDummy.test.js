import { test, describe } from "node:test";
import assert from "node:assert";
import tests from "./test.js";
import dummyData from "./dummyData.json" assert { type: "json" };

const { blogDummy, totalLikes, favoriteBlog, mostBlogs } = tests;

describe("Blog", () => {
  test("returns a value of 1", () => {
    const blogs = [];
    assert.strictEqual(blogDummy(blogs), 1);
  });
});

describe("Blog total likes", () => {
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

  test("when blog list has one blog", () => {
    assert.strictEqual(totalLikes(oneBlog), 8);
  });

  test("when blog list has multiple blogs", () => {
    assert.strictEqual(totalLikes(multiBlog), 25);
  });
});

describe("Look for: ", () => {
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

  test("most popular blog", () => {
    assert.deepStrictEqual(favoriteBlog(multiBlog), {
      title: "Blog post three",
      author: "Bob Smith",
      likes: 12
    });
  });

  test("most prolific author", () => {
    assert.deepStrictEqual(mostBlogs(dummyData), {
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});
