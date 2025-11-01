'use client';

import useSWR from 'swr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';
import { useState } from 'react';
import axios from 'axios';

import { getRoom } from '@/libs/apis';
import LoadingSpinner from '../../loading';
import HotelPhotoGallery from '@/components/HotelPhotoGallery/HotelPhotoGallery';
import BookRoomCta from '@/components/BookRoomCta/BookRoomCta';
import toast from 'react-hot-toast';
import { getStripe } from '@/libs/stripe';
import RoomReview from '@/components/RoomReview/RoomReview';

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => getRoom(slug);

  const { data: room, error, isLoading } = useSWR(['room', slug], fetchRoom);

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center max-w-md mx-4">
        <p className='text-red-600 dark:text-red-400 text-lg font-semibold'>Failed to load room details.</p>
      </div>
    </div>
  );
  if (typeof room === 'undefined' && !isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center max-w-md mx-4">
          <p className='text-red-600 dark:text-red-400 text-lg font-semibold'>Failed to load room details.</p>
        </div>
      </div>
    );

  if (!room) return <LoadingSpinner />;

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error('Please provide checkin / checkout date');

    if (checkinDate > checkoutDate)
      return toast.error('Please choose a valid checkin period');

    const numberOfDays = calcNumDays();

    const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post('/api/stripe', {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error('Payment Failed');
        }
      }
    } catch (error) {
      console.log('Error: ', error);
      toast.error('An error occured');
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <HotelPhotoGallery photos={room.images || []} />

      <div className='container mx-auto mt-12 md:mt-20 px-4'>
        <div className='md:grid md:grid-cols-12 gap-8 md:gap-10'>
          <div className='md:col-span-8 md:w-full'>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <h2 className='font-bold text-left text-2xl md:text-3xl mb-6 text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent'>
                {room.name} ({room.dimension})
              </h2>
              <div className='flex flex-wrap gap-3 my-8'>
                {(room.offeredAmenities || []).map(amenity => (
                  <div
                    key={amenity._key}
                    className='text-center px-4 py-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow'
                  >
                    <i className={`fa-solid ${amenity.icon} text-xl md:text-2xl text-blue-600 dark:text-blue-400`}></i>
                    <p className='text-xs md:text-sm pt-2 text-gray-700 dark:text-gray-300 font-medium'>
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mb-8'>
                <h2 className='font-bold text-2xl md:text-3xl mb-4 text-gray-800 dark:text-white'>Description</h2>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>{room.description}</p>
              </div>
              <div className='mb-8'>
                <h2 className='font-bold text-2xl md:text-3xl mb-4 text-gray-800 dark:text-white'>Offered Amenities</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {(room.offeredAmenities || []).map(amenity => (
                    <div
                      key={amenity._key}
                      className='flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'
                    >
                      <i className={`fa-solid ${amenity.icon} text-blue-600 dark:text-blue-400`}></i>
                      <p className='text-sm md:text-base ml-3 text-gray-700 dark:text-gray-300'>
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='mb-8'>
                <h2 className='font-bold text-2xl md:text-3xl mb-4 text-gray-800 dark:text-white'>Safety And Hygiene</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
                    <MdOutlineCleaningServices className="text-blue-600 dark:text-blue-400 text-xl" />
                    <p className='ml-3 text-sm md:text-base text-gray-700 dark:text-gray-300'>Daily Cleaning</p>
                  </div>
                  <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
                    <LiaFireExtinguisherSolid className="text-blue-600 dark:text-blue-400 text-xl" />
                    <p className='ml-3 text-sm md:text-base text-gray-700 dark:text-gray-300'>
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
                    <AiOutlineMedicineBox className="text-blue-600 dark:text-blue-400 text-xl" />
                    <p className='ml-3 text-sm md:text-base text-gray-700 dark:text-gray-300'>
                      Disinfections and Sterilizations
                    </p>
                  </div>
                  <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
                    <GiSmokeBomb className="text-blue-600 dark:text-blue-400 text-xl" />
                    <p className='ml-3 text-sm md:text-base text-gray-700 dark:text-gray-300'>Smoke Detectors</p>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-6 border border-blue-100 dark:border-gray-700'>
                <div className='items-center mb-4'>
                  <p className='text-lg md:text-xl font-bold text-gray-800 dark:text-white'>Customer Reviews</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <RoomReview roomId={room._id} />
                </div>
              </div>
            </div>
          </div>

          <div className='md:col-span-4'>
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 sticky top-10 overflow-hidden'>
              <BookRoomCta
                discount={room.discount}
                price={room.price}
                specialNote={room.specialNote}
                checkinDate={checkinDate}
                setCheckinDate={setCheckinDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                calcMinCheckoutDate={calcMinCheckoutDate}
                adults={adults}
                noOfChildren={noOfChildren}
                setAdults={setAdults}
                setNoOfChildren={setNoOfChildren}
                isBooked={room.isBooked}
                handleBookNowClick={handleBookNowClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
