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
