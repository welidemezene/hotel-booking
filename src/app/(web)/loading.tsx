const LoadingSpinner = () => (
  <div className='flex items-center justify-center h-screen bg-white dark:bg-gray-900'>
    <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 dark:border-blue-400 border-r-transparent border-l-transparent' />
  </div>
);

export default LoadingSpinner;
