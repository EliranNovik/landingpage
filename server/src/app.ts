import cors from "cors";
import express from "express";
import contactRoutes from "./routes/contactRoutes.js";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://services.lawoffice.org.il",
  "https://landingpage-flax-xi.vercel.app",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

function getAllowedOrigins(): string[] {
  const fromEnv = process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const frontendUrl = process.env.FRONTEND_URL?.trim();

  return [
    ...DEFAULT_ALLOWED_ORIGINS,
    ...(fromEnv ?? []),
    ...(frontendUrl ? [frontendUrl] : []),
  ];
}

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const allowed = getAllowedOrigins();
      if (allowed.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", contactRoutes);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
);

export default app;
