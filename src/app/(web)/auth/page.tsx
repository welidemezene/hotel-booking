'use client';

import { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/');
  }, [router, session]);

  const handleGithubSignIn = async () => {
    try {
      await signIn('github', { callbackUrl: '/' });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with GitHub sign in");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with Google sign in");
    }
  };

  return (
    <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12'>
          {/* Header */}
          <div className='text-center mb-10'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-3'>
              Welcome to Addis Amba
            </h1>
            <p className='text-gray-600 dark:text-gray-300 text-lg'>
              Sign in to continue your luxury experience
            </p>
          </div>

          {/* Auth Buttons */}
          <div className='space-y-4'>
            {/* GitHub Button */}
            <button
              onClick={handleGithubSignIn}
              className='w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]'
            >
              <AiFillGithub className='text-2xl' />
              <span className='text-lg'>Continue with GitHub</span>
            </button>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              className='w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-gray-200 dark:border-gray-600'
            >
              <FcGoogle className='text-2xl' />
              <span className='text-lg'>Continue with Google</span>
            </button>
          </div>

          {/* Footer Text */}
          <p className='text-center text-gray-500 dark:text-gray-400 text-sm mt-8'>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
