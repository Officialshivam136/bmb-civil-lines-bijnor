'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface hover:bg-background border border-border text-foreground font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
    >
      <Printer className="w-4 h-4 text-primary" />
      <span>Print / Download Bill</span>
    </button>
  );
}
