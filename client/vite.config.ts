import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";

function dynamicOgAbsoluteUrls(): Plugin {
  const ogImagePath = "/site-logo.png?v=5";

  const toAbsolute = (origin: string, url: string) => {
    if (!url.startsWith("/")) return url;
    return `${origin}${url}`;
  };

  return {
    name: "dynamic-og-absolute-urls",
    configureServer(server) {
      const indexHtmlPath = path.resolve(__dirname, "index.html");

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || req.method !== "GET") return next();
        if (req.url !== "/" && req.url !== "/index.html") return next();

        const hostHeader = (req.headers["x-forwarded-host"] ||
          req.headers.host) as string | undefined;
        const protoHeader = (req.headers["x-forwarded-proto"] ||
          "http") as string | undefined;

        if (!hostHeader) return next();

        const protocol = (protoHeader ?? "http").split(",")[0].trim();
        const host = hostHeader.split(",")[0].trim();
        const origin = `${protocol}://${host}`;

        let html = fs.readFileSync(indexHtmlPath, "utf-8");
        html = html
          .replaceAll(`property="og:image" content="${ogImagePath}"`, `property="og:image" content="${toAbsolute(origin, ogImagePath)}"`)
          .replaceAll(
            `property="og:image:secure_url" content="${ogImagePath}"`,
            `property="og:image:secure_url" content="${toAbsolute(origin, ogImagePath)}"`
          )
          .replaceAll(
            `name="twitter:image" content="${ogImagePath}"`,
            `name="twitter:image" content="${toAbsolute(origin, ogImagePath)}"`
          );

        // Let Vite inject HMR/client scripts, etc.
        html = await server.transformIndexHtml(req.url, html);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(html);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), dynamicOgAbsoluteUrls()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    allowedHosts: [
      ".ngrok-free.app",
    ],
    proxy: {
      "/api": {
        target: "http://localhost:3005",
        changeOrigin: true,
      },
    },
  },
});
