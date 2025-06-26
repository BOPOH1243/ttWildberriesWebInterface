import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Запрос на парсинг по ключевому слову
export const parseProducts = (query) =>
  API.post('/parse/', { query });

// Получение списка продуктов с фильтрами
export const fetchProducts = (filters) =>
  API.get('/products/', { params: filters }).then(res => res.data);
