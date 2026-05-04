import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

interface PriceChartProps {
  data: Array<{ date: string; price: number }>;
}

export function PriceChart({ data }: PriceChartProps) {
  // Add a future prediction point to the chart
  const lastPoint = data[data.length - 1];
  const chartData = [
    ...data,
    {
       date: 'Forecast',
       price: lastPoint.price * 1.05,
       isPrediction: true
    }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.08}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 600 }}
          dy={15}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 600 }}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: '1px solid #F3F4F6', 
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.03)',
            fontSize: '12px',
            padding: '8px 12px'
          }}
          labelStyle={{ fontWeight: 'bold', marginBottom: '2px', color: '#111827' }}
          itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
        />
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke="#10B981" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorPrice)" 
          animationDuration={1000}
          dot={{ r: 3, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
          activeDot={{ r: 5, fill: '#10B981', stroke: '#fff', strokeWidth: 2, shadow: '0 0 10px rgba(16,185,129,0.3)' }}
        />
        <ReferenceLine 
          x="Forecast" 
          stroke="#10B981" 
          strokeDasharray="6 4" 
          opacity={0.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
