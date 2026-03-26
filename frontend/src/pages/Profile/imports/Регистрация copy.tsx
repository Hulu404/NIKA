import imgDropdown from "figma:asset/3ed96d854a295179092ad8471a9d069bf94ec0ae.png";

function Heading() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[40px] left-[224.9px] text-[#3d1f00] text-[36px] text-center top-[-3px]">Регистрация</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[223.89px] text-[#83451e] text-[14px] text-center top-[-1.2px]">Создайте аккаунт для продолжения</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex items-start pl-[20px] relative size-full">
        <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#83451e] text-[14px] whitespace-pre-wrap">Имя</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(131,69,30,0.5)]">Введите ваше имя</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex items-start pl-[20px] relative size-full">
        <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#83451e] text-[14px] whitespace-pre-wrap">Фамилия</p>
      </div>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(131,69,30,0.5)]">Введите вашу фамилию</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <TextInput1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex items-start pl-[20px] relative size-full">
        <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#83451e] text-[14px] whitespace-pre-wrap">Email</p>
      </div>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(131,69,30,0.5)]">example@email.com</p>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <EmailInput />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex items-start pl-[20px] relative size-full">
        <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#83451e] text-[14px] whitespace-pre-wrap">Пароль</p>
      </div>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] h-[56px] relative rounded-[25px] shrink-0 w-full" data-name="Password Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[16px] relative size-full">
          <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(131,69,30,0.5)]">Минимум 8 символов</p>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <PasswordInput />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex items-start pl-[20px] relative size-full">
        <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#83451e] text-[14px] whitespace-pre-wrap">Пол</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[25px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Manrope:Regular',sans-serif] font-normal leading-[24px] left-[109.2px] text-[#83451e] text-[16px] text-center top-[15.8px]">Женский</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(189,145,97,0.15)] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[25px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Manrope:Regular',sans-serif] font-normal leading-[24px] left-[109.03px] text-[#83451e] text-[16px] text-center top-[15.8px]">Мужской</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[88px] items-start relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Container7 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex h-[20px] items-start pl-[20px] relative shrink-0 w-[448px]" data-name="Label">
      <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#83451e] text-[14px] whitespace-pre-wrap">Вид спорта</p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option1() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option2() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option3() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option4() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option5() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option6() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option7() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option8() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option9() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Option10() {
  return <div className="absolute left-[-348px] size-0 top-[-716px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="h-[56px] relative rounded-[25px] shrink-0 w-[448px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[25px]">
        <div className="absolute bg-[rgba(189,145,97,0.15)] inset-0 rounded-[25px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[25px]">
          <img alt="" className="absolute h-[35.71%] left-0 max-w-none top-[32.14%] w-[4.46%]" src={imgDropdown} />
        </div>
      </div>
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
      <Option4 />
      <Option5 />
      <Option6 />
      <Option7 />
      <Option8 />
      <Option9 />
      <Option10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[84px] items-start relative shrink-0" data-name="Container">
      <Label5 />
      <Dropdown />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#83451e] h-[56px] relative rounded-[25px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Manrope:Regular',sans-serif] font-normal leading-[24px] left-[224.09px] text-[#fffee7] text-[16px] text-center top-[15.8px]">Зарегистрироваться</p>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[716px] items-start relative shrink-0 w-full" data-name="Form">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container8 />
      <Button2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[224.45px] text-[#83451e] text-[16px] text-center top-[-0.2px] w-[188px] whitespace-pre-wrap">
        <span className="leading-[24px]">{`Уже есть аккаунт? `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid leading-[24px] text-[#3d1f00] underline">Войти</span>
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Link">
      <p className="decoration-solid flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#83451e] text-[14px] text-center underline whitespace-pre-wrap">FAQs</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Link />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[920px] relative shrink-0 w-[448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[48px] items-start relative size-full">
        <Container1 />
        <Form />
        <Container9 />
      </div>
    </div>
  );
}

function PQ() {
  return (
    <div className="bg-[#fffee7] content-stretch flex flex-col h-[1016px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="pQ">
      <Container />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="регистрация">
      <PQ />
    </div>
  );
}