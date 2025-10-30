'use client';

import { FC } from 'react';
import Image from 'next/image';

import { Room } from '@/models/room';
import Link from 'next/link';

type Props = {
  featuredRoom: Room;
};

const FeaturedRoom: FC<Props> = props => {
  const { featuredRoom } = props;

  return (
    <section className="relative py-14 px-4 bg-gradient-to-br from-gray-900/90 via-slate-800/90 to-gray-700/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row justify-center items-center gap-12 mb-12">
      {/* Image gallery */}
      <div className="flex flex-col gap-7 md:gap-11 items-center w-full md:w-2/5">
        <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-700/60 w-full aspect-[3/2] relative">
          <Image
            src={featuredRoom.coverImage.url}
            alt={featuredRoom.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-600"
          />
        </div>
        {/* Small images */}
        <div className="flex gap-4 w-full">
          {featuredRoom.images.slice(1, 3).map(image => (
            <div key={image._key} className="w-1/2 rounded-xl overflow-hidden shadow-md bg-gray-700/80 aspect-video relative">
              <Image
                src={image.url}
                alt={image._key}
                fill
                className="object-cover hover:scale-105 transition-transform duration-600"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Info/Text section */}
      <div className="md:w-3/5 flex flex-col justify-center md:pl-8">
        <h3 className="text-4xl font-serif font-extrabold text-white mb-5">{featuredRoom.name}</h3>
        <p className="text-gray-200 text-lg mb-8 max-w-2xl font-light">{featuredRoom.description}</p>
        <div className="flex mb-10 gap-7">
          <div className="flex flex-col items-center justify-center bg-slate-800/80 rounded-2xl py-4 px-7 shadow-lg">
            <span className="text-gray-300 text-sm uppercase font-semibold mb-2">Starts From</span>
            <span className="text-3xl font-bold text-white">${featuredRoom.price}</span>
          </div>
          {featuredRoom.discount > 0 && (
            <div className="flex flex-col items-center justify-center bg-slate-700/80 rounded-2xl py-4 px-7 shadow-lg border border-blue-600">
              <span className="text-blue-300 text-sm uppercase font-semibold mb-2">Discount</span>
              <span className="text-3xl font-bold text-blue-100">${featuredRoom.discount}</span>
            </div>
          )}
        </div>
        <Link
          href={`/rooms/${featuredRoom.slug.current}`}
          className="mt-2 inline-flex items-center gap-2 bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-400 hover:from-blue-900 hover:to-blue-600 text-white text-xl font-bold rounded-xl px-8 py-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-200 focus:outline-none w-full sm:w-auto justify-center"
        >
          More Details
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 5l7 7-7 7M5 12h14'/></svg>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedRoom;
