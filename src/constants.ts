export const CROPS = [
  "Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Potato", "Onion", "Tomato", "Soybean", "Mustard"
];

export const STATES = [
  "Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Maharashtra", "Gujarat", "Karnataka", "Tamil Nadu", "Andhra Pradesh"
];

export interface PredictionState {
  crop: string;
  state: string;
  district: string;
  market: string;
  quantity: number;
  date: string;
}

export interface PredictionResult {
  predictedPrice: number;
  currentPrice: number;
  unit: string;
  currency: string;
  confidence: number;
  historicalData: Array<{ date: string; price: number }>;
  analysis: string;
}
