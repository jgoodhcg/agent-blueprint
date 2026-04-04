import { expect, test } from "@playwright/test";

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

test("adds todos with due dates and filters overdue items", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Task title").fill("Overdue task");
  await page.getByLabel("Due date (optional)").fill("2020-01-01");
  await page.getByRole("button", { name: "Add todo" }).click();

  await page.getByLabel("Task title").fill("Future task");
  await page.getByLabel("Due date (optional)").fill("2030-01-01");
  await page.getByRole("button", { name: "Add todo" }).click();

  await expect(page.getByText("Overdue task")).toBeVisible();
  await expect(page.getByText("Future task")).toBeVisible();

  const overdueCard = page.locator(".todo-card", { hasText: "Overdue task" });
  await expect(overdueCard).toHaveClass(/todo-card--overdue/);

  const futureCard = page.locator(".todo-card", { hasText: "Future task" });
  await expect(futureCard).not.toHaveClass(/todo-card--overdue/);

  await page.getByRole("button", { name: "Overdue" }).click();

  await expect(page.getByText("Overdue task")).toBeVisible();
  await expect(page.getByText("Future task")).toHaveCount(0);
});

test("excludes completed items from overdue filter", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Task title").fill("Completed overdue task");
  await page.getByLabel("Due date (optional)").fill("2020-01-01");
  await page.getByRole("button", { name: "Add todo" }).click();

  await page.getByLabel("Mark Completed overdue task as done").click();

  await page.getByRole("button", { name: "Overdue" }).click();

  await expect(page.getByText("Completed overdue task")).toHaveCount(0);
});
