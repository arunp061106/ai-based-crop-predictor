import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="text-center md:text-left mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full text-green-700 text-xs font-semibold uppercase tracking-wider mb-6 border border-green-100 italic">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Market Intel
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1D1D1F] leading-[1.1] mb-6 max-w-2xl">
          Harvesting clarity through <span className="text-green-600">predictive AI.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed">
          Unlock high-confidence price forecasts for Indian crops. Powered by real-time AGMARKNET data and advanced regression models.
        </p>
      </motion.div>
    </section>
  );
}
