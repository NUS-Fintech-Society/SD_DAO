import Description from "../components/LandingPage/Description";
import HeroBanner from "../components/LandingPage/HeroBanner";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <div className="bg-landing-page bg-no-repeat bg-cover bg-left-top h-screen -mt-16">
        <Link href="/">
          <img
            src="/fintech_logo.png"
            alt="Fintech Logo"
            className="cursor-pointer max-w-20vw top-5vh fixed"
          />
        </Link>
        <HeroBanner />
        <Description />
      </div>
    </>
  );
}
