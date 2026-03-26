import svgPaths from "./svg-yf1mgnwpiy";
import { imgEllipse2 } from "./svg-1flee";

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
    <div className="absolute h-[20.919px] left-[20.61px] top-[151.84px] w-[21.804px]" data-name="Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.8036 20.9194">
        <g id="Plus">
          <path d={svgPaths.p392b3d00} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[-23px] top-[110px]">
      <div className="absolute backdrop-blur-[15px] bg-[rgba(255,255,255,0.6)] h-[519px] left-[-23px] rounded-[15px] top-[110px] w-[222px]" />
      <Plus />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[-23px] top-[110px]">
      <Group />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[rgba(23,23,23,0)] h-[900px] left-0 top-[-1px] w-[1440px]" data-name="мейн экран оранж">
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[943px] text-[16px] text-white top-[389px] tracking-[0.24px]">Бег</p>
      <TopBar />
      <Settings />
      <Group1 />
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[20px] text-[#2d3625] text-[16px] top-[138px] tracking-[0.24px] w-[148px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[normal]">{`5. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Этические и правовые стандарты обработки</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">6.</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">{` Перечень собираемых данных и цели`}</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`7. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Правовые основания для работы с информацией</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`8. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Как мы храним и защищаем ваши данные</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">9.</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">{` Технические процессы обработки`}</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal]">{`10. `}</span>
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Передача данных за пределы страны</span>
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
    <div className="bg-[#faf7ec] relative size-full" data-name="политика 5">
      <Component />
      <div className="absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[310px] text-[#3d2b1f] text-[0px] top-[111px] tracking-[0.208px] w-[1004px] whitespace-pre-wrap">
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[#2d3625] text-[20px] tracking-[0.32px]">7. Условия обработки персональных данных</p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          7.1. Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          7.2. Обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          7.3. Обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          7.4. Обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          7.5. Обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          7.6. Осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее — общедоступные персональные данные).
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">&nbsp;</p>
        <p className="leading-[normal] mb-0 text-[13px]">7.7. Осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.</p>
        <p className="leading-[normal] mb-0 text-[13px]">&nbsp;</p>
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] mb-0 text-[#2d3625] text-[20px] tracking-[0.32px]">8. Порядок сбора, хранения, передачи и других видов обработки персональных данных</p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          8.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.
        </p>
        <p className="leading-[normal] mb-0 text-[13px]">
          <br aria-hidden="true" />
          8.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.
        </p>
        <p className="mb-0 text-[13px]">
          <span className="leading-[normal]">
            <br aria-hidden="true" />
            {`8.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора `}
          </span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid font-['Manrope:Regular',sans-serif] font-normal leading-[normal] underline" href="mailto:privacy@thismywebsite.com">
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal]" >
              privacy@thismywebsite.com
            </span>
          </a>
          <span className="leading-[normal]">{` с пометкой «Актуализация персональных данных».`}</span>
        </p>
        <p className="leading-[normal] text-[13px]">
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}