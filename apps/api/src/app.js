import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api",router)

app.get("/health", (req, res) => {
    res.json({ status : "ok" });
});

app.use(errorHandler);

export default app;