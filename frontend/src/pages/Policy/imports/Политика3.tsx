import svgPaths from "./svg-9otdw5ip28";
import { imgEllipse2 } from "./svg-my1j6";

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

function Component() {
  return (
    <div className="absolute bg-[rgba(23,23,23,0)] h-[900px] left-0 top-[-1px] w-[1440px]" data-name="мейн экран оранж">
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[943px] text-[16px] text-white top-[389px] tracking-[0.24px]">Бег</p>
      <TopBar />
      <div className="absolute h-[97px] left-[21px] top-[-12px] w-[140px]" data-name="image 1" />
      <Settings />
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

function Plus() {
  return (
    <div className="absolute left-[270px] size-[40px] top-[714px]" data-name="Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Plus" />
      </svg>
    </div>
  );
}

function Plus1() {
  return (
    <div className="absolute h-[20.919px] left-[29px] top-[152.84px] w-[22px]" data-name="Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20.9194">
        <g id="Plus">
          <path d={svgPaths.p201667be} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[-15px] top-[111px]">
      <div className="absolute backdrop-blur-[15px] bg-[rgba(255,255,255,0.6)] h-[519px] left-[-15px] rounded-[15px] top-[111px] w-[224px]" />
      <Plus1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[-15px] top-[111px]">
      <Group />
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal h-[372.564px] leading-[0] left-[21px] text-[#1f2937] text-[16px] top-[137.9px] tracking-[0.24px] w-[153px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[normal]">{`1. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Вводная информация и законодательная база</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`2. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Словарь используемых терминов</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`3. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Правила работы и ответственность Оператора</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`4. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Ваши права как субъекта данных</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`5. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Этические и правовые стандарты обработки</span>
        </p>
        <p className="leading-[normal]">&nbsp;</p>
      </div>
    </div>
  );
}

export default function Component1() {
  return (
    <div className="bg-[#faf7ec] relative size-full" data-name="политика 3">
      <Component />
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[310px] text-[#3d2b1f] text-[0px] top-[111px] tracking-[0.208px] w-[1004px] whitespace-pre-wrap">
        <p className="mb-0 text-[13px]">
          3.2. Оператор обязан:
          <br aria-hidden="true" />
          — предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;
          <br aria-hidden="true" />
          — организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;
          <br aria-hidden="true" />
          — отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;
          <br aria-hidden="true" />
          — сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 10 дней с даты получения такого запроса;
          <br aria-hidden="true" />
          — публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных;
          <br aria-hidden="true" />
          — принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;
          <br aria-hidden="true" />
          — прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;
          <br aria-hidden="true" />
          — исполнять иные обязанности, предусмотренные Законом о персональных данных.
        </p>
        <p className="mb-0 text-[13px]">&nbsp;</p>
        <p className="font-['Manrope:Bold',sans-serif] font-bold mb-0 text-[#2d3625] text-[20px] tracking-[0.32px]">4. Основные права и обязанности субъектов персональных данных</p>
        <p className="mb-0 text-[20px]">&nbsp;</p>
        <p className="mb-0 text-[13px]">4.1. Субъекты персональных данных имеют право: — получать информацию, касающуюся обработки его персональных данных, за исключением случаев, предусмотренных федеральными законами. Сведения предоставляются субъекту персональных данных Оператором в доступной форме, и в них не должны содержаться персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных. Перечень информации и порядок ее получения установлен Законом о персональных данных; — требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав; — выдвигать условие предварительного согласия при обработке персональных данных в целях продвижения на рынке товаров, работ и услуг; — на отзыв согласия на обработку персональных данных, а также, на направление требования о прекращении обработки персональных данных; — обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его персональных данных— на осуществление иных прав, предусмотренных законодательством РФ.</p>
        <p className="mb-0 text-[13px]">
          <br aria-hidden="true" />
          4.2. Субъекты персональных данных обязаны:
          <br aria-hidden="true" />
          — предоставлять Оператору достоверные данные о себе;
          <br aria-hidden="true" />
          — сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.
        </p>
        <p className="text-[13px]">
          <br aria-hidden="true" />
          4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
      </div>
      <Plus />
      <Group1 />
    </div>
  );
}