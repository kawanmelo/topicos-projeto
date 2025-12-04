import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { setupSwagger } from "./swagger";

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());

setupSwagger(app);

// Root route - redirect to API docs
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});

app.use("", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📡 CORS enabled for: ${CORS_ORIGIN}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
