import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runTryOn } from "./fal.js";
import { getCache, setCache } from "./cache.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let lastRequest = null;

app.post("/try-on", async (req, res) => {
  try {
    const key = JSON.stringify(req.body);

    if (getCache(key)) {
      return res.json({ output: getCache(key), cached: true });
    }

    const { userImage, garmentImage } = req.body;
    lastRequest = req.body;

    const output = await runTryOn(userImage, garmentImage);

    setCache(key, output);

    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/retry", async (req, res) => {
  try {
    if (!lastRequest) return res.status(400).json({ error: "No previous request" });

    const output = await runTryOn(lastRequest.userImage, lastRequest.garmentImage);

    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
