'use client';

import { useEffect, useState } from 'react';

export function BrowserComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or loading state
  }

  return (
    <div>
      {/* Your component content goes here */}
    </div>
  );
} 