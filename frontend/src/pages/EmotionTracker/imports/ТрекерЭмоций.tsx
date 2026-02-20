import svgPaths from "./svg-n101rx8ak0";

function Text() {
  return (
    <div className="h-[27px] relative shrink-0 w-[13.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[27px] left-0 text-[18px] text-white top-[-2.2px]">N</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f5a623] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.012px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[27px] relative shrink-0 w-[42.138px]" data-name="Text">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p11678e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[107.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[54.5px] text-[14px] text-center text-white top-[-1.2px]">Назад к диалогу</p>
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

function Paragraph() {
  return (
    <div className="absolute h-[18px] left-[12px] top-[-1.2px] w-[41.2px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#83451e] text-[12px] top-[-0.4px] tracking-[0.6px] uppercase">МЕНЮ</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute contents inset-[12.5%_20.83%]" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 6.66667">
            <path d={svgPaths.p18dfb480} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector_2">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.3333 8.33334">
            <path d={svgPaths.p9a07d80} id="Vector_2" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Личный кабинет</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[1.588px] pt-[-1.2px] top-[8px] w-[106.925px]" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute contents inset-[10%]" data-name="Icon">
      <div className="absolute inset-[10%]" data-name="Vector">
        <div className="absolute inset-[-4.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
            <path d={svgPaths.p1b2ea00} id="Vector" stroke="var(--stroke-0, #83451E)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[42.5%] left-1/2 right-[35%] top-[30%]" data-name="Vector_2">
        <div className="absolute inset-[-13.64%_-25.01%_-13.64%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.50016 7.00016">
            <path d="M0.75 0.75V4.75L3.75 6.25" id="Vector_2" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon4 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[21px] left-[44px] top-[8px] w-[101.662px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Трекер питания</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#f0e8d8] h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container9 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute contents inset-[10%]" data-name="Icon">
      <div className="absolute inset-[10%]" data-name="Vector">
        <div className="absolute inset-[-5.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
            <path d={svgPaths.p8bb5780} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[35%] left-1/2 right-[35%] top-[30%]" data-name="Vector">
        <div className="absolute inset-[-11.9%_-27.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 8.66667">
            <path d={svgPaths.p2b744180} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon6 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Трекер прогресса</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[-114.713px] pt-[-1.2px] top-[8px] w-0" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute contents inset-[10%]" data-name="Icon">
      <div className="absolute inset-[10%]" data-name="Vector">
        <div className="absolute inset-[-5.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
            <path d={svgPaths.p8bb5780} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[55%_30%_35%_30%]" data-name="Vector">
        <div className="absolute inset-[-41.67%_-10.42%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66677 3.66672">
            <path d={svgPaths.p1f71cf00} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.46%_62.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.675 1.66667">
            <path d="M0.833335 0.833335H0.841665" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_37.46%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.67497 1.66667">
            <path d="M0.833335 0.833335H0.841635" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon8 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Дневник эмоций</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[-106.225px] pt-[-1.2px] top-[8px] w-0" data-name="Container">
      <Paragraph4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container15 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute contents inset-[8.41%_12.68%]" data-name="Icon">
      <div className="absolute inset-[8.41%_12.68%]" data-name="Vector">
        <div className="absolute inset-[-5.01%_-5.58%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5939 18.3035">
            <path d={svgPaths.p33ad6400} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector_2">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p3d26e2c0} id="Vector_2" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon10 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Настройки</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[0.287px] pt-[-1.2px] top-[8px] w-[68.938px]" data-name="Container">
      <Paragraph5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[10px] w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container19 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[201px] items-start left-0 top-[34px] w-[215.2px]" data-name="Container">
      <Container4 />
      <Container8 />
      <Container10 />
      <Container14 />
      <Container18 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[235px] left-[24px] top-[165px] w-[215.2px]" data-name="Container">
      <Paragraph />
      <Container3 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p14ca9100} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 10H7.5" id="Vector_2" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p38966ca0} id="Vector_3" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
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
    <div className="absolute content-stretch flex gap-[12px] h-[37px] items-center left-[24px] pl-[12px] rounded-[10px] top-[850.88px] w-[215.2px]" data-name="Button">
      <Icon11 />
      <Text3 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#faf8f0] h-[911.875px] relative shrink-0 w-[264px]" data-name="Sidebar">
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
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[48px] left-0 text-[#3d1f00] text-[32px] top-[-2.6px]">Дневник эмоций</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#83451e] text-[16px] top-[-2.2px]">Отслеживайте свое эмоциональное состояние каждый день</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[80px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph6 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M12.5 15L7.5 10L12.5 5" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#faf8f0] relative rounded-[26843500px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[141.85px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#3d1f00] text-[24px] top-[-2.4px]">Январь 2026</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#faf8f0] relative rounded-[26843500px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Heading1 />
      <Button3 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[100.563px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[49.98px] text-[#83451e] text-[14px] text-center top-[6.8px]">Пн</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[37px] left-[108.56px] top-0 w-[100.575px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[50.04px] text-[#83451e] text-[14px] text-center top-[6.8px]">Вт</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[37px] left-[217.14px] top-0 w-[100.575px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[50.71px] text-[#83451e] text-[14px] text-center top-[6.8px]">Ср</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[37px] left-[325.71px] top-0 w-[100.563px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[50.42px] text-[#83451e] text-[14px] text-center top-[6.8px]">Чт</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[37px] left-[434.28px] top-0 w-[100.575px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[50.61px] text-[#83451e] text-[14px] text-center top-[6.8px]">Пт</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[37px] left-[542.85px] top-0 w-[100.575px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[50.29px] text-[#83451e] text-[14px] text-center top-[6.8px]">Сб</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[37px] left-[651.42px] top-0 w-[100.575px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[51.26px] text-[#83451e] text-[14px] text-center top-[6.8px]">Вс</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return <div className="absolute left-0 size-[100.563px] top-0" data-name="Container" />;
}

function Container36() {
  return <div className="absolute left-[108.56px] size-[100.575px] top-0" data-name="Container" />;
}

function Container37() {
  return <div className="absolute left-[217.14px] size-[100.575px] top-0" data-name="Container" />;
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">1</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[325.71px] pb-[4.013px] rounded-[15px] size-[100.563px] top-0" data-name="Button">
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">2</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[434.28px] pb-[4px] rounded-[15px] size-[100.575px] top-0" data-name="Button">
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">3</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[542.85px] pb-[4px] rounded-[15px] size-[100.575px] top-0" data-name="Button">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">4</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[651.42px] pb-[4px] rounded-[15px] size-[100.575px] top-0" data-name="Button">
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">5</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 pb-[4.013px] rounded-[15px] size-[100.563px] top-[108.58px]" data-name="Button">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">6</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[108.56px] pb-[4px] rounded-[15px] size-[100.575px] top-[108.58px]" data-name="Button">
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">7</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[217.14px] pb-[4px] rounded-[15px] size-[100.575px] top-[108.58px]" data-name="Button">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">8</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[325.71px] pb-[4.013px] rounded-[15px] size-[100.563px] top-[108.58px]" data-name="Button">
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[4.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">9</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[434.28px] pb-[4px] rounded-[15px] size-[100.575px] top-[108.58px]" data-name="Button">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">10</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[542.85px] pb-[4px] rounded-[15px] size-[100.575px] top-[108.58px]" data-name="Button">
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9.5px] text-[#83451e] text-[16px] text-center top-[-2.2px]">11</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[651.42px] pb-[4px] rounded-[15px] size-[100.575px] top-[108.58px]" data-name="Button">
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">12</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 pb-[4.013px] rounded-[15px] size-[100.563px] top-[217.15px]" data-name="Button">
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">13</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[108.56px] pb-[4px] rounded-[15px] size-[100.575px] top-[217.15px]" data-name="Button">
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">14</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[217.14px] pb-[4px] rounded-[15px] size-[100.575px] top-[217.15px]" data-name="Button">
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">15</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[325.71px] pb-[4.013px] rounded-[15px] size-[100.563px] top-[217.15px]" data-name="Button">
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">16</p>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[434.28px] pb-[4px] rounded-[15px] size-[100.575px] top-[217.15px]" data-name="Button">
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">17</p>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[542.85px] pb-[4px] rounded-[15px] size-[100.575px] top-[217.15px]" data-name="Button">
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">18</p>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[651.42px] pb-[4px] rounded-[15px] size-[100.575px] top-[217.15px]" data-name="Button">
      <Text21 />
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">19</p>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 pb-[4.013px] rounded-[15px] size-[100.563px] top-[325.73px]" data-name="Button">
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">20</p>
      </div>
    </div>
  );
}

function Button23() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[108.56px] pb-[4px] rounded-[15px] size-[100.575px] top-[325.73px]" data-name="Button">
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">21</p>
      </div>
    </div>
  );
}

function Button24() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[217.14px] pb-[4px] rounded-[15px] size-[100.575px] top-[325.73px]" data-name="Button">
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">22</p>
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[325.71px] pb-[4.013px] rounded-[15px] size-[100.563px] top-[325.73px]" data-name="Button">
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">23</p>
      </div>
    </div>
  );
}

function Button26() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[434.28px] pb-[4px] rounded-[15px] size-[100.575px] top-[325.73px]" data-name="Button">
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">24</p>
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[542.85px] pb-[4px] rounded-[15px] size-[100.575px] top-[325.73px]" data-name="Button">
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">25</p>
      </div>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[651.42px] pb-[4px] rounded-[15px] size-[100.575px] top-[325.73px]" data-name="Button">
      <Text28 />
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">26</p>
      </div>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 pb-[4.012px] rounded-[15px] size-[100.563px] top-[434.3px]" data-name="Button">
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">27</p>
      </div>
    </div>
  );
}

