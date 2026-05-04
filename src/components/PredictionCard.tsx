import React, { useState } from 'react';
import { Calendar, MapPin, ChevronDown, Package, Zap } from 'lucide-react';
import { CROPS, STATES } from '../constants';
import { cn } from '../lib/utils';

interface PredictionCardProps {
  onPredict: (data: any) => void;
  isLoading: boolean;
}

export function PredictionCard({ onPredict, isLoading }: PredictionCardProps) {
  const [formData, setFormData] = useState({
    crop: 'Wheat',
    state: 'Punjab',
    district: '',
    quantity: 100,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sleek border border-white/70 p-6 flex flex-col gap-5">
      <div className="section-title text-[12px] font-bold uppercase tracking-wider text-slate-400">Configuration</div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[#374151] ml-1">Select Crop</label>
          <div className="relative">
            <select
              value={formData.crop}
              onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-sm text-[#1F2937] outline-none appearance-none hover:border-brand-emerald/50 transition-colors cursor-pointer"
            >
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[#374151] ml-1">Market State</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full pl-10 pr-10 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-sm text-[#1F2937] outline-none appearance-none hover:border-brand-emerald/50 transition-colors cursor-pointer"
            >
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#374151] ml-1">Quantity (kg)</label>
            <div className="relative">
              <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-sm text-[#1F2937] outline-none hover:border-brand-emerald/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#374151] ml-1">Sale Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-2 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] text-[12px] text-[#1F2937] outline-none hover:border-brand-emerald/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full mt-2 py-3.5 rounded-[12px] border-none bg-brand-emerald text-white font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98]",
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-emerald-dark"
          )}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Zap className="w-4 h-4 fill-current" />
          )}
          Generate Prediction
        </button>
      </form>
    </div>
  );
}
