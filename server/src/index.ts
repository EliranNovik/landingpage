import cors from "cors";
import express from "express";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3005;

app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
