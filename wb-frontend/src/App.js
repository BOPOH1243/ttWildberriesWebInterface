import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import FilterBar from './FilterBar';
import ProductTable from './ProductTable';
import PriceHistogram from './PriceHistogram';
import DiscountRatingLine from './DiscountRatingLine';
import { parseProducts, fetchProducts } from './api';

function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    min_price: 0, max_price: 100000,
    min_rating: 0, min_feedbacks: 0,
    query: '',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Запрашиваем данные при изменении фильтров
  useEffect(() => {
    setLoading(true);
    fetchProducts(filters)
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleParse = () => {
    if (!query) return;
    parseProducts(query)
      .then(() => {
        setFilters(f => ({ ...f, query }));
      })
      .catch(err => console.error(err));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Wildberries Parser</Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <TextField
          label="Запрос для парсинга"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleParse}>
          Запустить парсинг
        </Button>
      </Box>

      <FilterBar filters={filters} setFilters={setFilters} />

      <Box my={4}>
        <ProductTable data={products} loading={loading} />
      </Box>

      <Box my={4}>
        <PriceHistogram data={products} />
      </Box>

      <Box my={4}>
        <DiscountRatingLine data={products} />
      </Box>
    </Container>
  );
}

export default App;
