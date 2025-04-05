import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  username: string;
}

const Layout: React.FC<LayoutProps> = ({ children, username }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header username={username} />
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout; 