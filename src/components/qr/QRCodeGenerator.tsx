'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export default function QRCodeGenerator({ value, size = 200, className = '' }: QRCodeProps) {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: {
        dark: '#7A1C1C', // Royal Burgundy BMB color
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('Failed to generate QR', err));
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className="bg-neutral-100 animate-pulse rounded-lg flex items-center justify-center text-xs text-neutral-400"
      >
        Generating QR...
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt="BMB Misthan QR Code"
        width={size}
        height={size}
        className="rounded-lg shadow-xs"
      />
    </div>
  );
}
