import HeroBanner from "../components/LandingPage/HeroBanner";
import Description from "../components/LandingPage/Description";

export default function Index() {
  return (
    <>
      <div className="bg-landing-page bg-no-repeat bg-cover bg-left-top h-screen -mt-16">
        <HeroBanner />
        <Description />
      </div>
    </>
  );
}
