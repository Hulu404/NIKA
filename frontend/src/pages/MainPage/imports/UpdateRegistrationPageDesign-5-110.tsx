function Heading() {
  return (
    <div className="h-[50px] relative shrink-0 w-[86.613px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[50px] left-[43.5px] text-[#3d1f00] text-[40px] text-center top-[-4.4px]">Вход</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[50px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.012px] relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-[172.713px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[86px] text-[#83451e] text-[16px] text-center top-[-2.2px]">Войдите в свой аккаунт</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.012px] relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[86px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-[480px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[20px] text-[#83451e] text-[14px] top-[-1.2px]">Email</p>
      </div>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] flex-[1_0_0] min-h-px min-w-px relative rounded-[25px] w-[480px]" data-name="Email Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[24px] py-[18px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(131,69,30,0.5)]">example@email.com</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[90px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start relative size-full">
        <Label />
        <EmailInput />
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[480px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[20px] text-[#83451e] text-[14px] top-[-1.2px]">Пароль</p>
      </div>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] flex-[1_0_0] min-h-px min-w-px relative rounded-[25px] w-[480px]" data-name="Password Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[24px] py-[18px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(131,69,30,0.5)]">Введите ваш пароль</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start relative size-full">
        <Label1 />
        <PasswordInput />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#83451e] h-[60px] relative rounded-[25px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-[480px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[240.64px] text-[#fffee7] text-[16px] text-center top-[15.8px]">Войти</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[288px] items-start relative shrink-0 w-full" data-name="Form">
      <Container4 />
      <Container5 />
      <Button />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[254.2px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[0] left-[127.5px] text-[#83451e] text-[16px] text-center top-[-2.2px] w-[255px] whitespace-pre-wrap">
          <span className="leading-[24px]">{`Нет аккаунта? `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[24px] text-[#3d1f00] underline">Зарегистрироваться</span>
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Paragraph1 />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] relative shrink-0 w-[31.55px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute decoration-solid font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[16px] text-[#83451e] text-[14px] text-center top-[-1.2px] underline">FAQs</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Link />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[546px] relative shrink-0 w-[480px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[56px] items-start relative size-full">
        <Container1 />
        <Form />
        <Container6 />
      </div>
    </div>
  );
}

export default function UpdateRegistrationPageDesign() {
  return (
    <div className="bg-[#fffee7] content-stretch flex items-center justify-center relative size-full" data-name="Update Registration Page Design">
      <Container />
    </div>
  );
}