'use client';

import useSWR from 'swr';
import { FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';
import { signOut } from 'next-auth/react';

import { getUserBookings } from '@/libs/apis';
import { User } from '@/models/user';
import LoadingSpinner from '../../loading';
import { useState } from 'react';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import Table from '@/components/Table/Table';
import Chart from '@/components/Chart/Chart';
import RatingModal from '@/components/RatingModal/RatingModal';
import BackDrop from '@/components/BackDrop/BackDrop';
import toast from 'react-hot-toast';

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const [currentNav, setCurrentNav] = useState<
    'bookings' | 'amount' | 'ratings'
  >('bookings');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState('');

  const toggleRatingModal = () => setIsRatingVisible(prevState => !prevState);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error('Please provide a rating text and a rating');
    }

    if (!roomId) toast.error('Id not provided');

    setIsSubmittingReview(true)

    try {
      const { data } = await axios.post('/api/users', {
        reviewText: ratingText,
        ratingValue,
        roomId,
      });
      console.log(data);
      toast.success('Review Submitted');
    } catch (error) {
      console.log(error);
      toast.error('Review Failed');
    } finally {
      setRatingText('');
      setRatingValue(null);
      setRoomId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  const fetchUserBooking = async () => getUserBookings(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>('/api/users');
    return data;
  };

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR('/api/userbooking', fetchUserBooking);

  const {
    data: userData,
    isLoading: loadingUserData,
    error: errorGettingUserData,
  } = useSWR('/api/users', fetchUserData);

  if (error || errorGettingUserData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center max-w-md mx-4">
          <p className='text-red-600 dark:text-red-400 text-lg font-semibold'>Failed to load user data. Please try again.</p>
        </div>
      </div>
    );
  }

  if (loadingUserData || isLoading) return <LoadingSpinner />;

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center max-w-md mx-4">
          <p className='text-red-600 dark:text-red-400 text-lg font-semibold'>User data not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className='container mx-auto px-2 md:px-4 py-10'>
        <div className='grid md:grid-cols-12 gap-8 md:gap-10'>
        <div className='hidden md:block md:col-span-4 lg:col-span-3 shadow-xl h-fit sticky top-10 bg-white dark:bg-gray-800 text-black dark:text-white rounded-3xl px-6 py-6 border border-gray-100 dark:border-gray-700'>
          {userData.image && (
            <div className='md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden'>
              <Image
                src={userData.image}
                alt={userData.name || 'User'}
                width={143}
                height={143}
                className='img scale-animation rounded-full'
              />
            </div>
          )}
          <div className='font-normal py-4 text-left'>
            <h6 className='text-xl font-bold pb-3'>About</h6>
            <p className='text-sm'>{userData.about ?? ''}</p>
          </div>
          <div className='font-normal text-left'>
            <h6 className='text-xl font-bold pb-3'>{userData.name}</h6>
          </div>
          <div className='flex items-center'>
            <p className='mr-2'>Sign Out</p>
            <FaSignOutAlt
              className='text-3xl cursor-pointer'
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </div>
        </div>

        <div className='md:col-span-8 lg:col-span-9'>
          <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 mb-6'>
            <div className='flex items-center'>
              <h5 className='text-2xl md:text-3xl font-bold mr-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent'>Hello, {userData.name}</h5>
            </div>
            {userData.image && (
              <div className='md:hidden w-14 h-14 rounded-l-full overflow-hidden mt-4'>
                <Image
                  className='img scale-animation rounded-full'
                  width={56}
                  height={56}
                  src={userData.image}
                  alt={userData.name || 'User'}
                />
              </div>
            )}
            <p className='block w-fit md:hidden text-sm py-2'>
              {userData.about ?? ''}
            </p>

            {userData._createdAt && (
              <p className='text-xs py-2 font-medium'>
                Joined In {userData._createdAt.split('T')[0]}
              </p>
            )}
            <div className='md:hidden flex items-center my-2'>
              <p className='mr-2'>Sign out</p>
              <FaSignOutAlt
                className='text-3xl cursor-pointer'
                onClick={() => signOut({ callbackUrl: '/' })}
              />
            </div>
          </div>

          <nav className='sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-lg mt-7'>
            <ol
              className={`${
                currentNav === 'bookings' ? 'text-blue-600' : 'text-gray-700'
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('bookings')}
                className='inline-flex items-center cursor-pointer'
              >
                <BsJournalBookmarkFill />
                <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                  Current Bookings
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === 'amount' ? 'text-blue-600' : 'text-gray-700'
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('amount')}
                className='inline-flex items-center cursor-pointer'
              >
                <GiMoneyStack />
                <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === 'bookings' ? (
            userBookings && (
              <Table
                bookingDetails={userBookings}
                setRoomId={setRoomId}
                toggleRatingModal={toggleRatingModal}
              />
            )
          ) : (
            <></>
          )}

          {currentNav === 'amount' ? (
            userBookings && <Chart userBookings={userBookings} />
          ) : (
            <></>
          )}
        </div>
        </div>
      </div>

      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={isSubmittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} />
    </div>
  );
};

export default UserDetails;
