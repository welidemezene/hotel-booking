import { FC } from 'react';
import Image from 'next/image';
import { Room } from '@/models/room';
import Link from 'next/link';

// Type badge color map
const badgeColors: Record<string, string> = {
  'Single': 'bg-blue-500',
  'Double': 'bg-violet-500',
  'Comfort': 'bg-green-500',
};

const prettifyType = (type: string) => {
  if (type.toLowerCase().includes('single')) return 'Single';
  if (type.toLowerCase().includes('double')) return 'Double';
  return 'Comfort';
};

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = ({ room }) => {
  const { coverImage, name, price, type, description, slug, isBooked } = room;
  const prettyType = prettifyType(type);
  const badgeClass = badgeColors[prettyType] || 'bg-gray-400';

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-slate-800/90 rounded-2xl shadow-2xl w-full max-w-xs mx-auto mb-10 overflow-hidden hover:scale-105 hover:shadow-3xl transition-transform duration-300">
      {/* Image with badge */}
      <div className="relative w-full aspect-[3/2]">
        <Image
          src={coverImage.url}
          alt={name}
          fill
          loading="lazy"
          sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 340px"
          className="object-cover w-full h-full rounded-t-2xl"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md ${badgeClass}`}>{prettyType} Room</span>
        <span className="absolute bottom-3 right-3 px-4 py-1 bg-gray-900/80 border border-white/10 rounded-full text-lg font-bold text-white shadow-md">
          ${price}
        </span>
      </div>
      {/* Info */}
      <div className="p-5 flex flex-col gap-2 bg-gray-950/80">
        <h3 className="text-xl font-extrabold text-white truncate">{name}</h3>
        <p className="text-sm text-gray-300 font-light overflow-hidden whitespace-nowrap text-ellipsis">{description?.slice(0, 80)}...</p>
        <Link
          href={`/rooms/${slug.current}`}
          prefetch={true}
          className={`mt-4 w-full py-3 text-lg font-bold rounded-xl 
            ${isBooked ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}
            transition duration-300 shadow-lg text-center tracking-wide`
          }
        >
          {isBooked ? 'BOOKED' : 'BOOK NOW'}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
