import Description from '../components/LandingPage/Description';
import HeroBanner from '../components/LandingPage/HeroBanner';

export default function Index() {
  return (
    <>
      <div className='absolute top-0 left-0 bg-landing-page bg-no-repeat bg-cover w-full h-screen z-[-1]'>
        <HeroBanner />
        <Description />
      </div>
    </>
  );
}
