import ClientComponent from './ClientComponent';

const heroImages = [
  '/images/hero-1.jpeg',
  '/images/hero-2.jpeg',
  '/images/hero-3.jpeg',
];

const HeroSection = () => {
  return <ClientComponent images={heroImages} />;
};

export default HeroSection;
