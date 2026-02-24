import { NavLink } from "react-router";
import imgImage2 from "./assets/23ab7528e0cbc70eec16bb3be67f5d33b9e64433.png";

const isUserLoged = () => {
  return true
}

export default function MainPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#fffee7] flex items-center justify-center px-6 py-12">
      {/* Main Container */}
      <div className="w-full max-w-[600px] flex flex-col items-center">
        
        {/* Goddess Illustration */}
        <div className="relative w-full max-w-[360px] h-[280px] sm:h-[320px] mb-8 sm:mb-12 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center overflow-visible">
            <img 
              alt="Greek goddess with laurel wreath" 
              className="w-[150%] h-auto max-w-none object-contain"
              src={imgImage2} 
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
          <h1 className="text-[#3d1f00] text-[80px] sm:text-[120px] md:text-[160px] leading-none tracking-[0.015em] font-bold text-center">
            NIKA
          </h1>
          <p className="text-[#83451e] text-[16px] sm:text-[18px] leading-[24px] text-center max-w-[400px]">
            AI-ассистент для спортсменов
          </p>
        </div>

        {/* Start Button */}
        <NavLink to={ isUserLoged() ? '/chat' : '/registration'} className="w-full max-w-[340px]">
        <button
          onClick={() => console.log('Navigate to app')}
          className="w-full max-w-[340px] bg-[rgba(217,217,217,0.2)] hover:bg-[rgba(189,145,97,0.25)] text-[#83451e] text-[18px] sm:text-[20px] leading-[24px] h-[65px] rounded-[32.5px] transition-all flex items-center justify-center shadow-sm hover:shadow-md"
        >
          Начать
        </button>
        </NavLink>

        {/* FAQ Link */}
        <div className="mt-8 sm:mt-10">
          <NavLink to='/FAQ'>
            <span  className="text-[#3d1f00] text-[13px] sm:text-[14px] leading-[20px] underline decoration-1 underline-offset-2 hover:text-[#83451e] transition-colors">
             FAQs
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
