import svgPaths from "./svg-tyd27m3zhp";

function AndroidWifi4BarOff() {
  return (
    <div className="absolute left-[143px] size-[38px] top-[20px]" data-name="android_wifi_4_bar_off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="android_wifi_4_bar_off">
          <mask height="38" id="mask0_1_321" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="38" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="38" id="Bounding box" width="38" />
          </mask>
          <g mask="url(#mask0_1_321)">
            <path d={svgPaths.p1a012c00} fill="var(--fill-0, #C00F0C)" id="android_wifi_4_bar_off_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowBack() {
  return (
    <div className="absolute left-[135px] size-[15px] top-[230px]" data-name="arrow_back">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="arrow_back">
          <mask height="15" id="mask0_1_317" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="15" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="15" id="Bounding box" width="15" />
          </mask>
          <g mask="url(#mask0_1_317)">
            <path d={svgPaths.p3097a570} fill="var(--fill-0, #1C1B1F)" id="arrow_back_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="экран ошибки">
      <div className="absolute bg-white h-[285px] left-0 rounded-[31px] top-0 w-[324px]" data-name="окно ошибки" />
      <AndroidWifi4BarOff />
      <p className="-translate-x-1/2 absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%+5.5px)] text-[#c00f0c] text-[16px] text-center top-[58px] w-[171px] whitespace-pre-wrap">Ошибка подключения</p>
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[22px] text-[12px] text-black top-[107px] w-[279px] whitespace-pre-wrap">Проверьте соединение с интернетом и попробуйте снова.</p>
      <div className="absolute bg-[rgba(58,90,155,0.35)] h-[49px] left-[22px] rounded-[24.5px] top-[153px] w-[279px]" data-name="Rounded rectangle" />
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[100px] text-[12px] text-white top-[170px]">Попробовать снова</p>
      <div className="absolute border border-[#808080] border-solid h-[49px] left-[22px] rounded-[24.5px] top-[213px] w-[279px]" data-name="Rounded rectangle" />
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[158px] text-[12px] text-black top-[230px]">Назад</p>
      <ArrowBack />
    </div>
  );
}