import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { removeAuthToken } from '../services/api/authService';

interface LayoutProps {
  children: React.ReactNode;
  username: string;
}

const Layout: React.FC<LayoutProps> = ({ children, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-200 text-gray-800 flex flex-col">
        <div className="p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <nav className="mt-4 space-y-2">
            <Link to="/sales/new" className="block px-4 py-2 rounded hover:bg-gray-300">Nova Venda</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300">Sair</button>
          </nav>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <Header username={username} />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 