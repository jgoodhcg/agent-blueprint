import { fireEvent, render, screen } from "@testing-library/preact";
import { App } from "../src/app";
import {
  formatLocalDate,
  isOverdue,
  parseLocalDate,
  resetStore
} from "../src/store";

describe("Local date handling", () => {
  it("parses date-only strings as local calendar dates", () => {
    const dateStr = "2026-04-10";
    const date = parseLocalDate(dateStr);
    
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(3);
    expect(date.getDate()).toBe(10);
  });

  it("formats dates as local date strings", () => {
    const date = new Date(2026, 3, 10);
    const formatted = formatLocalDate(date);
    
    expect(formatted).toBe("2026-04-10");
  });

  it("detects overdue based on local calendar date comparison", () => {
    const today = new Date();
    const todayStr = formatLocalDate(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatLocalDate(yesterday);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = formatLocalDate(tomorrow);

    expect(isOverdue(yesterdayStr, false)).toBe(true);
    expect(isOverdue(todayStr, false)).toBe(false);
    expect(isOverdue(tomorrowStr, false)).toBe(false);
  });

  it("does not mark completed items as overdue", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatLocalDate(yesterday);

    expect(isOverdue(yesterdayStr, true)).toBe(false);
  });

  it("returns false for undefined due date", () => {
    expect(isOverdue(undefined, false)).toBe(false);
  });
});

describe("Roadmap Todo app", () => {
  beforeEach(() => {
    resetStore();
  });

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

  it("adds a todo with a due date", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    const dueDateInput = screen.getByLabelText("Due date");

    fireEvent.input(titleInput, { target: { value: "Task with due date" } });
    fireEvent.input(dueDateInput, { target: { value: "2026-04-10" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    expect(screen.getByText("Task with due date")).toBeTruthy();
    expect(screen.getByText(/Due:/)).toBeTruthy();
  });

  it("filters overdue items", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Task title");
    const dueDateInput = screen.getByLabelText("Due date");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatLocalDate(yesterday);

    fireEvent.input(titleInput, { target: { value: "Overdue task" } });
    fireEvent.input(dueDateInput, { target: { value: yesterdayStr } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.input(titleInput, { target: { value: "Future task" } });
    fireEvent.input(dueDateInput, { target: { value: "2030-01-01" } });
    fireEvent.click(screen.getByRole("button", { name: "Add todo" }));

    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));

    expect(screen.getByText("Overdue task")).toBeTruthy();
    expect(screen.queryByText("Future task")).toBeNull();
  });
});
