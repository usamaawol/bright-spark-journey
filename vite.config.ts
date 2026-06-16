// Configuration for TanStack Start and Vite
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    // Force Nitro to use the Vercel preset when building
    // @ts-ignore - nitro is part of the tanstackStart config in this wrapper
    nitro: {
      preset: "vercel",
    },
  },
});
