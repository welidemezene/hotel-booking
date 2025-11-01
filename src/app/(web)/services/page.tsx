'use client';

import { 
  FaConciergeBell, 
  FaUtensils, 
  FaGlassCheers, 
  FaTshirt, 
  FaParking, 
  FaWifi, 
  FaShieldAlt, 
  FaVideo, 
  FaClock,
  FaSmokingBan,
  FaUserFriends,
  FaShuttleVan
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const mainServices = [
  {
    icon: FaConciergeBell,
    title: 'Room Service',
    description: 'Enjoy freshly prepared meals and beverages delivered directly to your room. Available 24/7 for your convenience.',
    color: 'from-blue-500 to-blue-600',
    iconColor: 'text-blue-500',
  },
  {
    icon: FaUtensils,
    title: 'Restaurant & Cafeteria',
    description: 'Savor a blend of Ethiopian and international cuisine, crafted to perfection by our expert chefs.',
    color: 'from-orange-500 to-orange-600',
    iconColor: 'text-orange-500',
  },
  {
    icon: FaGlassCheers,
    title: 'Juice Bar',
    description: 'Refresh yourself with freshly squeezed juices and smoothies made from the finest seasonal fruits.',
    color: 'from-green-500 to-green-600',
    iconColor: 'text-green-500',
  },
  {
    icon: FaTshirt,
    title: 'Laundry Service',
    description: 'Fast, clean, and reliable laundry to keep you looking your best. Same-day service available.',
    color: 'from-purple-500 to-purple-600',
    iconColor: 'text-purple-500',
  },
];

const amenities = [
  {
    icon: FaParking,
    title: 'Free Parking',
    description: 'Complimentary parking available for all guests. Secure and convenient parking spaces.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: FaWifi,
    title: 'Free WiFi',
    description: 'High-speed internet connection throughout the hotel. Stay connected during your entire stay.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: FaShieldAlt,
    title: 'High Security',
    description: 'Your safety is our priority. We maintain the highest security standards for your peace of mind.',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: FaVideo,
    title: 'CCTV Camera',
    description: '24/7 surveillance system monitoring all areas to ensure maximum security and safety.',
    color: 'from-gray-600 to-gray-700',
  },
  {
    icon: FaClock,
    title: '24 Hours Hosting Service',
    description: 'Round-the-clock reception and concierge services. We are always here to assist you.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: FaSmokingBan,
    title: 'Smoke-Free Rooms',
    description: 'All our rooms are smoke-free to ensure a fresh and healthy environment for all guests.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: FaUserFriends,
    title: 'Friendly Service',
    description: 'Our staff is dedicated to providing warm, welcoming, and exceptional service throughout your stay.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: FaShuttleVan,
    title: 'Shuttle Service',
    description: 'Free airport shuttle service for guests staying more than two days. Arranging convenient transportation to make your journey seamless.',
    color: 'from-teal-500 to-teal-600',
    highlight: true,
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold">
              <HiSparkles className="text-lg" />
              <span>Premium Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              At Addis Amba Hotel, we take pride in offering{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">personalized</span> and{' '}
              <span className="font-semibold text-purple-600 dark:text-purple-400">high-quality</span> hospitality.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-4">
              Every service is designed to make your stay{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">comfortable</span>,{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">relaxing</span>, and{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">memorable</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Icon Container */}
                  <div className="relative z-10 mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className={`text-3xl text-white`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-100/20 to-transparent dark:from-blue-900/20 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Hotel Amenities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {amenities.map((amenity, index) => {
              const IconComponent = amenity.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border ${
                    amenity.highlight 
                      ? 'border-2 border-teal-400 dark:border-teal-500 ring-2 ring-teal-200 dark:ring-teal-900/50' 
                      : 'border-gray-100 dark:border-gray-700'
                  } overflow-hidden`}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${amenity.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  {/* Icon Container */}
                  <div className="relative z-10 mb-4 flex justify-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${amenity.color} shadow-md group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="text-2xl text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {amenity.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>

                  {/* Highlight Badge */}
                  {amenity.highlight && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
                      FREE
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-800/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Experience Excellence
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Our dedicated team is committed to providing exceptional service around the clock. 
              From complimentary amenities like free parking and WiFi to our 24-hour hosting service, 
              we ensure every aspect of your stay is comfortable and convenient. For guests staying more than two days, 
              we offer complimentary airport shuttle service to make your journey seamless.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                24/7 Available
              </span>
              <span className="px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                Premium Quality
              </span>
              <span className="px-6 py-3 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full font-semibold">
                Personalized Service
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

