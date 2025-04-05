export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    LOGIN: '/api/v1/auth/signin',
    SALES: '/api/v1/sales',
    SWAGGER: '/swagger/index.html'
  },
  TIMEOUT: 5000
} as const;

// Função auxiliar para construir URLs completas
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 