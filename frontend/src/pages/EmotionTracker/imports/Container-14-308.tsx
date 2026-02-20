import svgPaths from "./svg-qo4p690o5d";

function Icon1() {
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

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[20px] top-[8.5px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#83451e] text-[14px] top-[0.4px]">Трекер прогресса</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[44px] pr-[-114.713px] pt-[-1.2px] top-[8px] w-0" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[37px] left-0 top-0 w-[215.2px]" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative rounded-[10px] size-full" data-name="Container">
      <Container1 />
    </div>
  );
}