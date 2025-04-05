import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from  '../../../services/api/authService';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      console.log('Login bem-sucedido:', response);
      
      if (response.success && response.data.token) {
        console.log('Redirecionando para /sales...');
        navigate('/sales', { replace: true });
      } else {
        setError('Falha na autenticação: ' + response.message);
      }
    } catch (err: any) {
      console.error('Erro completo:', err);
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex ">
      {/* Lado Esquerdo - Imagem */}
      <div className="hidden lg:flex lg:w-1/2 bg-amber-600 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5530250/pexels-photo-5530250.jpeg"
          alt="Cervejaria"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50"
        />
        <div className="relative z-10 p-12 flex flex-col justify-center items-center text-white">
         
          <h1 className="text-4xl font-bold mb-4 text-center">
            Developer Store
          </h1>
          <p className="text-xl text-amber-200 text-center">
            Desafio Técnico Ambev
          </p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo Mobile */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/ambev-logo.svg"
              alt="Logo" 
              className="w-24 h-24 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Developer Store
            </h1>
            <p className="text-amber-600 font-medium">
              Desafio Técnico Ambev
            </p>
          </div>

          {/* Formulário */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Digite seu e-mail"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Digite sua senha"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm">
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Use as credenciais fornecidas para teste</p>
              <p className="font-medium mt-1">E-mail: admin@admin.com / Senha: admin</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Developer Store</p>
          <p className="text-xs mt-1">
            Desenvolvido com React, TypeScript e TailwindCSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 