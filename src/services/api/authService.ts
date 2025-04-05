import api from './axiosConfig';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
  };
  success: boolean;
  message: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('Iniciando login com:', { email: credentials.email, password: '***' });
    
    const response = await api.post<LoginResponse>('/api/v1/auth/signin', credentials);
    console.log('Resposta do login:', response.data);
    
    if (response.data.success && response.data.data.token) {
      console.log('Token recebido, armazenando...');
      const token = response.data.data.token;
      setAuthToken(token);
      return response.data;
    } else {
      console.error('Token não encontrado na resposta');
      throw new Error(response.data.message || 'Token não encontrado na resposta');
    }
  } catch (error: any) {
    console.error('Erro detalhado:', error);
    throw error;
  }
};

export const setAuthToken = (token: string): void => {
  console.log('Armazenando token no localStorage...');
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('Token configurado no Axios');
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
}; 