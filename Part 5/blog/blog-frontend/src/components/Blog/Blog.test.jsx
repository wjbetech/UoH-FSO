import { render, screen } from "@testing-library/react";
import { describe, vi, test, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Tests for <Blog> component", () => {
  const mockHandler = vi.fn();
  let container;

  beforeEach(() => {
    const dummyBlog = {
      title: "Test Blog",
      author: "testuser",
      content: "Test Content",
      likes: 10,
      user: { username: "testuser" }
    };

    container = render(
      <Blog
        blogInfo={dummyBlog}
        handleDelete={mockHandler}
        handleLikesClick={mockHandler}
      />
    ).container;
  });

  test("blog renders with title but nothing else by default", async () => {
    const titleText = container.querySelector(".blog-title");
    const authorText = container.querySelector(".blog-author");
    const contentText = container.querySelector(".blog-content");

    screen.debug(container);
    console.log("mock calls: ", mockHandler.mock.calls);

    expect(titleText).toHaveTextContent("Test Blog");
    expect(authorText).toBeNull();
    expect(contentText).toBeNull();

    // possible alternative solutions using queries:
    //   Title is visible
    //   expect(screen.getByText("Test Blog")).toBeInTheDocument();
    //
    //   Author/content are NOT rendered
    //   expect(screen.queryByText("testuser")).not.toBeInTheDocument();
    //   expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  test("content and likes are shown when the view button is clicked", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByRole("button", { name: "View" });

    await user.click(viewButton);

    screen.debug(container);
    console.log("mock calls: ", mockHandler.mock.calls);

    const content = screen.getByText("Test Content");
    const likes = screen.getByText("Likes: 10");

    expect(content).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
  });

  test("event handler is called equal times to clicks", async () => {
    const user = userEvent.setup();

    // click viewButton - this does NOT trigger mockHandler!
    // but we need to open the blog to see the like button
    const viewButton = screen.getByRole("button", { name: "View" });
    await user.click(viewButton);

    // click likeButton - this triggers mockHandler!
    // await clicking it twice
    const likeButton = screen.getByRole("button", { name: "Like" });
    await user.click(likeButton);
    await user.click(likeButton);

    screen.debug(container);
    console.log("mock calls: ", mockHandler.mock.calls);

    // length is 2 - zero on view, two on like
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
