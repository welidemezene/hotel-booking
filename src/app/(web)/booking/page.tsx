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
      <div className='container mx-auto pt-10 px-4'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Book Your Room</h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Browse our luxurious selection of rooms and suites
          </p>
        </div>
        <p className='mt-10 text-red-400 text-center'>Failed to load rooms. Please try again.</p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  const filteredRooms = filterRooms(rooms || []);

  return (
    <div className='container mx-auto pt-10 px-2'>
      <div className='mb-8 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Book Your Room</h1>
        <p className='text-lg text-gray-600 dark:text-gray-300'>
          Browse our luxurious selection of rooms and suites
        </p>
      </div>
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />
      <div className='grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 justify-items-center'>
        {filteredRooms && filteredRooms.length > 0 ? (
          filteredRooms.map((room: Room) => (
            <RoomCard key={room._id} room={room} />
          ))
        ) : (
          <div className='col-span-full text-center py-12'>
            <p className='text-gray-500 text-lg'>No rooms available matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;

