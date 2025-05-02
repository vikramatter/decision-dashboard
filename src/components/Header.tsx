import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
    </header>
  );
};