import { Sprout } from 'lucide-react';

export function Header() {
  return (
    <header className="px-8 pt-8 pb-6 bg-app-bg">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-brand-emerald rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#111827]">Crop Market Price Predictor</h1>
        </div>
        <p className="text-sm text-app-muted font-medium ml-12">AI-powered real-time market insights & predictive forecasting</p>
      </div>
    </header>
  );
}
