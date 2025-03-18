import { render, screen } from "@testing-library/react";
import { describe, vi, test, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";

describe("Tests for <BlogForm> component", () => {
  const mockHandler = vi.fn();
  let container;

  beforeEach(() => {
    container = render(
      <BlogForm onChange={mockHandler} createBlog={mockHandler} />,
    ).container;
  });

  test("form calls event handler it receives as props with the right details", async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByLabelText("Title:");
    const contentInput = screen.getByLabelText("Content:");
    const urlInput = screen.getByLabelText("URL:");
    const submitButton = screen.getByRole("button", { name: "Add Blog" });

    await user.type(titleInput, "Dummy Blog Title");
    await user.type(contentInput, "Dummy Blog Content");
    await user.type(urlInput, "www.dummyblog.com");

    await user.click(submitButton);

    console.log(mockHandler.mock.calls[0][0]);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: "Dummy Blog Title",
      content: "Dummy Blog Content",
      url: "www.dummyblog.com",
      likes: 0,
    });
  });
});
