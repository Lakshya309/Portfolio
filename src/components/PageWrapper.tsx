'use client';

import React, { forwardRef } from 'react';
import Footer from './Footer';

// This component now only serves to structure the page correctly.
// No complex useEffect or GSAP logic is needed for the reveal effect.
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-container">
      <main className="main-content-wrapper">
        {children}
      </main>
      {/* The Footer is now a direct sibling of the main content */}
      <Footer />
    </div>
  );
};

export default PageWrapper;