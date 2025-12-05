import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",

  build: {
    outDir: "../dist",

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about.html"),
        results: resolve(__dirname, "src/results.html"),
        favorites: resolve(__dirname, "src/favorites.html"),
        destination: resolve(__dirname, "src/destination.html"),
      },
    },
  },
});
