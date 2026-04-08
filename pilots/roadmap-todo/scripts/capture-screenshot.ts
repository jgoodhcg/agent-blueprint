import { chromium } from "playwright";
import { createServer } from "http";
import { join } from "path";
import { readFile, mkdir } from "fs/promises";
import { networkInterfaces } from "os";

const DIST = join(import.meta.dir, "..", "dist");
const OUT = join(import.meta.dir, "..", "screenshots");

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function serve(port: number): Promise<() => Promise<void>> {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let urlPath = req.url?.split("?")[0] || "/";
      if (urlPath === "/") urlPath = "/index.html";
      const filePath = join(DIST, urlPath);
      try {
        const data = await readFile(filePath);
        const ext = urlPath.slice(urlPath.lastIndexOf("."));
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(port, "127.0.0.1", () => {
      const close = () => new Promise<void>((r) => server.close(() => r()));
      resolve(close);
    });
  });
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const port = 8743;
  const close = await serve(port);

  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  await page.screenshot({
    path: join(OUT, "main-screen-empty.png"),
    fullPage: true,
  });

  await page.getByLabel("Task title").fill("Ship the pilot app");
  await page.getByLabel("Priority").selectOption("high");
  await page.getByRole("button", { name: "Add todo" }).click();

  await page.getByLabel("Task title").fill("Add Playwright e2e tests");
  await page.getByLabel("Priority").selectOption("medium");
  await page.getByRole("button", { name: "Add todo" }).click();

  await page.waitForTimeout(200);
  await page.screenshot({
    path: join(OUT, "main-screen-with-todos.png"),
    fullPage: true,
  });

  await browser.close();
  await close();

  console.log("Screenshots saved to:", OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
