import svgPaths from "./svg-h25src2i5p";

function Container2() {
  return <div className="absolute border-[#e8dcc8] border-r-[0.8px] border-solid h-[743px] left-0 top-0 w-[264px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[27px] left-0 text-[18px] text-white top-[0.2px]">N</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[27px] items-start left-[13.09px] pr-[0.813px] pt-[-2.2px] top-[6.5px] w-[13.813px]" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[#f5a623] left-0 rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Container">
      <Container6 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#3d1f00] text-[18px] top-[0.2px]">NIKA</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[27px] items-start left-[52px] pr-[-1.862px] pt-[-2.2px] top-[6.5px] w-[42.138px]" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[40px] left-[24px] top-[24px] w-[215.2px]" data-name="Container">
      <Container5 />
      <Container7 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute contents inset-[20.83%]" data-name="Icon">
      <div className="absolute inset-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-8.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6666 13.6666">
            <path d={svgPaths.p29040180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[38.59px] size-[20px] top-[12.5px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[21px] left-[70.59px] top-[12px] w-[106.013px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-white top-[0.4px]">Назад к диалогу</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#f5a623] h-[45px] left-[24px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-[96px] w-[215.2px]" data-name="Container">
      <Container9 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[18px] left-[12px] top-[-1.2px] w-[41.2px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#83451e] text-[12px] top-[-0.4px] tracking-[0.6px] uppercase">МЕНЮ</p>
    </div>
  );
}

function Icon3() {
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

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon3 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Личный кабинет</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[1.588px] pt-[-1.2px] top-[8px] w-[106.925px]" data-name="Container">
      <Paragraph4 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Icon5() {
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

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon5 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[21px] left-[44px] top-[8px] w-[101.662px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Трекер питания</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#f0e8d8] h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container17 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Icon7() {
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

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon7 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Трекер прогресса</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[-114.713px] pt-[-1.2px] top-[8px] w-0" data-name="Container">
      <Paragraph6 />
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
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container19 />
      </div>
    </div>
  );
}

function Icon9() {
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

function Icon8() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon9 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Дневник эмоций</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[-106.225px] pt-[-1.2px] top-[8px] w-0" data-name="Container">
      <Paragraph7 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[37px] relative rounded-[10px] shrink-0 w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function Icon11() {
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

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon11 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Настройки</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[0.287px] pt-[-1.2px] top-[8px] w-[68.938px]" data-name="Container">
      <Paragraph8 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[10px] w-[215.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container27 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[201px] items-start left-0 top-[34px] w-[215.2px]" data-name="Container">
      <Container12 />
      <Container16 />
      <Container18 />
      <Container22 />
      <Container26 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[235px] left-[24px] top-[165px] w-[215.2px]" data-name="Container">
      <Paragraph3 />
      <Container11 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="Icon">
      <div className="absolute inset-[29.17%_12.5%_29.17%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-10%_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83337 10">
            <path d={svgPaths.p6a49700} id="Vector" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[37.5%] right-[12.5%] top-1/2" data-name="Vector_2">
        <div className="absolute inset-[-0.83px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 1.66667">
            <path d="M10.8333 0.833335H0.833335" id="Vector_2" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_62.5%_12.5%_12.5%]" data-name="Vector_3">
        <div className="absolute inset-[-5.56%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 16.6667">
            <path d={svgPaths.p2d874680} id="Vector_3" stroke="var(--stroke-0, #83451E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon13 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[21px] text-[#83451e] text-[14px] text-center top-[0.4px]">Выйти</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pl-[-0.731px] pr-[-0.756px] pt-[-1.2px] top-[8px] w-[39.975px]" data-name="Container">
      <Paragraph9 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[37px] left-[24px] rounded-[10px] top-[682px] w-[215.2px]" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[743px] left-0 top-0 w-[264px]" data-name="Container">
      <Container4 />
      <Container8 />
      <Container10 />
      <Container30 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#faf8f0] h-[743px] left-0 top-0 w-[264px]" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[48px] left-0 top-[-2.6px] w-[232.363px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[48px] left-0 text-[#3d1f00] text-[32px] top-[1.4px]">Трекер питания</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[21px] relative shrink-0 w-[94.363px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[95px] text-[#83451e] text-[14px] text-right top-[0.4px]">Всего калорий</p>
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[84.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Arimo:Bold',sans-serif] font-bold leading-[42px] left-[85px] text-[#f5a623] text-[28px] text-right top-[-0.2px]">0 ккал</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col h-[63px] items-end left-[721.64px] top-[1.5px] w-[94.363px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#83451e] text-[16px] top-[0.2px] w-[192px] whitespace-pre-wrap">четверг, 12 февраля 2026 г.</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-0 pt-[-2.2px] top-[21px] w-[200.538px]" data-name="Container">
      <Paragraph13 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[66px] left-0 top-[56px] w-[816px]" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[122px] left-0 top-0 w-[816px]" data-name="Container">
      <Paragraph10 />
      <Container36 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[72px] left-[39.04px] top-0 w-[65.912px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[72px] left-[33px] text-[#0a0a0a] text-[48px] text-center top-[-0.2px]">🍳</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[24px] left-[42.58px] top-[84px] w-[58.838px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[29.5px] text-[#3d1f00] text-[16px] text-center top-[0.2px]">Завтрак</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[21px] left-[51.9px] top-[116px] w-[40.2px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20.5px] text-[#83451e] text-[14px] text-center top-[0.4px] w-[41px] whitespace-pre-wrap">0 ккал</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute contents inset-[20.83%]" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 2">
            <path d="M1 1H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector_2">
        <div className="absolute inset-[-7.14%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16">
            <path d="M1 1V15" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon15 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[24px] top-[12px]" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#f5a623] left-[48px] rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[48px] top-[153px]" data-name="Button">
      <Container42 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[201px] left-[24px] top-[24px] w-[144px]" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
      <Paragraph16 />
      <Button />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[20px] row-1 self-stretch shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0" data-name="Container">
      <Container41 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[72px] left-[39.04px] top-0 w-[65.912px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[72px] left-[33px] text-[#0a0a0a] text-[48px] text-center top-[-0.2px]">🥗</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[24px] left-[52.34px] top-[84px] w-[39.313px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[20px] text-[#3d1f00] text-[16px] text-center top-[0.2px]">Обед</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[21px] left-[51.9px] top-[116px] w-[40.2px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20.5px] text-[#83451e] text-[14px] text-center top-[0.4px] w-[41px] whitespace-pre-wrap">0 ккал</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute contents inset-[20.83%]" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 2">
            <path d="M1 1H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector_2">
        <div className="absolute inset-[-7.14%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16">
            <path d="M1 1V15" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon17 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[24px] top-[12px]" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#4caf50] left-[48px] rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[48px] top-[153px]" data-name="Button">
      <Container45 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[201px] left-[24px] top-[24px] w-[144px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
      <Paragraph19 />
      <Button1 />
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[20px] row-1 self-stretch shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0" data-name="Container">
      <Container44 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[72px] left-[39.04px] top-0 w-[65.912px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[72px] left-[33px] text-[#0a0a0a] text-[48px] text-center top-[-0.2px]">🍽️</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[24px] left-[52.94px] top-[84px] w-[38.112px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[19.5px] text-[#3d1f00] text-[16px] text-center top-[0.2px]">Ужин</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[21px] left-[51.9px] top-[116px] w-[40.2px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20.5px] text-[#83451e] text-[14px] text-center top-[0.4px] w-[41px] whitespace-pre-wrap">0 ккал</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute contents inset-[20.83%]" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 2">
            <path d="M1 1H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector_2">
        <div className="absolute inset-[-7.14%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16">
            <path d="M1 1V15" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon19 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[24px] top-[12px]" data-name="Container">
      <Icon18 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#ff9800] left-[48px] rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[48px] top-[153px]" data-name="Button">
      <Container48 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute h-[201px] left-[24px] top-[24px] w-[144px]" data-name="Container">
      <Paragraph20 />
      <Paragraph21 />
      <Paragraph22 />
      <Button2 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[20px] row-1 self-stretch shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0" data-name="Container">
      <Container47 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[72px] left-[40.71px] top-0 w-[62.563px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[72px] left-[31px] text-[#0a0a0a] text-[48px] text-center top-[-0.2px]">🍎</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[24px] left-[41.4px] top-[84px] w-[61.2px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[31px] text-[#3d1f00] text-[16px] text-center top-[0.2px]">Перекус</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[21px] left-[51.9px] top-[116px] w-[40.2px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20.5px] text-[#83451e] text-[14px] text-center top-[0.4px] w-[41px] whitespace-pre-wrap">0 ккал</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute contents inset-[20.83%]" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 2">
            <path d="M1 1H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector_2">
        <div className="absolute inset-[-7.14%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16">
            <path d="M1 1V15" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon21 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[24px] top-[12px]" data-name="Container">
      <Icon20 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#e91e63] left-[48px] rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[48px] top-[153px]" data-name="Button">
      <Container51 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[201px] left-[24px] top-[24px] w-[144px]" data-name="Container">
      <Paragraph23 />
      <Paragraph24 />
      <Paragraph25 />
      <Button3 />
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-white col-4 justify-self-stretch relative rounded-[20px] row-1 self-stretch shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0" data-name="Container">
      <Container50 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[249px] left-0 top-[154px] w-[816px]" data-name="Container">
      <Container40 />
      <Container43 />
      <Container46 />
      <Container49 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[36px] left-[32px] top-[29.6px] w-[184.375px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[#3d1f00] text-[24px] top-[0.8px]">Журнал питания</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[24px] left-[224.28px] top-[137.8px] w-[367.388px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[184px] text-[#83451e] text-[16px] text-center top-[0.2px]">Нет записей. Добавьте свой первый приём пищи!</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-white h-[244px] left-0 rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[435px] w-[816px]" data-name="Container">
      <Paragraph26 />
      <Paragraph27 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[679px] left-[32px] top-[32px] w-[816px]" data-name="Container">
      <Container35 />
      <Container39 />
      <Container52 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[743px] left-[264px] overflow-clip top-0 w-[880px]" data-name="Container">
      <Container34 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#fffee7] h-[743px] left-0 top-0 w-[1144px]" data-name="Container">
      <Container1 />
      <Container33 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="питание">
      <Container />
    </div>
  );
}