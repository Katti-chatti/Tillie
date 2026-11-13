import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use((req, _res, next) => {
  console.info(`${req.method} ${req.url}`);
  next();
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Til'lie server is running!",
  });
});

/* app.get("/test-error", (_req, _res, next) => {
  next(new Error("This is a test error!"));
}); */

const frontendPath = path.resolve(__dirname, "../../dist");

app.use(express.static(frontendPath));

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Server error:", err);

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred on the server.",
    });
  },
);

app.listen(PORT, () => {
  console.info(
    `Til'lie server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});
