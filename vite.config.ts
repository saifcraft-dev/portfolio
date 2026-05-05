import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"];
const RETRIABLE = new Set([429, 401, 403, 500, 502, 503, 504]);

function getServerKeys(): string[] {
  return [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_B,
    process.env.GEMINI_API_KEY_C,
  ].filter(Boolean) as string[];
}

export default defineConfig({
  base: "/",
  plugins: [
    {
      name: "gemini-proxy",
      configureServer(server) {
        server.middlewares.use("/api/chat", async (req: any, res: any) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end("Method Not Allowed");
            return;
          }

          let raw = "";
          req.on("data", (chunk: any) => (raw += chunk));
          req.on("end", async () => {
            try {
              const { history, message, systemInstruction } = JSON.parse(raw);
              const keys = getServerKeys();

              if (keys.length === 0) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "No Gemini API key configured on the server. Please set GEMINI_API_KEY." }));
                return;
              }

              let lastError = "Unknown error";

              for (const key of keys) {
                for (const model of MODELS) {
                  const geminiRes = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        systemInstruction: { parts: [{ text: systemInstruction }] },
                        contents: [
                          ...history,
                          { role: "user", parts: [{ text: message }] },
                        ],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
                      }),
                    }
                  );

                  if (geminiRes.ok) {
                    const data = await geminiRes.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify({ text }));
                      return;
                    }
                  }

                  const errData = await geminiRes.json().catch(() => ({}));
                  lastError = (errData as any)?.error?.message || `HTTP ${geminiRes.status}`;

                  if (!RETRIABLE.has(geminiRes.status)) {
                    res.statusCode = geminiRes.status;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ error: lastError }));
                    return;
                  }
                }
              }

              res.statusCode = 503;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: lastError }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
        });
      },
    },
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: "assets",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-firebase": ["firebase/app", "firebase/auth", "firebase/firestore"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip"],
          "vendor-icons": ["lucide-react", "react-icons"],
          "vendor-query": ["@tanstack/react-query"],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
