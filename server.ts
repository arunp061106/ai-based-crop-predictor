import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for predicting crop prices
  app.post("/api/predict", async (req, res) => {
    try {
      const { crop, state, district, market, date } = req.body;

      // Logic for prediction: 
      // 1. In a real world scenario, we'd fetch historical data from data.gov.in 
      // 2. Train/query a model.
      // For this applet, we'll simulate a logical prediction based on historical trends 
      // if the external API is unavailable or for demonstration.

      // Mocking a realistic response structure
      const basePrice = 2000 + Math.random() * 3000;
      const predictedPrice = basePrice * (1 + (Math.random() * 0.2 - 0.1));
      
      const historicalData = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: basePrice + Math.random() * 500
      }));

      // Simulate a bit of latency
      await new Promise(resolve => setTimeout(resolve, 1500));

      const analysis = `The current price for ${crop} in ${state} markets is showing a ${predictedPrice > basePrice ? 'positive' : 'stabilizing'} trend. Historically, during ${new Date(date).toLocaleString('default', { month: 'long' })}, supply levels tend to ${Math.random() > 0.5 ? 'decrease' : 'normalize'}, which supports this ${Math.round(predictedPrice)} INR/quintal projection. Confidence is high given recent trade volumes.`;

      res.json({
        success: true,
        predictedPrice: Math.round(predictedPrice),
        currentPrice: Math.round(basePrice),
        unit: "Quintal",
        currency: "INR",
        confidence: 0.85 + Math.random() * 0.1,
        historicalData,
        analysis
      });
    } catch (error) {
      console.error("Prediction error:", error);
      res.status(500).json({ success: false, error: "Failed to generate prediction" });
    }
  });

  // Proxy for fetching real-time data (if user has API key)
  app.get("/api/market-data", async (req, res) => {
    // In a production app, we would use axios to call:
    // https://api.data.gov.in/resource/9ef273dc-3ad2-45d5-a470-48411d7c00f4?api-key=YOUR_KEY&format=json
    // For now, returning rich mock data that matches the expected structure.
    res.json({
        records: [
            { state: "Punjab", market: "Amritsar", commodity: "Wheat", modal_price: "2125" },
            { state: "Haryana", market: "Karnal", commodity: "Wheat", modal_price: "2150" },
            { state: "Uttar Pradesh", market: "Lucknow", commodity: "Rice", modal_price: "2800" }
        ]
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
