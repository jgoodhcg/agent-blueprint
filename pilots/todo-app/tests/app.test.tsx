import { fireEvent, render, screen, within } from "@testing-library/preact";
import { App } from "../src/app";

function getMainList() {
  return within(screen.getByRole("region", { name: "Todo list" }));
}

function getTodayFocus() {
  return within(screen.getByRole("region", { name: "Today focus" }));
}

describe("Todo App", () => {
  it("adds todos, filters them, and clears completed items", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    const prioritySelect = screen.getByLabelText("Priority");

    fireEvent.input(titleInput, { target: { value: "Write workflow docs" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.input(titleInput, { target: { value: "Ship pilot app" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    expect(screen.getAllByText("Write workflow docs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ship pilot app").length).toBeGreaterThan(0);
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByLabelText("Mark Ship pilot app as done")[0]);
    fireEvent.click(screen.getByRole("button", { name: "Done" }));

    expect(screen.getAllByText("Ship pilot app").length).toBeGreaterThan(0);
    expect(getTodayFocus().getAllByText("Write workflow docs").length).toBeGreaterThan(0);
    expect(getMainList().queryByText("Write workflow docs")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Clear completed" }));
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(screen.queryByText("Ship pilot app")).toBeNull();
    expect(screen.getAllByText("Write workflow docs").length).toBeGreaterThanOrEqual(1);
  });

  it("edits an existing todo", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    fireEvent.input(titleInput, { target: { value: "Initial title" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);

    const editInput = screen.getByLabelText("Edit Initial title");
    fireEvent.input(editInput, { target: { value: "Updated title" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getAllByText("Updated title").length).toBeGreaterThan(0);
    expect(screen.queryByText("Initial title")).toBeNull();
  });
});
