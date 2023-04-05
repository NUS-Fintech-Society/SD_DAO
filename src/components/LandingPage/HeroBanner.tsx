export default function HeroBanner() {
  return (
    <div className="text-center py-8 font-chakraPetch">
      <div className="text-6xl pt-20 text-black">NUS FinTech Society</div>
      <a
        href="https://fintechsociety.comp.nus.edu.sg/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="font-MSGothic text-base bg-fintech-yellow rounded-2xl font-semibold text-black pt-1.5 pb-1.5 pl-5 pr-5 mt-16 hover:bg-yellow-400 transition-all">
          Know More
        </button>
      </a>
    </div>
  );
}
