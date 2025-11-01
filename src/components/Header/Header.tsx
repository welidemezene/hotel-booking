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
  { href: '/services', label: 'Services' },
];

const logo = (
  <span className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-serif hover:scale-105 transition-transform duration-300">
    Addis Amba
  </span>
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
          <Link href="/" prefetch={true} className="group">
            <span aria-label="Addis Amba Logo" className="relative">
              {logo}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
            </span>
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
          {/* Home, Room, and Services links */}
          <ul className="flex gap-6 font-semibold text-gray-700 dark:text-blue-100 text-lg">
            <li><Link href="/" prefetch={true}>Home</Link></li>
            <li><Link href="/rooms" prefetch={true}>Room</Link></li>
            <li><Link href="/services" prefetch={true}>Services</Link></li>
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
          <Link href="/" prefetch={true} aria-label="Addis Amba Logo" className="group">
            <span className="relative">
              {logo}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
            </span>
          </Link>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <FaBars className="text-2xl text-blue-600 dark:text-blue-400" />
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
          {/* Only show close icon, no logo here! */}
          <div className="flex justify-end items-center px-5 py-6 border-b border-gray-300 dark:border-gray-700">
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><FaTimes className="text-2xl text-blue-600" /></button>
          </div>
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
          <div className="px-7 pt-12 flex gap-4 text-2xl text-gray-600 dark:text-blue-100 mt-auto">
            {/* Theme toggle */}
            <span>{darkTheme ? (
              <MdOutlineLightMode className="cursor-pointer hover:text-blue-400" aria-label="Light theme" onClick={() => { setDarkTheme(false); localStorage.removeItem('hotel-theme'); }} />
            ) : (
              <MdDarkMode className="cursor-pointer hover:text-blue-300" aria-label="Dark theme" onClick={() => { setDarkTheme(true); localStorage.setItem('hotel-theme', 'true'); }} />
            )}</span>
            {/* Account/Profile */}
            <span>{session?.user ? (
              <Link href={`/users/${session.user.id}`} prefetch={true}>{session.user.image ? (
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-600"><Image src={session.user.image} alt={session.user.name!} width={36} height={36} /></div>
              ) : (<FaUserCircle className="cursor-pointer hover:text-blue-400" />)}</Link>
            ) : <Link href="/auth" prefetch={true}><FaUserCircle className="cursor-pointer hover:text-blue-400" /></Link>}</span>
          </div>
        </div>
        {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/30 z-[9990] transition-opacity"></div>}
      </nav>
    </header>
  );
};

export default Header;