function Button30() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[108.56px] pb-[4px] rounded-[15px] size-[100.575px] top-[434.3px]" data-name="Button">
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">28</p>
      </div>
    </div>
  );
}

function Button31() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[217.14px] pb-[4px] rounded-[15px] size-[100.575px] top-[434.3px]" data-name="Button">
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">29</p>
      </div>
    </div>
  );
}

function Button32() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[325.71px] pb-[4.012px] rounded-[15px] size-[100.563px] top-[434.3px]" data-name="Button">
      <Text32 />
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">30</p>
      </div>
    </div>
  );
}

function Button33() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[434.28px] pb-[4px] rounded-[15px] size-[100.575px] top-[434.3px]" data-name="Button">
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[9px] text-[#83451e] text-[16px] text-center top-[-2.2px]">31</p>
      </div>
    </div>
  );
}

function Button34() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[542.85px] pb-[4px] rounded-[15px] size-[100.575px] top-[434.3px]" data-name="Button">
      <Text34 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[534.875px] relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container36 />
      <Container37 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
      <Button22 />
      <Button23 />
      <Button24 />
      <Button25 />
      <Button26 />
      <Button27 />
      <Button28 />
      <Button29 />
      <Button30 />
      <Button31 />
      <Button32 />
      <Button33 />
      <Button34 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white h-[711.875px] relative rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[32px] px-[32px] relative size-full">
        <Container25 />
        <Container26 />
        <Container34 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[823.875px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] h-[911.875px] min-h-px min-w-px relative" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[32px] px-[32px] relative size-full">
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function PK() {
  return (
    <div className="bg-[#fffee7] content-stretch flex h-[911.875px] items-start relative shrink-0 w-full" data-name="pK">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="трекер эмоций">
      <PK />
    </div>
  );
}