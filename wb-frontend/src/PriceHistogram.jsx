import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Typography, Paper } from '@mui/material';

export default function PriceHistogram({ data }) {
  // Формируем корзины по цене
  const buckets = {};
  data.forEach(p => {
    const bin = Math.floor(p.price / 10000) * 10000;
    buckets[bin] = (buckets[bin] || 0) + 1;
  });
  const chartData = Object.entries(buckets)
    .map(([price, count]) => ({ price: `${price}–${+price+9999}`, count }));

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Распределение цен</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="price" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
