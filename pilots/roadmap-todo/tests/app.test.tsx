import { fireEvent, render, screen } from "@testing-library/preact";
import { App } from "../src/app";

describe("Roadmap Todo app", () => {
  it("adds todos, filters them, and clears completed items", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    const prioritySelect = screen.getByLabelText("Priority");

    fireEvent.input(titleInput, { target: { value: "Write workflow docs" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.input(titleInput, { target: { value: "Ship pilot app" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    expect(screen.getByText("Write workflow docs")).toBeTruthy();
    expect(screen.getByText("Ship pilot app")).toBeTruthy();
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByLabelText("Mark Ship pilot app as done"));
    fireEvent.click(screen.getByRole("button", { name: "Done" }));

    expect(screen.getByText("Ship pilot app")).toBeTruthy();
    expect(screen.queryByText("Write workflow docs")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Clear completed" }));
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(screen.queryByText("Ship pilot app")).toBeNull();
    expect(screen.getByText("Write workflow docs")).toBeTruthy();
  });

  it("edits an existing todo", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    fireEvent.input(titleInput, { target: { value: "Initial title" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    const editInput = screen.getByLabelText("Edit Initial title");
    fireEvent.input(editInput, { target: { value: "Updated title" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByText("Updated title")).toBeTruthy();
    expect(screen.queryByText("Initial title")).toBeNull();
  });
});
