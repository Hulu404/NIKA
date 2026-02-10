import svgPaths from "./svg-rqnpl7v87z";
import { imgEllipse2 } from "./svg-550gw";

function TopBar() {
  return <div className="absolute h-[72px] left-[-28px] top-0 w-[1496px]" data-name="TopBar" />;
}

function Settings() {
  return (
    <div className="absolute left-[1379px] size-[32px] top-[817px]" data-name="Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_2_77)" id="Settings">
          <g id="Icon">
            <path d={svgPaths.p34392700} stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            <path d={svgPaths.p3a531880} stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_2_77">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute h-[20.919px] left-[20.82px] top-[153.84px] w-[21.411px]" data-name="Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.4107 20.9194">
        <g id="Plus">
          <path d={svgPaths.p178ff000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[-22px] top-[112px]">
      <div className="absolute backdrop-blur-[15px] bg-[rgba(255,255,255,0.6)] h-[519px] left-[-22px] rounded-[15px] top-[112px] w-[218px]" />
      <Plus />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[rgba(23,23,23,0)] h-[900px] left-0 top-[-1px] w-[1440px]" data-name="мейн экран оранж">
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[943px] text-[16px] text-white top-[389px] tracking-[0.24px]">Бег</p>
      <TopBar />
      <Settings />
      <Group />
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[21px] text-[#2d3625] text-[16px] top-[137px] tracking-[0.24px] w-[153px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[normal]">{`8. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Как мы храним и защищаем ваши данные</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`9. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Технические процессы обработки</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`10. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Передача данных за пределы страны</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`11. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Гарантии неразглашения</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`12. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Контакты для связи и обновления документа</span>
        </p>
        <p className="leading-[normal]">&nbsp;</p>
      </div>
      <div className="absolute left-[60px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-24px_-12px] mask-size-[68px_68px] size-[20px] top-[815px]" style={{ maskImage: `url('${imgEllipse2}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <circle cx="10" cy="10" fill="var(--fill-0, #4B5563)" id="Ellipse 2" r="10" />
        </svg>
      </div>
      <div className="absolute left-[50px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14px_-37px] mask-size-[68px_68px] size-[40px] top-[840px]" style={{ maskImage: `url('${imgEllipse2}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #4B5563)" id="Ellipse 3" r="20" />
        </svg>
      </div>
      <div className="absolute bg-[#d9d9d9] h-[28px] left-[19px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[17px_653px] mask-size-[68px_68px] top-[150px] w-[165px]" style={{ maskImage: `url('${imgEllipse2}')` }} />
    </div>
  );
}

export default function Component1() {
  return (
    <div className="bg-[#faf7ec] relative size-full" data-name="политика 6">
      <Component />
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[310px] text-[#3d2b1f] text-[0px] top-[111px] w-[1004px] whitespace-pre-wrap">
        <p className="mb-0 text-[13px]">
          <span className="leading-[normal]">
            {`8.4. Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной срок не предусмотрен договором или действующим законодательством. `}
            <br aria-hidden="true" />
            {`Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора `}
          </span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid font-['Manrope:Regular',sans-serif] font-normal leading-[normal] underline" href="mailto:privacy@thismywebsite.com">
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal]" href="mailto:privacy@thismywebsite.com">
              privacy@thismywebsite.com
            </span>
          </a>
          <span className="leading-[normal]">{` с пометкой «Отзыв согласия на обработку персональных данных».`}</span>
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          8.5. Вся информация, которая собирается сторонними сервисами, в том числе платежными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами (Операторами) в соответствии с их Пользовательским соглашением и Политикой конфиденциальности. Субъект персональных данных и/или с указанными документами. Оператор не несет ответственность за действия третьих лиц, в том числе указанных в настоящем пункте поставщиков услуг.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          8.6. Установленные субъектом персональных данных запреты на передачу (кроме предоставления доступа), а также на обработку или условия обработки (кроме получения доступа) персональных данных, разрешенных для распространения, не действуют в случаях обработки персональных данных в государственных, общественных и иных публичных интересах, определенных законодательством РФ.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          8.7. Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          8.8. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          8.9. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных, отзыв согласия субъектом персональных данных или требование о прекращении обработки персональных данных, а также выявление неправомерной обработки персональных данных.
        </p>
        <p className="leading-[normal] mb-0 text-[20px]">&nbsp;</p>
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[#2d3625] text-[20px]">9. Перечень действий, производимых Оператором с полученными персональными данными</p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          9.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.
        </p>
        <p className="leading-[normal] text-[13px]">
          <br aria-hidden="true" />
          9.2. Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.
        </p>
      </div>
    </div>
  );
}