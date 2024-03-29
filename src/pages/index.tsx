import Description from "../components/LandingPage/Description";
import HeroBanner from "../components/LandingPage/HeroBanner";

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
