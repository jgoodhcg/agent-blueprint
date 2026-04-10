import { fireEvent, render, screen, within } from "@testing-library/preact";
import { App } from "../src/app";

function getTodoListSection() {
  return within(document.querySelector(".todo-list") as HTMLElement);
}

function getTodayFocusSection() {
  return within(document.querySelector(".panel--today") as HTMLElement);
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

    expect(screen.getAllByText("Write workflow docs").length).toBe(2);
    expect(screen.getAllByText("Ship pilot app").length).toBe(2);
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByLabelText("Mark Ship pilot app as done"));
    fireEvent.click(screen.getByRole("button", { name: "Done" }));

    expect(getTodoListSection().getByText("Ship pilot app")).toBeTruthy();
    expect(getTodoListSection().queryByText("Write workflow docs")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Clear completed" }));
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(screen.queryAllByText("Ship pilot app").length).toBe(0);
    expect(screen.getAllByText("Write workflow docs").length).toBe(2);
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

    expect(screen.getAllByText("Updated title").length).toBeGreaterThanOrEqual(1);
    expect(screen.queryAllByText("Initial title").length).toBe(0);
  });

  it("shows today focus section with newly added open tasks", () => {
    render(<App />);

    const todayFocus = getTodayFocusSection();
    expect(todayFocus.getByText("Today Focus")).toBeTruthy();
    expect(todayFocus.getByText(/No tasks for today yet/)).toBeTruthy();

    const titleInput = screen.getByLabelText("Task title");
    fireEvent.input(titleInput, { target: { value: "Today task" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    expect(todayFocus.queryByText(/No tasks for today yet/)).toBeNull();
    expect(todayFocus.getByText("Today task")).toBeTruthy();
  });

  it("removes tasks from today focus when marked done", () => {
    render(<App />);

    const todayFocus = getTodayFocusSection();
    const titleInput = screen.getByLabelText("Task title");
    fireEvent.input(titleInput, { target: { value: "Finish today" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    expect(todayFocus.getByText("Finish today")).toBeTruthy();

    fireEvent.click(screen.getByLabelText("Mark Finish today as done"));

    expect(todayFocus.queryByText("Finish today")).toBeNull();
    expect(todayFocus.getByText(/No tasks for today yet/)).toBeTruthy();
  });
});
