'use client';

import React from 'react';
import { ThemeToggleButton } from '@/components/ThemeToggleButton'; // Adjust path if your alias or structure differs

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-[rgb(var(--border-rgb))]">
      <div>
        <h1 className="text-xl font-semibold text-[rgb(var(--foreground-rgb))]">
          Tech Stack Explorer
        </h1>
      </div>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
