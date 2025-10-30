import Link from 'next/link';
import { BsFillSendFill, BsTelephoneOutbound } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 text-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start items-center gap-10 md:gap-8 text-center md:text-left">
          {/* Logo & Contact */}
          <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
            <Link href='/' className="text-2xl font-extrabold tracking-wider font-serif text-blue-300">Addis Amba</Link>
            <div className="mt-7 space-y-4">
              <p className="">123 Elegant Road, City, Country</p>
              <div className="flex items-center justify-center md:justify-start gap-2"><BsFillSendFill /><span>info@luxevue.com</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><BsTelephoneOutbound /><span>+123-456-7890</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><BiMessageDetail /><span>Contact Support</span></div>
            </div>
          </div>
          {/* Links 1 */}
          <div className="flex-1 min-w-[160px]">
            <h5 className="font-semibold text-lg mb-4 text-gray-100">About</h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#">Our Story</Link></li>
              <li><Link href="#">Get in Touch</Link></li>
              <li><Link href="#">Privacy Commitment</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Assistance</Link></li>
            </ul>
          </div>
          {/* Links 2 */}
          <div className="flex-1 min-w-[160px]">
            <h5 className="font-semibold text-lg mb-4 text-gray-100">Amenities</h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#">Dining Experience</Link></li>
              <li><Link href="#">Wellness</Link></li>
              <li><Link href="#">Fitness</Link></li>
              <li><Link href="#">Sports</Link></li>
              <li><Link href="#">Events</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4 px-4 text-center text-gray-400 text-xs border-t border-gray-700">
        © {new Date().getFullYear()} Luxe Vue Hotel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
