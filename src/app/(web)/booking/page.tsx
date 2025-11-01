'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { getRooms } from '@/libs/apis';
import Search from '@/components/Search/Search';
import RoomCard from '@/components/RoomCard/RoomCard';
import { Room } from '@/models/room';
import LoadingSpinner from '../loading';

const BookingPage = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQueryParam = searchParams.get('searchQuery');
    const roomType = searchParams.get('roomType');

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQueryParam) setSearchQuery(searchQueryParam);
  }, [searchParams]);

  async function fetchData() {
    return getRooms();
  }

  const { data: rooms, error, isLoading } = useSWR('booking:rooms', fetchData);

  const filterRooms = (roomsList: Room[]) => {
    return roomsList.filter(room => {
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== 'all' &&
        room.type?.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }
      if (
        searchQuery &&
        !room.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <section className="relative py-16 md:py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Book Your Room
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Browse our luxurious selection of rooms and suites
              </p>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 pb-20">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
            <p className='text-red-600 dark:text-red-400 text-lg font-semibold'>Failed to load rooms. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  const filteredRooms = filterRooms(rooms || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Book Your Room
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse our luxurious selection of rooms and suites
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <Search
              roomTypeFilter={roomTypeFilter}
              searchQuery={searchQuery}
              setRoomTypeFilter={setRoomTypeFilter}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-8 px-4 pb-20">
        <div className="container mx-auto max-w-7xl">
          <div className='grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center'>
            {filteredRooms && filteredRooms.length > 0 ? (
              filteredRooms.map((room: Room) => (
                <RoomCard key={room._id} room={room} />
              ))
            ) : (
              <div className='col-span-full'>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 border border-gray-100 dark:border-gray-700 text-center">
                  <p className='text-gray-500 dark:text-gray-400 text-lg'>No rooms available matching your search.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;

