import { render, screen } from "@testing-library/react";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm> component updates parent state and calls onSubmit()", async () => {
  const createNote = vi.fn();
  const user = userEvent.setup();

  render(<NoteForm createNote={createNote} />);

  const input = screen.getByPlaceholderText("new note...");
  const sendButton = screen.getByText("Save");

  await user.type(input, "testing noteForm component");
  await user.click(sendButton);

  console.log(createNote.mock.calls);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing noteForm component");
});
