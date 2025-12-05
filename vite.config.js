import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Travel-Destination-Explorer/", // <-- for GitHub Pages
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/about.html"),
        checkout: resolve(__dirname, "src/results.html"),
        product: resolve(__dirname, "src/favorites.html"),
        productListing: resolve(__dirname, "src/destination.html"),
      },
    },
  },
});
