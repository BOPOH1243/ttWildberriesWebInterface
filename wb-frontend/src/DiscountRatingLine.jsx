import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Typography, Paper } from '@mui/material';

export default function DiscountRatingLine({ data }) {
  const chartData = data.map(p => ({
    rating: p.rating,
    discount: +( ((p.price - p.sale_price) / p.price) * 100 ).toFixed(1),
  }));
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Скидка vs Рейтинг</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="rating" />
          <YAxis unit="%" />
          <Tooltip />
          <Line type="monotone" dataKey="discount" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
