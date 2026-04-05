import { expect, test } from "@playwright/test";

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

test("manages the todo workflow", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Task title").fill("Create pilot app");
  await page.getByLabel("Priority").selectOption("high");
  await page.getByRole("button", { name: "Add todo" }).click();

  await page.getByLabel("Task title").fill("Cover with Playwright");
  await page.getByRole("button", { name: "Add todo" }).click();

  await expect(page.getByText("Create pilot app")).toBeVisible();
  await expect(page.getByText("Cover with Playwright")).toBeVisible();

  await page.getByLabel("Mark Create pilot app as done").click();
  await page.getByRole("button", { name: "Done" }).click();

  await expect(page.getByText("Create pilot app")).toBeVisible();
  await expect(page.getByText("Cover with Playwright")).toHaveCount(0);

  await page.getByRole("button", { name: "All" }).click();
  await page
    .locator(".todo-card", { hasText: "Create pilot app" })
    .getByRole("button", { name: "Edit" })
    .click();
  await page.getByLabel("Edit Create pilot app").fill("Launch pilot app");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Launch pilot app")).toBeVisible();
  await page.getByRole("button", { name: "Clear completed" }).click();
  await expect(page.getByText("Launch pilot app")).toHaveCount(0);
});

test("adds a todo with a due date and displays it correctly", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Task title").fill("Task with due date");
  await page.getByLabel("Due date").fill("2026-04-10");
  await page.getByRole("button", { name: "Add todo" }).click();

  await expect(page.getByText("Task with due date")).toBeVisible();
  await expect(page.getByText(/Due:/)).toBeVisible();
});

test("filters overdue items and excludes completed items", async ({ page }) => {
  await page.goto("/");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatLocalDate(yesterday);

  await page.getByLabel("Task title").fill("Overdue task");
  await page.getByLabel("Due date").fill(yesterdayStr);
  await page.getByRole("button", { name: "Add todo" }).click();

  await page.getByLabel("Task title").fill("Future task");
  await page.getByLabel("Due date").fill("2030-01-01");
  await page.getByRole("button", { name: "Add todo" }).click();

  await page.getByRole("button", { name: "Overdue" }).click();

  await expect(page.getByText("Overdue task")).toBeVisible();
  await expect(page.getByText("Future task")).toHaveCount(0);

  await page.getByRole("button", { name: "All" }).click();
  await page.getByLabel("Mark Overdue task as done").click();

  await page.getByRole("button", { name: "Overdue" }).click();
  await expect(page.getByText("Overdue task")).toHaveCount(0);
});

test("due date displays as the same calendar day regardless of timezone", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Task title").fill("Timezone test task");
  await page.getByLabel("Due date").fill("2026-04-10");
  await page.getByRole("button", { name: "Add todo" }).click();

  const dueDateElement = page.getByText(/Due:/);
  await expect(dueDateElement).toBeVisible();

  const dueDateText = await dueDateElement.textContent();
  expect(dueDateText).toMatch(/4\/10\/2026|April 10, 2026|10\/4\/2026|10 April 2026/);
});
