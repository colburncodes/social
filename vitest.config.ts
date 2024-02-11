import { loadEnvConfig } from "@next/env"
import { defineConfig } from "vitest/config"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom"
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
})
