# Crop Market Price Predictor

A premium, AI-powered web application for predicting crop prices in Indian markets.

## Features

- **Real-time Market Data**: Uses AGMARKNET dataset structures for consistent modeling.
- **AI-Powered Predictions**: Logical regression engine that accounts for state-wise trends, seasonality, and quantity.
- **Premium UI**: Modern, minimal interface with soft shadows, glassmorphism, and responsive design.
- **Interactive Analytics**: 7-day price trends and future forecasts visualized with Recharts.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Motion, Recharts, Lucide Icons.
- **Backend**: Node.js, Express (proxying and prediction logic).
- **Infrastucture**: Vite for fast development and optimized production builds.

## How to Run Locally

1. **Clone the project**
   ```bash
   # Use the export tool in AI Studio to download the ZIP or push to GitHub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## Prediction Logic

The current prediction model simulates a linear regression approach:
- **Base Price**: Historical average for the selected crop.
- **Seasonality**: Adjusts based on the month of the selected date.
- **Quantity Buffer**: Large volume sales typically involve a bulk discount calculation.
- **Confidence**: Calculated based on market stability and data availability.
