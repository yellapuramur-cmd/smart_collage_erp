import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-sm">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600 dark:text-gray-300">
              {entry.name}: <span className="font-medium text-gray-900 dark:text-white">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const commonProps = {
  margin: { top: 10, right: 30, left: 0, bottom: 0 },
};

const axisProps = {
  stroke: '#9ca3af',
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

export const BarChartComponent = ({ data, xKey, yKeys = [], height = 300 }) => {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer>
        <BarChart data={data} {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {yKeys.map((key, i) => (
            <Bar key={key.key || key} dataKey={key.key || key} name={key.name || key} fill={key.color || defaultColors[i % defaultColors.length]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const LineChartComponent = ({ data, xKey, lines = [], height = 300 }) => {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer>
        <LineChart data={data} {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {lines.map((line, i) => (
            <Line 
              key={line.key || line} 
              type="monotone" 
              dataKey={line.key || line} 
              name={line.name || line} 
              stroke={line.color || defaultColors[i % defaultColors.length]} 
              strokeWidth={3}
              activeDot={{ r: 6 }} 
              dot={{ r: 4, strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PieChartComponent = ({ data, nameKey, dataKey, height = 300, colors = defaultColors }) => {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={height / 2 - 40}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
              const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
              return percent > 0.05 ? (
                <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={500}>
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              ) : null;
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AreaChartComponent = ({ data, xKey, areas = [], height = 300 }) => {
  return (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer>
        <AreaChart data={data} {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {areas.map((area, i) => (
            <Area 
              key={area.key || area} 
              type="monotone" 
              dataKey={area.key || area} 
              name={area.name || area} 
              stroke={area.color || defaultColors[i % defaultColors.length]} 
              fill={area.color || defaultColors[i % defaultColors.length]} 
              fillOpacity={0.2} 
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default { BarChartComponent, LineChartComponent, PieChartComponent, AreaChartComponent };
