// import type { Config } from "jest";

// const config: Config = {
//   verbose: true,
// //   testMatch: ["__tests__/**/*.test.ts"],
//   setupFiles: ["./__tests__/jest.setup.ts"],
//   testPathIgnorePatterns: [
//     "/node_modules/",
//     "/__tests__/index",
//     "/__tests__/e2e.test.ts",
//     "/__tests__/mock-data/mockUsers.ts",
//   ],
// };

// export default config;

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // setupFiles: ["./vitest.setup.ts"],
  },
});
