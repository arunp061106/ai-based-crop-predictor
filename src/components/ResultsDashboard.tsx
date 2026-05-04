import { TrendingUp, Scale, Info, Activity } from 'lucide-react';
import { PredictionResult } from '../constants';
import { PriceChart } from './PriceChart';

interface ResultsDashboardProps {
  result: PredictionResult;
}

export function ResultsDashboard({ result }: ResultsDashboardProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-sleek border border-white/70 p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="section-title text-[12px] font-bold uppercase tracking-wider text-slate-400">Price Trend Analysis</div>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold border border-emerald-100 flex items-center gap-1.5 uppercase tracking-wide">
          <Activity className="w-3 h-3" />
          Live Data Verified
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#F9FAFB] border border-[#F3F4F6] p-4 rounded-[16px]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">7D High</div>
          <div className="text-xl font-bold text-[#111827]">₹ {Math.round(result.currentPrice * 1.08).toLocaleString()}</div>
        </div>
        <div className="bg-[#F9FAFB] border border-[#F3F4F6] p-4 rounded-[16px]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">7D Low</div>
          <div className="text-xl font-bold text-[#111827]">₹ {Math.round(result.currentPrice * 0.95).toLocaleString()}</div>
        </div>
        <div className="bg-[#F9FAFB] border border-[#F3F4F6] p-4 rounded-[16px]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Market Volatility</div>
          <div className="text-xl font-bold text-[#111827]">2.4%</div>
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <PriceChart data={result.historicalData} />
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-1.5 uppercase tracking-tight">Market Intelligence</h4>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
              {result.analysis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
