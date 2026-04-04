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

  it("adds todos with optional due dates", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    const dueDateInput = screen.getByLabelText("Due date (optional)");

    fireEvent.input(titleInput, { target: { value: "Task with deadline" } });
    fireEvent.input(dueDateInput, { target: { value: "2026-04-10" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    expect(screen.getByText("Task with deadline")).toBeTruthy();
    expect(screen.getByText(/Due:/)).toBeTruthy();
  });

  it("shows overdue filter and marks overdue items", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    const dueDateInput = screen.getByLabelText("Due date (optional)");

    fireEvent.input(titleInput, { target: { value: "Overdue task" } });
    fireEvent.input(dueDateInput, { target: { value: "2020-01-01" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.input(titleInput, { target: { value: "Future task" } });
    fireEvent.input(dueDateInput, { target: { value: "2030-01-01" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    const overdueCard = screen.getByText("Overdue task").closest(".todo-card");
    expect(overdueCard?.classList.contains("todo-card--overdue")).toBe(true);

    const futureCard = screen.getByText("Future task").closest(".todo-card");
    expect(futureCard?.classList.contains("todo-card--overdue")).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));

    expect(screen.getByText("Overdue task")).toBeTruthy();
    expect(screen.queryByText("Future task")).toBeNull();
  });

  it("excludes completed items from overdue view", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    const dueDateInput = screen.getByLabelText("Due date (optional)");

    fireEvent.input(titleInput, { target: { value: "Completed overdue task" } });
    fireEvent.input(dueDateInput, { target: { value: "2020-01-01" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.click(screen.getByLabelText("Mark Completed overdue task as done"));

    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));

    expect(screen.queryByText("Completed overdue task")).toBeNull();
  });
});
