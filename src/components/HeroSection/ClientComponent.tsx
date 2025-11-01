'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  images: string[];
}

const heading = (
  <div className="z-10 relative flex flex-col items-start justify-center px-5 py-24 w-full max-w-3xl">
    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-extrabold leading-tight mb-8 drop-shadow-lg text-white">
      Discover Timeless Luxury at Addis Amba
    </h1>
    <p className="mb-10 text-base sm:text-lg md:text-2xl font-light text-blue-200 max-w-xl">
      Welcome to Addis Amba, where sophistication meets comfort. Experience a sanctuary of peace, elegance, and hospitality designed to make every moment unforgettable.
    </p>
    <Link href="/booking" prefetch={true}>
      <button className="bg-blue-600 hover:bg-blue-700 text-lg font-bold px-8 py-4 rounded-full shadow-lg uppercase tracking-wide transition">Book Now</button>
    </Link>
  </div>
);

const ClientComponent: React.FC<HeroProps> = ({ images }) => {
  const [active, setActive] = useState(0);
  const total = images.length;

  const prev = () => setActive((active - 1 + total) % total);
  const next = () => setActive((active + 1) % total);

  return (
    <section className="relative flex items-center justify-center min-h-[550px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
      {/* Carousel Images */}
      {images.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out ${
            idx === active ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-95 z-0 pointer-events-none'}
          `}
        >
          <Image src={src} alt={`Hotel hero ${idx + 1}`} fill className="object-cover" priority={idx===0} />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-blue-900/60" />
        </div>
      ))}
      {/* Arrows */}
      {total > 1 && (
        <button
          className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/60 hover:bg-blue-300/90 text-blue-700 text-2xl shadow-lg transition z-10"
          style={{ backdropFilter: 'blur(2px)' }}
          aria-label="Show previous image"
          onClick={prev}
        >
          <svg width={28} height={28} fill="none" viewBox="0 0 24 24"><path d="M15.25 19.25L8.75 12.75L15.25 6.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {total > 1 && (
        <button
          className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/60 hover:bg-blue-300/90 text-blue-700 text-2xl shadow-lg transition z-10"
          style={{ backdropFilter: 'blur(2px)' }}
          aria-label="Show next image"
          onClick={next}
        >
          <svg width={28} height={28} fill="none" viewBox="0 0 24 24"><path d="M8.75 19.25L15.25 12.75L8.75 6.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {/* Content Overlay */}
      <div className="absolute left-1/2 top-1/2 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 flex flex-col items-start">
        {heading}
      </div>
    </section>
  );
};

export default ClientComponent;
