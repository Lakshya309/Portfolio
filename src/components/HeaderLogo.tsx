'use client';

import React, { forwardRef } from 'react';

const HeaderLogo = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{
        fontSize: '2vw',
        fontWeight: 'bold',
        // The color and mix-blend-mode are now handled by the parent's CSS
        ...(props.style || {}),
      }}
    >
      Lakshya Tekwani
    </div>
  );
});

HeaderLogo.displayName = 'HeaderLogo';
export default HeaderLogo;