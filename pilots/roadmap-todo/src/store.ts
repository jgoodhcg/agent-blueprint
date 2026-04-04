import { computed, effect, signal } from "@preact/signals";

export type TodoPriority = "low" | "medium" | "high";
export type TodoFilter = "all" | "open" | "done" | "overdue";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  dueDate?: string;
}

export function isOverdue(todo: TodoItem): boolean {
  if (todo.completed || !todo.dueDate) {
    return false;
  }
  const due = new Date(todo.dueDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return due < now;
}

const STORAGE_KEY = "roadmap-todo:v1";

function loadTodos(): TodoItem[] {
  if (typeof localStorage === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as TodoItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createId() {
  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const todos = signal<TodoItem[]>(loadTodos());
export const draftTitle = signal("");
export const draftPriority = signal<TodoPriority>("medium");
export const draftDueDate = signal("");
export const activeFilter = signal<TodoFilter>("all");
export const editingId = signal<string | null>(null);
export const editingTitle = signal("");

export const visibleTodos = computed(() => {
  switch (activeFilter.value) {
    case "open":
      return todos.value.filter((todo) => !todo.completed);
    case "done":
      return todos.value.filter((todo) => todo.completed);
    case "overdue":
      return todos.value.filter((todo) => isOverdue(todo));
    default:
      return todos.value;
  }
});

export const counts = computed(() => {
  const total = todos.value.length;
  const completed = todos.value.filter((todo) => todo.completed).length;
  const open = total - completed;

  return { total, open, completed };
});

effect(() => {
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
});

export function resetStore() {
  todos.value = [];
  draftTitle.value = "";
  draftPriority.value = "medium";
  draftDueDate.value = "";
  activeFilter.value = "all";
  editingId.value = null;
  editingTitle.value = "";

  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function addTodo() {
  const title = draftTitle.value.trim();
  if (!title) {
    return false;
  }

  const dueDate = draftDueDate.value.trim() || undefined;

  todos.value = [
    {
      id: createId(),
      title,
      completed: false,
      priority: draftPriority.value,
      createdAt: new Date().toISOString(),
      dueDate
    },
    ...todos.value
  ];

  draftTitle.value = "";
  draftPriority.value = "medium";
  draftDueDate.value = "";
  return true;
}

export function toggleTodo(id: string) {
  todos.value = todos.value.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function removeTodo(id: string) {
  todos.value = todos.value.filter((todo) => todo.id !== id);

  if (editingId.value === id) {
    editingId.value = null;
    editingTitle.value = "";
  }
}

export function beginEdit(id: string) {
  const todo = todos.value.find((item) => item.id === id);
  if (!todo) {
    return;
  }

  editingId.value = id;
  editingTitle.value = todo.title;
}

export function cancelEdit() {
  editingId.value = null;
  editingTitle.value = "";
}

export function saveEdit(id: string) {
  const title = editingTitle.value.trim();
  if (!title) {
    return false;
  }

  todos.value = todos.value.map((todo) =>
    todo.id === id ? { ...todo, title } : todo
  );
  cancelEdit();
  return true;
}

export function clearCompleted() {
  todos.value = todos.value.filter((todo) => !todo.completed);

  if (editingId.value && !todos.value.some((todo) => todo.id === editingId.value)) {
    cancelEdit();
  }
}
