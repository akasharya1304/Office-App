import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { installGlobals } from "@remix-run/node";
import { flatRoutes } from "remix-flat-routes";
import path from "path";

installGlobals();

export default defineConfig({
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "app") }],
  },
  plugins: [remix({
    routes: async (defineRoutes) => {
      return flatRoutes("routes", defineRoutes);
    },
  }), netlifyPlugin(), tsconfigPaths()],
});
