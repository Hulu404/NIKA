import svgPaths from "./svg-2m55nyctjs";
import { imgEllipse2 } from "./svg-asgfc";

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
    <div className="bg-[#faf7ec] relative size-full" data-name="политика 7">
      <Component />
      <div className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[0] left-[310px] text-[#3d2b1f] text-[0px] top-[111px] w-[1004px] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0 text-[#2d3625] text-[20px]">10. Трансграничная передача персональных данных</p>
        <p className="leading-[normal] mb-0 text-[13px]">&nbsp;</p>
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] mb-0 text-[13px]">{`10.1. Оператор до начала осуществления деятельности по трансграничной передаче персональных данных обязан уведомить уполномоченный орган по защите прав субъектов персональных данных о своем намерении осуществлять трансграничную передачу персональных данных (такое уведомление направляется отдельно от уведомления о намерении осуществлять обработку персональных данных). 10.2. Оператор до подачи вышеуказанного уведомления, обязан получить от органов власти иностранного государства, иностранных физических лиц, иностранных юридических лиц, которым планируется трансграничная передача персональных данных, соответствующие сведения. `}</p>
        <p className="leading-[normal] mb-0 text-[20px]">&nbsp;</p>
        <p className="leading-[normal] mb-0 text-[#2d3625] text-[20px]">{`11. Конфиденциальность персональных данных `}</p>
        <p className="leading-[normal] mb-0 text-[13px]">&nbsp;</p>
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[normal] mb-0 text-[13px]">{`Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом. `}</p>
        <p className="leading-[normal] mb-0 text-[13px]">&nbsp;</p>
        <p className="leading-[normal] mb-0 text-[#2d3625] text-[20px]">{`12. Заключительные положения `}</p>
        <p className="leading-[normal] mb-0 text-[13px]">&nbsp;</p>
        <p className="font-['Manrope:Regular',sans-serif] font-normal mb-0 text-[13px]">
          <span className="leading-[normal]">{`12.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты `}</span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline" href="mailto:privacy@thismywebsite.com">
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal]" href="mailto:privacy@thismywebsite.com">
              privacy@thismywebsite.com
            </span>
          </a>
          <span className="leading-[normal]">{`. 12.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией. 12.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу `}</span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline" href="https://thismywebsite.com/privacy/">
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal]" href="https://thismywebsite.com/privacy/">
              https://thismywebsite.com/privacy/
            </span>
          </a>
          <span className="leading-[normal]">.</span>
        </p>
        <p className="leading-[normal] text-[13px]">&nbsp;</p>
      </div>
    </div>
  );
}