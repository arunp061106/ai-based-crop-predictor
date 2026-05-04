/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { PredictionCard } from './components/PredictionCard';
import { ResultsDashboard } from './components/ResultsDashboard';
import { PredictionResult } from './constants';

export default function App() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (data: any) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.success) {
        setResult(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text font-sans">
      <Header />
      
      <main className="max-w-[1280px] mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6 items-start">
          <aside className="space-y-6">
            <PredictionCard onPredict={handlePredict} isLoading={isLoading} />
            
            <AnimatePresence>
              {result && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-linear-to-br from-brand-emerald-dark to-brand-emerald text-white p-6 rounded-[20px] shadow-sleek flex flex-col items-center text-center shadow-emerald-500/20"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest opacity-90 mb-1">Estimated Market Price</span>
                  <div className="text-4xl font-extrabold my-2 flex items-baseline gap-1">
                    <span className="text-xl font-medium opacity-80">₹</span>
                    {result.predictedPrice.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest opacity-90 mb-4">per quintal (100kg)</span>
                  
                  <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
                    {(result.confidence * 100).toFixed(1)}% Confidence Score
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
          
          <div className="h-full">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[600px] flex flex-col items-center justify-center bg-white rounded-[20px] border border-white/70 shadow-sleek"
                >
                  <div className="w-10 h-10 border-[3px] border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                  <p className="text-app-muted text-sm font-semibold tracking-wide uppercase">AI Model Processing...</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <ResultsDashboard result={result} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[600px] flex flex-col items-center justify-center bg-white rounded-[20px] border border-white/70 shadow-sleek px-12 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100/50">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2 tracking-tight">Market Trend Analysis</h3>
                  <p className="text-sm text-app-muted max-w-sm leading-relaxed font-medium">Configure the parameters in the sidebar to generate institutional-grade forecasting and historical comparisons.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
