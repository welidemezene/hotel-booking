'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getRooms } from '@/libs/apis';
import { Room } from '@/models/room';
import Search from '@/components/Search/Search';
import RoomCard from '@/components/RoomCard/RoomCard';

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('searchQuery');
    const roomType = searchParams.get('roomType');

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, []);

  async function fetchData() {
    return getRooms();
  }

  const { data, error, isLoading } = useSWR('rooms:list', fetchData);

  if (error) {
    return (
      <div className='container mx-auto pt-10 px-4'>
        <Search
          roomTypeFilter={roomTypeFilter}
          searchQuery={searchQuery}
          setRoomTypeFilter={setRoomTypeFilter}
          setSearchQuery={setSearchQuery}
        />
        <p className='mt-10 text-red-400'>Failed to load rooms. Please try again.</p>
      </div>
    );
  }
  if (typeof data === 'undefined' && !isLoading) {
    return (
      <div className='container mx-auto pt-10 px-4'>
        <Search
          roomTypeFilter={roomTypeFilter}
          searchQuery={searchQuery}
          setRoomTypeFilter={setRoomTypeFilter}
          setSearchQuery={setSearchQuery}
        />
        <p className='mt-10 text-red-400'>Failed to load rooms. Please try again.</p>
      </div>
    );
  }

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter(room => {
      // Apply room type filter

      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== 'all' &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      //   Apply search query filter
      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredRooms = filterRooms(data || []);

  return (
    <div className='container mx-auto pt-10 px-2'>
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />
      <div className='grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 justify-items-center'>
        {filteredRooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
