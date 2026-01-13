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
        quality: 85,
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

  // Build optimization for production
  build: {
    // Code splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React dependencies
          "react-vendor": ["react", "react-dom"],
          // Separate chunk for react-zoom-pan-pinch (heavy library)
          "zoom-vendor": ["react-zoom-pan-pinch"],
          // Email service separate chunk (only used on contact page)
          "email-vendor": ["@emailjs/browser"],
        },
      },
    },
    // Minification settings
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 600,
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps only for errors (smaller build)
    sourcemap: false,
  },

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
