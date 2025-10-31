'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import ThemeContext from '@/context/themeContext';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Room' },
];

const lightLogo = (
  <span className="text-3xl font-extrabold tracking-wider text-blue-300 font-serif drop-shadow-lg">Addis Amba</span>
  // Swap with <Image src="/logo-light.svg" ... /> if you have an alternate logo image
);
const darkLogo = (
  <span className="text-3xl font-extrabold tracking-wider text-blue-100 font-serif drop-shadow-lg">Addis Amba</span>
  // Swap with <Image src="/logo-dark.svg" ... /> if you have an alternate logo image
);

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const { darkTheme, setDarkTheme } = themeContext || { darkTheme: false, setDarkTheme: () => {} };
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-6 px-4 relative">
        {/* LEFT: Logo */}
        <div className="hidden md:flex items-center md:ml-2 justify-start md:min-w-[170px]">
          <Link href="/" prefetch={true}>
            <span aria-label="Addis Amba Logo">{darkTheme ? darkLogo : lightLogo}</span>
          </Link>
        </div>

        {/* CENTER: Nav links - desktop only */}
        {/* <div className="hidden md:flex flex-1 justify-center items-center">
          <ul className="flex gap-9 font-semibold text-gray-700 dark:text-gray-200 text-lg">
            {NAV_LINKS.map(link => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div> */}

        {/* RIGHT: Theme, Account, Book Now - desktop only */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-5">
          {/* Home and Room links */}
          <ul className="flex gap-6 font-semibold text-gray-700 dark:text-blue-100 text-lg">
            <li><Link href="/" prefetch={true}>Home</Link></li>
            <li><Link href="/rooms" prefetch={true}>Room</Link></li>
          </ul>
          {/* Account button: icon/image + 'Account' */}
          <Link href={session?.user ? `/users/${session.user.id}` : '/auth'} prefetch={true}>
            <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-900/60 hover:bg-blue-700 text-gray-100 font-semibold shadow transition">
              {session?.user?.image ? (
                <Image src={session.user.image} alt={session.user.name ?? 'Account'} width={32} height={32} className="w-8 h-8 rounded-full border-2 border-blue-600" />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
              <span>Account</span>
            </button>
          </Link>
          {/* Theme toggle */}
          <span>
            {darkTheme ? (
              <MdOutlineLightMode className="cursor-pointer hover:text-blue-400" aria-label="Light theme" onClick={() => { setDarkTheme(false); localStorage.removeItem('hotel-theme'); }} />
            ) : (
              <MdDarkMode className="cursor-pointer hover:text-blue-300" aria-label="Dark theme" onClick={() => { setDarkTheme(true); localStorage.setItem('hotel-theme', 'true'); }} />
            )}
          </span>
          {/* Book Now at right */}
          <Link href="/booking" prefetch={true}>
            <button className="ml-1 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-7 py-2 rounded-full shadow-lg text-base whitespace-nowrap">Book Now</button>
          </Link>
        </div>

        {/* Mobile: only logo and hamburger visible */}
        <div className="flex md:hidden flex-1 items-center justify-between w-full">
          <Link href="/" prefetch={true} aria-label="Addis Amba Logo">{darkTheme ? darkLogo : lightLogo}</Link>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <FaBars className="text-2xl text-blue-600" />
          </button>
        </div>
        {/* Slide-in mobile menu (overlay) */}
        <div
          className={
            `fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl transform ` +
            `${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out z-[9999] flex flex-col`
          }
          style={{ transitionProperty: 'transform' }}
        >
          {/* Header: Account/Theme on left, Close button on right */}
          <div className="flex justify-between items-center px-5 py-6 border-b border-gray-300 dark:border-gray-700">
            {/* Top Left: Account and Theme Toggle */}
            <div className="flex items-center gap-3">
              {/* Account */}
              {session?.user ? (
                <Link href={`/users/${session.user.id}`} prefetch={true} onClick={() => setMenuOpen(false)}>
                  {session.user.image ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600">
                      <Image src={session.user.image} alt={session.user.name!} width={40} height={40} />
                    </div>
                  ) : (
                    <FaUserCircle className="text-2xl text-blue-600 cursor-pointer" />
                  )}
                </Link>
              ) : (
                <Link href="/auth" prefetch={true} onClick={() => setMenuOpen(false)}>
                  <FaUserCircle className="text-2xl text-blue-600 cursor-pointer" />
                </Link>
              )}
              {/* Theme Toggle */}
              {darkTheme ? (
                <MdOutlineLightMode 
                  className="cursor-pointer text-2xl text-blue-600 hover:text-blue-400" 
                  aria-label="Light theme" 
                  onClick={() => { setDarkTheme(false); localStorage.removeItem('hotel-theme'); }} 
                />
              ) : (
                <MdDarkMode 
                  className="cursor-pointer text-2xl text-blue-600 hover:text-blue-300" 
                  aria-label="Dark theme" 
                  onClick={() => { setDarkTheme(true); localStorage.setItem('hotel-theme', 'true'); }} 
                />
              )}
            </div>
            {/* Top Right: Close Button */}
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <FaTimes className="text-2xl text-blue-600" />
            </button>
          </div>
          {/* Navigation Links */}
          <ul className="flex flex-col mt-10 gap-6 px-7 font-semibold text-lg">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href} prefetch={true} onClick={() => setMenuOpen(false)}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/booking" prefetch={true} onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-0 py-3 rounded-full shadow-lg text-base font-bold">Book Now</button>
              </Link>
            </li>
          </ul>
        </div>
        {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/30 z-[9990] transition-opacity"></div>}
      </nav>
    </header>
  );
};

export default Header;
