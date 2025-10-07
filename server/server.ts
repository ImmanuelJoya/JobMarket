import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));

app.get("/api/jobs", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(
            "https://jobicy.com/api/v2/remote-jobs?count=10"
        );

        console.log("✅ Data received from Jobicy:", response.data.jobs?.length || 0, "jobs");
        res.json(response.data);
    } catch (error: any) {
        console.error("❌ Error fetching jobs:", error.message);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
