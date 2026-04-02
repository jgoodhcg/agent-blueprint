import {
  activeFilter,
  addTodo,
  beginEdit,
  cancelEdit,
  clearCompleted,
  counts,
  draftPriority,
  draftTitle,
  editingId,
  editingTitle,
  removeTodo,
  saveEdit,
  toggleTodo,
  visibleTodos,
  type TodoFilter,
  type TodoItem,
  type TodoPriority
} from "./store";

const FILTER_LABELS: Record<TodoFilter, string> = {
  all: "All",
  open: "Open",
  done: "Done"
};

function submitNewTodo(event: SubmitEvent) {
  event.preventDefault();
  addTodo();
}

function saveTodoEdit(event: SubmitEvent, id: string) {
  event.preventDefault();
  saveEdit(id);
}

function renderPriority(priority: TodoPriority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function TodoRow({ todo }: { todo: TodoItem }) {
  const isEditing = editingId.value === todo.id;

  return (
    <li class={`todo-card ${todo.completed ? "todo-card--done" : ""}`}>
      <div class="todo-card__main">
        <label class="todo-card__toggle">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            aria-label={`Mark ${todo.title} as ${todo.completed ? "open" : "done"}`}
          />
          <span>{todo.completed ? "Done" : "Open"}</span>
        </label>

        {isEditing ? (
          <form class="todo-card__edit" onSubmit={(event) => saveTodoEdit(event, todo.id)}>
            <input
              value={editingTitle.value}
              onInput={(event) => {
                editingTitle.value = (event.currentTarget as HTMLInputElement).value;
              }}
              aria-label={`Edit ${todo.title}`}
              autoFocus
            />
            <div class="todo-card__actions">
              <button type="submit">Save</button>
              <button type="button" class="button-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div class="todo-card__content">
            <p class="todo-card__title">{todo.title}</p>
            <p class="todo-card__meta">
              <span class={`priority-badge priority-badge--${todo.priority}`}>
                {renderPriority(todo.priority)}
              </span>
              <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div class="todo-card__actions">
          <button type="button" class="button-secondary" onClick={() => beginEdit(todo.id)}>
            Edit
          </button>
          <button type="button" class="button-danger" onClick={() => removeTodo(todo.id)}>
            Delete
          </button>
        </div>
      ) : null}
    </li>
  );
}

export function App() {
  return (
    <main class="shell">
      <section class="panel panel--hero">
        <div>
          <p class="eyebrow">Pilot app</p>
          <h1>Roadmap Todo</h1>
          <p class="lede">
            A small real app for exercising GitHub automation with real features, real tests, and
            real UI state.
          </p>
        </div>

        <div class="stats-grid" aria-label="Todo summary">
          <div class="stat-card">
            <span class="stat-card__label">Total</span>
            <strong>{counts.value.total}</strong>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Open</span>
            <strong>{counts.value.open}</strong>
          </div>
          <div class="stat-card">
            <span class="stat-card__label">Done</span>
            <strong>{counts.value.completed}</strong>
          </div>
        </div>
      </section>

      <section class="panel">
        <form class="composer" onSubmit={submitNewTodo}>
          <label class="field">
            <span>Task title</span>
            <input
              placeholder="Ship the pilot app"
              value={draftTitle.value}
              onInput={(event) => {
                draftTitle.value = (event.currentTarget as HTMLInputElement).value;
              }}
            />
          </label>

          <label class="field">
            <span>Priority</span>
            <select
              value={draftPriority.value}
              onChange={(event) => {
                draftPriority.value = (event.currentTarget as HTMLSelectElement)
                  .value as TodoPriority;
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <button type="submit">Add todo</button>
        </form>
      </section>

      <section class="panel">
        <div class="toolbar">
          <div class="filter-group" role="tablist" aria-label="Todo filters">
            {(Object.keys(FILTER_LABELS) as TodoFilter[]).map((filterName) => (
              <button
                key={filterName}
                type="button"
                class={activeFilter.value === filterName ? "is-active" : "button-secondary"}
                onClick={() => {
                  activeFilter.value = filterName;
                }}
              >
                {FILTER_LABELS[filterName]}
              </button>
            ))}
          </div>

          <button
            type="button"
            class="button-secondary"
            onClick={clearCompleted}
            disabled={counts.value.completed === 0}
          >
            Clear completed
          </button>
        </div>

        {visibleTodos.value.length === 0 ? (
          <div class="empty-state">
            <h2>No todos in this view</h2>
            <p>Add a task or switch filters to see your queued work.</p>
          </div>
        ) : (
          <ul class="todo-list">
            {visibleTodos.value.map((todo) => (
              <TodoRow key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
