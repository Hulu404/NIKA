import svgPaths from "./svg-pjm1319kiy";

function Text() {
  return (
    <div className="h-[27px] relative shrink-0 w-[14.225px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[27px] left-0 text-[18px] text-white top-[-2.2px]">N</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f5a623] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[27px] relative shrink-0 w-[44.263px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#3d1f00] text-[18px] top-[-2.2px]">NIKA</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[24px] top-[24px] w-[215.2px]" data-name="Container">
      <Container1 />
      <Text1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p11678e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[103.35px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[52.5px] text-[14px] text-center text-white top-[-1.2px]">Назад к диалогу</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#f5a623] content-stretch flex gap-[12px] h-[45px] items-center left-[24px] pl-[16px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-[96px] w-[215.2px]" data-name="Button">
      <Icon />
      <Text2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-[12px] text-[#83451e] text-[12px] top-[-1.2px] tracking-[0.6px] uppercase">МЕНЮ</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[21px] left-[44px] top-[8px] w-[106.925px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[-1.2px]">Личный кабинет</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[6.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-16.68%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3235 6.65156">
            <path d={svgPaths.p26d7c600} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66407" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[6.65px] items-start left-[3.34px] top-[11.68px] w-[13.325px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[8.325px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[10%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.32499 8.325">
            <path d={svgPaths.p105e7100} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66501" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5.84px] size-[8.325px] top-[1.68px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute left-[12px] overflow-clip size-[20px] top-[8.5px]" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#f0e8d8] h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text3 />
        <Container3 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[21px] left-[44px] top-[8px] w-[101.575px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[-1.2px]">Трекер питания</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[4.29%]" data-name="Vector">
        <div className="absolute inset-[-4.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
            <path d={svgPaths.p1b2ea00} id="Vector" stroke="var(--stroke-0, #83451E)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1.25px] size-[17.5px] top-[1.25px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[7px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[10.71%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-13.64%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.50012 7.00012">
            <path d={svgPaths.p277fa40} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49996" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7px] items-start left-[9.25px] top-[5.25px] w-[4.5px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute left-[12px] overflow-clip size-[20px] top-[8.5px]" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text4 />
        <Container6 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[21px] left-[44px] top-[8px] w-[114.725px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[-1.2px]">Трекер прогресса</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[17.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[4.72%]" data-name="Vector">
        <div className="absolute inset-[-5.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6499 17.6499">
            <path d={svgPaths.p1ee90d80} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66509" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1.17px] size-[17.65px] top-[1.18px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[8.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[9.62%_17.86%]" data-name="Vector">
        <div className="absolute inset-[-11.89%_-27.8%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.65137 8.64862">
            <path d={svgPaths.p2098e980} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66209" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[8.65px] items-start left-[9.17px] top-[5.18px] w-[4.65px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute left-[12px] overflow-clip size-[20px] top-[8.5px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text5 />
        <Container9 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[21px] left-[44px] top-[8px] w-[108.713px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[-1.2px]">Дневник эмоций</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[17.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[4.72%]" data-name="Vector">
        <div className="absolute inset-[-5.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6499 17.6499">
            <path d={svgPaths.p1ee90d80} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66509" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1.17px] size-[17.65px] top-[1.18px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[3.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[22.73%_8.62%]" data-name="Vector">
        <div className="absolute inset-[-41.73%_-10.4%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.64764 3.65235">
            <path d={svgPaths.p31d9580} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66142" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col h-[3.65px] items-start left-[5.17px] top-[10.18px] w-[9.65px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[1.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[49.75%] right-[49.75%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66044 1.65211">
            <path d="M0.826057 0.826057H0.834387" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65211" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1.65px] items-start left-[6.67px] top-[6.68px] w-[1.663px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[1.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[49.75%] right-[49.75%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66043 1.65213">
            <path d="M0.826065 0.826065H0.834365" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65213" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1.65px] items-start left-[11.67px] top-[6.68px] w-[1.663px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute left-[12px] overflow-clip size-[20px] top-[8.5px]" data-name="Container">
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text6 />
        <Container12 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[21px] left-[44px] top-[8px] w-[68.938px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[-1.2px]">Настройки</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[18.3px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[4.55%_5.02%]" data-name="Vector">
        <div className="absolute inset-[-5.01%_-5.58%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5996 18.3004">
            <path d={svgPaths.p1cc12d00} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66682" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col h-[18.3px] items-start left-[1.7px] top-[0.85px] w-[16.6px]" data-name="Container">
      <Icon11 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[6.65px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.65 6.65">
            <path d={svgPaths.p3a879480} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6625" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[6.67px] size-[6.65px] top-[6.68px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute left-[12px] overflow-clip size-[20px] top-[8.5px]" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Link4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[10px] w-[215.2px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text7 />
        <Container17 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[201px] items-start relative shrink-0 w-full" data-name="Navigation">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[235px] items-start left-[24px] top-[165px] w-[215.2px]" data-name="Container">
      <Heading2 />
      <Navigation />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p14ca9100} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 10H7.5" id="Vector_2" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p38966ca0} id="Vector_3" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[39.975px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#83451e] text-[14px] text-center top-[-1.2px]">Выйти</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[37px] items-center left-[36px] pl-[12px] rounded-[10px] top-[1097px] w-[215.2px]" data-name="Button">
      <Icon13 />
      <Text8 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#faf8f0] h-[1162px] relative shrink-0 w-[264px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-r-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container />
        <Button />
        <Container2 />
        <Button1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[54px] left-0 text-[#3d1f00] text-[36px] top-[-3.6px]">Личный кабинет</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[-1.2px]">Управляйте своим профилем и настройками</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[83px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#3d1f00] text-[24px] top-[-2.4px]">Александр Иванов</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[-1.2px]">alexandr.ivanov@email.com</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[#f0e8d8] h-[40px] relative rounded-[26843500px] shrink-0 w-[94.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[16px] text-[#83451e] text-[14px] top-[8.2px]">Плавание</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#f0e8d8] h-[40px] relative rounded-[26843500px] shrink-0 w-[91.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[16px] text-[#83451e] text-[14px] top-[8.2px]">Мужской</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[16px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[117px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph1 />
      <Container24 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#83451e] text-[14px] top-[-1.2px]">Имя</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#faf8f0] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] relative size-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d1f00] text-[16px]">Александр</p>
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#83451e] text-[14px] top-[-1.2px]">Фамилия</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-[#faf8f0] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] relative size-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d1f00] text-[16px]">Иванов</p>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label1 />
      <TextInput1 />
    </div>
  );
}

function Container28() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[85px] relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#83451e] text-[14px] top-[-1.2px]">Email</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[#faf8f0] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] relative size-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d1f00] text-[16px]">alexandr.ivanov@email.com</p>
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[85px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <EmailInput />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#83451e] text-[14px] top-[-1.2px]">Вид спорта</p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-336px] size-0 top-[-575px]" data-name="Option" />;
}

function Option1() {
  return <div className="absolute left-[-336px] size-0 top-[-575px]" data-name="Option" />;
}

function Option2() {
  return <div className="absolute left-[-336px] size-0 top-[-575px]" data-name="Option" />;
}

function Option3() {
  return <div className="absolute left-[-336px] size-0 top-[-575px]" data-name="Option" />;
}

function Option4() {
  return <div className="absolute left-[-336px] size-0 top-[-575px]" data-name="Option" />;
}

function Option5() {
  return <div className="absolute left-[-336px] size-0 top-[-575px]" data-name="Option" />;
}

function Option6() {
  return <div className="absolute left-[-336px] size-0 top-[-575px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="bg-[#faf8f0] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Dropdown">
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
      <Option4 />
      <Option5 />
      <Option6 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[85px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <Dropdown />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#83451e] text-[14px] top-[-1.2px]">Пол</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#faf8f0] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[25px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[181.29px] text-[#83451e] text-[16px] text-center top-[13.8px]">Женский</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#83451e] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[25px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[180.96px] text-[#fffee7] text-[16px] text-center top-[13.8px]">Мужской</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[89px] items-start relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Container34 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#83451e] h-[56px] relative rounded-[25px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[368.54px] text-[#fffee7] text-[16px] text-center top-[13.8px]">Сохранить изменения</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[496px] items-start relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container31 />
      <Container32 />
      <Container33 />
      <Button4 />
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-white h-[709px] relative rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[32px] px-[32px] relative size-full">
        <Container23 />
        <Container27 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[30px] left-0 text-[#3d1f00] text-[20px] top-[-2.4px]">Дополнительные настройки</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[128.913px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[64px] text-[#3d1f00] text-[16px] text-center top-[-2.2px]">Изменить пароль</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[56px] relative rounded-[15px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Text9 />
          <Icon14 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[110.325px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[55px] text-[#3d1f00] text-[16px] text-center top-[-2.2px]">О приложении</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[56px] relative rounded-[15px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Text10 />
          <Icon15 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[124px] items-start relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-white h-[242px] relative rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[32px] px-[32px] relative size-full">
        <Heading3 />
        <Container36 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[1098px] items-start relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
      <Container35 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] h-[1162px] min-h-px min-w-px relative" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[32px] px-[40px] relative size-full">
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function PQ() {
  return (
    <div className="bg-[#fffee7] content-stretch flex h-[1162px] items-start relative shrink-0 w-full" data-name="pQ">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="личный кабинет">
      <PQ />
    </div>
  );
}