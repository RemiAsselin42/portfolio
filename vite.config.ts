import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
