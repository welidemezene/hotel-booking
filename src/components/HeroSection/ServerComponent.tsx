import Image from 'next/image';
import Link from 'next/link';

export const heading1 = (
  <div className="relative flex flex-col items-start justify-center min-h-[430px] lg:min-h-[600px] pl-5 pr-10 py-24 text-white">
    <h1 className="text-5xl lg:text-7xl font-serif font-extrabold leading-tight mb-8 drop-shadow-lg">
      Experience Luxe Hospitality
    </h1>
    <p className="max-w-2xl mb-10 text-lg lg:text-2xl font-light text-blue-200">
      Welcome to a sanctuary of elegance and indulgence. Unwind in refined luxury, where every stay is a curated experience of comfort and style.
    </p>
    <Link href="/booking">
      <button className="bg-blue-600 hover:bg-blue-700 text-lg font-bold px-8 py-4 rounded-full shadow-lg uppercase tracking-wide transition">Book Now</button>
    </Link>
  </div>
);

export const section2 = (
  <div className='absolute inset-0 -z-10'>
    <div className='absolute inset-0 bg-gradient-to-br from-black/70 to-blue-900/60'></div>
    <Image src='/images/hero-1.jpeg' alt='Luxurious Hotel' fill className='object-cover w-full h-full' priority />
  </div>
);
