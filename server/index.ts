import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// ✅ Fix #1: Use full CORS setup
app.use(cors({
    origin: "*",               // Allow all origins (for dev)
    methods: ["GET", "POST"],  // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/api/jobs", async (req, res) => {
    const { count = 20, geo = "usa", industry = "marketing", tag = "seo" } = req.query;

    const url = `https://jobicy.com/api/v2/remote-jobs?count=${count}&geo=${geo}&industry=${industry}&tag=${tag}`;

    try {
        const { data } = await axios.get(url);
        res.json(data);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

// ✅ Fix #2: Bind to all interfaces (important for Vite proxy or cross-port access)
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running at http://localhost:${PORT}`));
