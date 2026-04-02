import { afterEach } from "vitest";
import { cleanup } from "@testing-library/preact";
import { resetStore } from "../src/store";

afterEach(() => {
  cleanup();
  resetStore();
});
