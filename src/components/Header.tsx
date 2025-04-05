import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../services/api/authService';

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <header className="bg-amber-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/sales" className="flex items-center space-x-2">
              
              <span className="font-bold text-lg">Developer Store</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm">Bem-vindo, {username}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-amber-700 hover:bg-amber-800 rounded-md transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 