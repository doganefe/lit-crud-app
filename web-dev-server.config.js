/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { legacyPlugin } from "@web/dev-server-legacy";

const mode = process.env.MODE || "dev";
if (!["dev", "prod"].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: { exportConditions: mode === "dev" ? ["development"] : [] },
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
  port: 3000, // Choose a port, or leave it as default
  appIndex: "index.html",
  open: true,
  watch: true,
  // Handle client-side routing
  historyApiFallback: true,
};
