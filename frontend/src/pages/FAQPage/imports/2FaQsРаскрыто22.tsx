import svgPaths from "./svg-hirimehrbo";
import { imgPlus } from "./svg-juzt9";

function Settings() {
  return (
    <div className="absolute left-[1379px] size-[32px] top-[817px]" data-name="Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_128)" id="Settings">
          <g id="Icon">
            <path d={svgPaths.p34392700} stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            <path d={svgPaths.p3a531880} stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_128">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute h-[21px] left-[17px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[19px_813px] mask-size-[68px_68px] top-[-10px] w-[22px]" data-name="Plus" style={{ maskImage: `url('${imgPlus}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21">
        <g id="Plus">
          <path d={svgPaths.p16532f00} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function MenuOpen() {
  return (
    <div className="absolute left-[156px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-120px_814px] mask-size-[68px_68px] size-[24px] top-[-11px]" data-name="menu_open" style={{ maskImage: `url('${imgPlus}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu_open">
          <mask height="24" id="mask0_1_115" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_115)">
            <path d={svgPaths.p305ba600} fill="var(--fill-0, #F6B044)" id="menu_open_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[-27px] top-[-52px]">
      <div className="absolute backdrop-blur-[15px] bg-[rgba(255,255,255,0.6)] h-[521px] left-[-27px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[63px_855px] mask-size-[68px_68px] rounded-[15px] top-[-52px] w-[224px]" style={{ maskImage: `url('${imgPlus}')` }} />
      <div className="absolute bg-[#f6b044] h-[31px] left-[13px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[23px_818px] mask-size-[68px_68px] rounded-[12px] top-[-15px] w-[125px]" style={{ maskImage: `url('${imgPlus}')` }} />
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[44px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_813px] mask-size-[68px_68px] text-[16px] text-white top-[-10px] tracking-[0.24px]" style={{ maskImage: `url('${imgPlus}')` }}>{` Новый чат`}</p>
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal h-[94px] leading-[normal] left-[13px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[23px_732px] mask-size-[68px_68px] text-[#5a6444] text-[14px] top-[71px] w-[196px] whitespace-pre-wrap" style={{ maskImage: `url('${imgPlus}')` }}>
        <p className="mb-0">Трекер прогресса</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Упражнения</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Дневник питания</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p>FAQs</p>
      </div>
      <Plus />
      <MenuOpen />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[rgba(23,23,23,0)] h-[900px] left-0 top-[-1px] w-[1440px]" data-name="мейн экран оранж">
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[943px] text-[16px] text-white top-[389px] tracking-[0.24px]">Бег</p>
      <Settings />
      <div className="absolute left-[60px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-24px_-12px] mask-size-[68px_68px] size-[20px] top-[815px]" style={{ maskImage: `url('${imgPlus}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <circle cx="10" cy="10" fill="var(--fill-0, #4B5563)" id="Ellipse 2" r="10" />
        </svg>
      </div>
      <div className="absolute left-[50px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14px_-37px] mask-size-[68px_68px] size-[40px] top-[840px]" style={{ maskImage: `url('${imgPlus}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #4B5563)" id="Ellipse 3" r="20" />
        </svg>
      </div>
      <div className="absolute bg-[#d9d9d9] h-[28px] left-[19px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[17px_653px] mask-size-[68px_68px] top-[150px] w-[165px]" style={{ maskImage: `url('${imgPlus}')` }} />
      <Group3 />
    </div>
  );
}

function Plus1() {
  return (
    <div className="absolute h-[21px] left-[22px] top-[152px] w-[22px]" data-name="Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21">
        <g id="Plus">
          <path d={svgPaths.p16532f00} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function MenuOpen1() {
  return (
    <div className="absolute left-[161px] size-[24px] top-[151px]" data-name="menu_open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu_open">
          <mask height="24" id="mask0_1_115" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_115)">
            <path d={svgPaths.p305ba600} fill="var(--fill-0, #F6B044)" id="menu_open_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[-22px] top-[110px]">
      <div className="absolute backdrop-blur-[15px] bg-[rgba(255,255,255,0.6)] h-[521px] left-[-22px] rounded-[15px] top-[110px] w-[224px]" />
      <div className="absolute bg-[#f6b044] h-[31px] left-[18px] rounded-[12px] top-[147px] w-[125px]" />
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[49px] text-[16px] text-white top-[152px] tracking-[0.24px]">{` Новый чат`}</p>
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal h-[94px] leading-[normal] left-[18px] text-[#5a6444] text-[14px] top-[233px] w-[196px] whitespace-pre-wrap">
        <p className="mb-0">Трекер прогресса</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Упражнения</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Дневник питания</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p>FAQs</p>
      </div>
      <Plus1 />
      <MenuOpen1 />
    </div>
  );
}

function Plus2() {
  return (
    <div className="absolute left-[270px] size-[40px] top-[714px]" data-name="Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Plus" />
      </svg>
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="absolute left-[1068px] size-[24px] top-[186px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_133)">
            <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_2" />
            <g id="keyboard_arrow_down_3">
              <mask height="24" id="mask1_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
                <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box_2" width="24" />
              </mask>
              <g mask="url(#mask1_1_133)">
                <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_4" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function KeyboardArrowDown1() {
  return (
    <div className="absolute left-[1068px] size-[24px] top-[299.46px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_133)">
            <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_2" />
            <g id="keyboard_arrow_down_3">
              <mask height="24" id="mask1_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
                <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box_2" width="24" />
              </mask>
              <g mask="url(#mask1_1_133)">
                <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_4" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function KeyboardArrowDown2() {
  return (
    <div className="absolute left-[1068px] size-[24px] top-[462px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_1_455" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_455)">
            <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #374151)" id="keyboard_arrow_down_2" />
            <g id="keyboard_arrow_down_3">
              <mask height="24" id="mask1_1_455" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
                <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box_2" width="24" />
              </mask>
              <g mask="url(#mask1_1_455)">
                <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_4" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function KeyboardArrowDown3() {
  return (
    <div className="absolute left-[1068px] size-[24px] top-[581.25px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_133)">
            <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_2" />
            <g id="keyboard_arrow_down_3">
              <mask height="24" id="mask1_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
                <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box_2" width="24" />
              </mask>
              <g mask="url(#mask1_1_133)">
                <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_4" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function KeyboardArrowDown4() {
  return (
    <div className="absolute left-[1068px] size-[24px] top-[707.5px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_133)">
            <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_2" />
            <g id="keyboard_arrow_down_3">
              <mask height="24" id="mask1_1_133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
                <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box_2" width="24" />
              </mask>
              <g mask="url(#mask1_1_133)">
                <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #F6B044)" id="keyboard_arrow_down_4" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[310px] top-[299.46px]">
      <div className="absolute h-0 left-[310px] top-[807px] w-[816.001px]">
        <div className="absolute inset-[-2px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 816.001 2">
            <line id="Line 10" stroke="var(--stroke-0, #F3F4F6)" strokeWidth="2" x2="816.001" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[343px] text-[#2d3625] text-[18px] top-[299.46px]">Сколько стоит использование НИКИ?</p>
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[343px] text-[#2d3625] text-[18px] top-[458px]">Можно ли отменить подписку?</p>
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[343px] text-[#2d3625] text-[18px] top-[576px]">Как защищены мои данные?</p>
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[343px] text-[#2d3625] text-[18px] top-[706.5px]">Где доступна НИКА?</p>
      <KeyboardArrowDown1 />
      <KeyboardArrowDown2 />
      <KeyboardArrowDown3 />
      <KeyboardArrowDown4 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[310px] top-[186px]">
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[343px] text-[#2d3625] text-[18px] top-[186px]">Нужно ли специальное оборудование?</p>
      <KeyboardArrowDown />
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[310px] top-[111px]">
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[93px] left-[332px] rounded-[15px] top-[178px] w-[777px]">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[16px] shadow-[0px_4px_15px_0px_rgba(61,43,31,0.05)]" />
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[135px] left-[332px] rounded-[15px] top-[290px] w-[777px]">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[16px] shadow-[0px_4px_15px_0px_rgba(61,43,31,0.05)]" />
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[102px] left-[332px] rounded-[15px] top-[449px] w-[777px]">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[16px] shadow-[0px_4px_15px_0px_rgba(61,43,31,0.05)]" />
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[107px] left-[331px] rounded-[15px] top-[571px] w-[777px]">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[16px] shadow-[0px_4px_15px_0px_rgba(61,43,31,0.05)]" />
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[93px] left-[331px] rounded-[15px] top-[696px] w-[777px]">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[16px] shadow-[0px_4px_15px_0px_rgba(61,43,31,0.05)]" />
      </div>
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[343px] text-[#5a6444] text-[16px] top-[234px] w-[725px] whitespace-pre-wrap">Нет. Для работы с НИКОЙ достаточно смартфона и доступа к интернету.</p>
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[343px] text-[#5a6444] text-[16px] top-[350px] w-[725px] whitespace-pre-wrap">
        <p className="mb-0">У НИКИ есть бесплатная версия с базовым функционалом.</p>
        <p>Также доступна платная подписка с расширенными возможностями, персонализацией и дополнительными сценариями использования. Актуальные условия всегда указаны на сайте.</p>
      </div>
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[343px] text-[#5a6444] text-[16px] top-[494px] w-[725px] whitespace-pre-wrap">Да. Подписку можно отменить в любой момент через личный кабинет. После отмены платный функционал будет доступен до конца оплаченного периода.</p>
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[343px] text-[#5a6444] text-[16px] top-[603px] w-[725px] whitespace-pre-wrap">{`Мы уделяем особое внимание безопасности и конфиденциальности. Все данные пользователей хранятся и обрабатываются в соответствии с действующим законодательством РФ. `}</p>
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[343px] text-[#5a6444] text-[16px] top-[749px] w-[725px] whitespace-pre-wrap">На первом этапе НИКА доступна в формате веб-сервиса через сайт.</p>
      <Group />
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[310px] text-[#2d3625] text-[32px] top-[111px] w-[1004px] whitespace-pre-wrap">Часто задаваемые вопросы</p>
    </div>
  );
}

export default function Component2FaQs() {
  return (
    <div className="bg-[#faf7ec] relative size-full" data-name="2 FAQs раскрыто 2/2">
      <Component />
      <Group4 />
      <Plus2 />
      <Group2 />
    </div>
  );
}