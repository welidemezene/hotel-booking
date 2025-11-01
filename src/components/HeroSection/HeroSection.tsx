import ClientComponent from './ClientComponent';

const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
];

const HeroSection = () => {
  return <ClientComponent images={heroImages} />;
};

export default HeroSection;
