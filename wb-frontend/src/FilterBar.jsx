import React from 'react';
import { Box, Slider, TextField, Grid, Typography } from '@mui/material';

export default function FilterBar({ filters, setFilters }) {
  return (
    <Box mb={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography gutterBottom>Цена (₽)</Typography>
          <Slider
            getAriaLabel={() => 'Диапазон цены'}
            value={[filters.min_price, filters.max_price]}
            onChange={(_, val) =>
              setFilters(f => ({ ...f, min_price: val[0], max_price: val[1] }))
            }
            valueLabelDisplay="auto"
            min={0}
            max={100000}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Мин. рейтинг"
            type="number"
            fullWidth
            value={filters.min_rating}
            onChange={e =>
              setFilters(f => ({ ...f, min_rating: +e.target.value }))
            }
            inputProps={{ step: 0.1, min: 0, max: 5 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Мин. отзывов"
            type="number"
            fullWidth
            value={filters.min_feedbacks}
            onChange={e =>
              setFilters(f => ({ ...f, min_feedbacks: +e.target.value }))
            }
            inputProps={{ min: 0 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
