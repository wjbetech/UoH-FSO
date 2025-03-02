import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

test("renders content", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true
  };

  const mockHandler = vi.fn();

  // define component to render
  const { container } = render(
    <Note
      note={note}
      toggleImportance={mockHandler}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  screen.debug(container);

  expect(mockHandler.mock.calls).toHaveLength(1);
});



