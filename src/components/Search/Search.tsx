'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 px-4 py-8 rounded-2xl shadow-lg mt-10 mb-10 mx-4 max-w-5xl mx-auto overflow-x-hidden w-full">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center w-full">
        <div className="w-full md:w-1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-semibold mb-2 text-gray-200">
            Room Type
          </label>
          <div className="relative">
            <select
              value={roomTypeFilter}
              onChange={handleRoomTypeChange}
              className="w-full px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-black transition"
            >
              <option value='All'>All</option>
              <option value='Basic'>Basic</option>
              <option value='Luxury'>Luxury</option>
              <option value='Suite'>Suite</option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-semibold mb-2 text-gray-200">
            Search
          </label>
          <input
            type='search'
            id='search'
            placeholder='Search...'
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-black transition"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
        <button
          className="px-7 py-3 rounded-lg font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition border-none"
          type='button'
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
