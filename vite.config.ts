import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import imagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 85, // Qualité JPEG (1-100)
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      webp: {
        quality: 85,
      },
    }),
  ],
  base: "/",
  define: {
    "import.meta.env.VITE_EMAILJS_SERVICE_ID": JSON.stringify(
      process.env.VITE_EMAILJS_SERVICE_ID
    ),
    "import.meta.env.VITE_EMAILJS_TEMPLATE_ID": JSON.stringify(
      process.env.VITE_EMAILJS_TEMPLATE_ID
    ),
    "import.meta.env.VITE_EMAILJS_PUBLIC_KEY": JSON.stringify(
      process.env.VITE_EMAILJS_PUBLIC_KEY
    ),
  },
});
