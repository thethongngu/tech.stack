'use client';

import React from 'react';
import Link from 'next/link'; // Import Link
import { ThemeToggleButton } from '@/components/ThemeToggleButton'; // Adjust path if your alias or structure differs

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-[rgb(var(--border-rgb))]">
      <div>
        <Link href="/" className="text-xl font-semibold text-[rgb(var(--foreground-rgb))] hover:text-[rgb(var(--foreground-rgb),0.7)] no-underline">
          Tech Stack Explorer
        </Link>
      </div>
      <nav className="flex items-center gap-4"> {/* Added nav element and gap */}
        <Link href="/technologies" className="text-[rgb(var(--foreground-rgb))] hover:text-[rgb(var(--foreground-rgb),0.7)] no-underline">
          Technology Catalog
        </Link>
        <ThemeToggleButton />
      </nav>
    </header>
  );
};

export default Header;
