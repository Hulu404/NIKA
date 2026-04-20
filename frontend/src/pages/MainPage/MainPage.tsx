import { NavLink } from "react-router";
import imgImage2 from "./assets/23ab7528e0cbc70eec16bb3be67f5d33b9e64433.png";

const isUserLoged = () => {
  return true
}

export default function MainPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#fffee7] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-12 overflow-x-hidden">
      {/* Main Container */}
      <div className="w-full max-w-[600px] flex flex-col items-center">

        {/* Goddess Illustration */}
        <div className="relative w-full max-w-[280px] sm:max-w-[360px] h-[200px] sm:h-[320px] mb-4 sm:mb-12 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img
              alt="Greek goddess with laurel wreath"
              className="w-[120%] sm:w-[150%] h-auto max-w-none object-contain"
              src={imgImage2}
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2 sm:gap-4 mb-6 sm:mb-16">
          <h1 className="text-[#3d1f00] text-[50px] xs:text-[70px] sm:text-[120px] md:text-[160px] leading-none tracking-[0.015em] font-bold text-center">
            NIKA
          </h1>
          <p className="text-[#83451e] text-[14px] sm:text-[18px] leading-relaxed text-center max-w-[400px] px-4">
            AI-ассистент для спортсменов
          </p>
        </div>

        {/* Start Button */}
        <NavLink to={ isUserLoged() ? '/chat' : '/registration'} className="w-full max-w-[300px] sm:max-w-[340px]">
          <button
            onClick={() => console.log('Navigate to app')}
            className="w-full bg-[rgba(217,217,217,0.2)] hover:bg-[rgba(189,145,97,0.25)] text-[#83451e] text-[16px] sm:text-[20px] leading-[24px] h-[55px] sm:h-[65px] rounded-[32.5px] transition-all flex items-center justify-center shadow-sm hover:shadow-md"
          >
            Начать
          </button>
        </NavLink>

        {/* Links Container */}
        <div className="mt-6 sm:mt-10 flex flex-col items-center gap-2 sm:gap-3 px-4">
          <NavLink to='/FAQ'>
            <span className="text-[#3d1f00] text-[12px] sm:text-[14px] leading-tight underline decoration-1 underline-offset-2 hover:text-[#83451e] transition-colors">
              FAQs
            </span>
          </NavLink>
          <NavLink to="/policy">
            <span className="text-[#3d1f00] text-[12px] sm:text-[14px] leading-tight underline decoration-1 underline-offset-2 hover:text-[#83451e] transition-colors text-center">
              Политика конфиденциальности и Публичная оферта
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
