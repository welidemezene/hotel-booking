import Link from 'next/link';
import { BsFillSendFill, BsTelephoneOutbound } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 text-gray-200">
      {/* Map Section */}
      <div className="w-full bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-300">Hotel Location</h3>
          <div className="w-full rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700">
            <div className="relative w-full" style={{ paddingBottom: '25%', height: 0 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d230884.6291400487!2d38.8774308!3d8.9600149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8514094c46cb%3A0x8dcd7bdb1b4e17f6!2sAddis%20Amba%20Hotel%20addis%20abeba!5e1!3m2!1sen!2set!4v1762001922180!5m2!1sen!2set"
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Addis Amba Hotel Location"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start items-center gap-10 md:gap-8 text-center md:text-left">
          {/* Logo & Contact */}
          <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
            <Link href='/' className="text-2xl font-extrabold tracking-wider font-serif text-blue-300">Addis Amba Hotel</Link>
            <div className="mt-7 space-y-4">
              <p className="">Addis Ababa, Ethiopia</p>
              <div className="flex items-center justify-center md:justify-start gap-2"><BsFillSendFill /><span>info@addisambahotel.com</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><BsTelephoneOutbound /><span>+251 11 XXX XXXX</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><BiMessageDetail /><span>24/7 Customer Support</span></div>
            </div>
          </div>
          {/* Links 1 */}
          <div className="flex-1 min-w-[160px]">
            <h5 className="font-semibold text-lg mb-4 text-gray-100">Quick Links</h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/rooms">Rooms</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/booking">Book Now</Link></li>
              <li><Link href="#">Contact Us</Link></li>
            </ul>
          </div>
          {/* Links 2 */}
          <div className="flex-1 min-w-[160px]">
            <h5 className="font-semibold text-lg mb-4 text-gray-100">Services</h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/services">Room Service</Link></li>
              <li><Link href="/services">Restaurant</Link></li>
              <li><Link href="/services">Laundry</Link></li>
              <li><Link href="/services">Free Parking</Link></li>
              <li><Link href="/services">Shuttle Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4 px-4 text-center text-gray-400 text-xs border-t border-gray-700">
        © {new Date().getFullYear()} Addis Amba Hotel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
