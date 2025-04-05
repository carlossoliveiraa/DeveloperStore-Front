import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',  // Removido o /api/v1 da baseURL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Adicionando token à requisição:', config.url);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('Token não encontrado para a requisição:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.config.url, response.status);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Erro 401 - Redirecionando para login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 