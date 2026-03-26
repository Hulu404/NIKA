import svgPaths from "./svg-dquqcsju8i";

function Heading() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[66px] left-0 text-[#2d3625] text-[44px] top-[-0.6px] tracking-[-1.1px]">Часто задаваемые вопросы</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[29.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[29.25px] left-0 text-[#5a6444] text-[18px] top-[-1.4px]">Ответы на самые популярные вопросы о НИКЕ</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[188.475px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Что такое НИКА?</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[238.488px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Кому подойдёт НИКА?</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text1 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[468.363px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Чем НИКА отличается от фитнес-приложений?</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text2 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[393.087px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Заменяет ли НИКА тренера или врача?</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text3 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[396.087px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Нужно ли специальное оборудование?</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text4 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[381.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Сколько стоит использование НИКИ?</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text5 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[319.288px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Можно ли отменить подписку?</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text6 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[291.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Как защищены мои данные?</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text7 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[30.875px] relative shrink-0 w-[221.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30.875px] left-0 text-[#2d3625] text-[19px] top-[-0.6px]">Где доступна НИКА?</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M5.5 8.25L11 13.75L16.5 8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[26843500px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 size-[44px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[92px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] relative size-full">
          <Text8 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[95.2px] relative rounded-[20px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.6px] relative size-full">
          <Button8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[1.6px] border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function FaqAccordion() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[984.8px] items-start relative shrink-0 w-full" data-name="FAQAccordion">
      <Container2 />
      <Container4 />
      <Container6 />
      <Container8 />
      <Container10 />
      <Container12 />
      <Container14 />
      <Container16 />
      <Container18 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[1140.05px] items-start left-[360px] top-[64px] w-[792px]" data-name="Container">
      <Container1 />
      <FaqAccordion />
    </div>
  );
}

function Container20() {
  return <div className="absolute bg-[rgba(246,176,68,0.08)] blur-[100px] left-[190.8px] opacity-50 rounded-[26843500px] size-[450px] top-0" data-name="Container" />;
}

function Container21() {
  return <div className="absolute bg-[rgba(243,156,18,0.08)] blur-[100px] left-[631.2px] rounded-[26843500px] size-[450px] top-[250px]" data-name="Container" />;
}

function App() {
  return (
    <div className="bg-gradient-to-b from-[#faf7ec] h-[1268.05px] overflow-clip relative shrink-0 to-[#f9f4e8] via-1/2 via-[#fdf8f0] w-full" data-name="App">
      <Container />
      <Container20 />
      <Container21 />
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[667.2px] items-start left-0 top-0 w-[1272px]" data-name="Body">
      <App />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[10.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[21px] left-0 text-[14px] text-white top-[-0.2px]">N</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] relative rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1)] shrink-0 size-[32px] to-[#f39c12]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.012px] relative size-full">
        <Text9 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[37.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#101828] text-[16px] top-[-0.2px]">NIKA</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Text10 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[77.713px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Manrope:Regular',sans-serif] font-normal leading-[24px] left-[39px] text-[16px] text-center text-white top-[-0.2px]">Новый чат</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-gradient-to-b from-[#f6b044] h-[52px] relative rounded-[16px] shadow-[0px_10px_15px_0px_rgba(246,176,68,0.2)] shrink-0 to-[#f39c12] w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center pr-[0.013px] relative size-full">
          <Icon9 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[156.8px] items-start left-0 pb-[0.8px] pt-[24px] px-[24px] top-0 w-[319.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <Container23 />
      <Button9 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[42.6px] left-0 rounded-[14px] top-0 w-[271.2px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[44px] pr-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#99a1af] text-[14px]">Поиск...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[69.42%_12.5%_12.5%_69.42%]" data-name="Vector">
        <div className="absolute inset-[-21.6%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66125 4.66125">
            <path d={svgPaths.p3f90e580} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_20.83%_20.83%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.86%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4062 13.4062">
            <path d={svgPaths.p3c90ec20} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14px] size-[18px] top-[12.3px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[42.6px] left-[24px] top-[180.8px] w-[271.2px]" data-name="Container">
      <TextInput />
      <Container26 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_10_469)" id="Icon">
          <path d="M7 3.5V7L9.33333 8.16667" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8505" />
          <path d={svgPaths.pc012c00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8505" />
        </g>
        <defs>
          <clipPath id="clip0_10_469">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[69.425px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase">Недавние</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] relative size-full">
          <Icon11 />
          <Heading1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] overflow-clip top-[12px] w-[248px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#4a5565] text-[14px] whitespace-pre-wrap">План тренировок на неделю</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[34px] w-[248px]" data-name="Paragraph">
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#99a1af] text-[12px] top-[-0.8px]">2ч назад</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[62px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] overflow-clip top-[12px] w-[248px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#4a5565] text-[14px] whitespace-pre-wrap">Советы по питанию</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[34px] w-[248px]" data-name="Paragraph">
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#99a1af] text-[12px] top-[-0.8px]">5ч назад</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[62px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] overflow-clip top-[12px] w-[248px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#4a5565] text-[14px] whitespace-pre-wrap">Упражнения для спины</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[34px] w-[248px]" data-name="Paragraph">
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#99a1af] text-[12px] top-[-0.8px]">Вчера</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[62px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] overflow-clip top-[12px] w-[248px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#4a5565] text-[14px] whitespace-pre-wrap">Восстановление после бега</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[34px] w-[248px]" data-name="Paragraph">
      <p className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#99a1af] text-[12px] top-[-0.8px]">2 дня назад</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[62px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[260px] items-start relative shrink-0 w-full" data-name="Container">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[113px] items-start left-0 overflow-clip pl-[12px] pr-[27.2px] top-[247.4px] w-[319.2px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex items-start px-[12px] relative size-full">
        <p className="flex-[1_0_0] font-['Manrope:Bold',sans-serif] font-bold leading-[18px] min-h-px min-w-px relative text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-pre-wrap">Меню</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[120.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Трекер прогресса</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82.738px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Упражнения</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[196.463px] relative size-full">
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[114.763px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Дневник питания</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[164.438px] relative size-full">
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[128px] items-start relative shrink-0 w-full" data-name="Container">
      <Button14 />
      <Button15 />
      <Button16 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2802f40} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
          <path d={svgPaths.p254f3200} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[71.463px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Настройки</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon12 />
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M12 12.75L15.75 9L12 5.25" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
          <path d="M15.75 9H6.75" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
          <path d={svgPaths.p3d8d0000} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40.987px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Выйти</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon13 />
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Button17 />
      <Button18 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[306.8px] items-start left-0 pt-[24.8px] px-[12px] top-[360.4px] w-[319.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <Heading2 />
      <Container31 />
      <Container32 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] border-[rgba(0,0,0,0.05)] border-r-[0.8px] border-solid h-[1268px] left-0 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.08)] top-0 w-[320px]" data-name="Sidebar">
      <Container22 />
      <Container25 />
      <Container27 />
      <Container30 />
    </div>
  );
}

export default function FaQs() {
  return (
    <div className="bg-white relative size-full" data-name="FAQs">
      <Body />
      <Sidebar />
    </div>
  );
}