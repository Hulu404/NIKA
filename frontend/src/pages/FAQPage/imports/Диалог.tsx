import img from "figma:asset/62cd86581e3672253e36e26d4ee26716d7fd70e9.png";
import img1 from "figma:asset/3aea53be4695bffd943f8b2a675370669a2fb767.png";
import imgImg45772 from "figma:asset/878ec072e69d54948acfc5eb71cb918512434d5b.png";

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="диалог">
      <div className="absolute h-[891px] left-[6px] rounded-[5px] top-[4px] w-[1430px]" data-name="ветки">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
          <img alt="" className="absolute h-full left-[-26.81%] max-w-none top-0 w-[133.14%]" src={img} />
        </div>
      </div>
      <p className="absolute decoration-[8%] decoration-solid font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[705px] text-[13px] text-white top-[707px] tracking-[0.195px] underline">FAQs</p>
      <div className="absolute h-[581px] left-[168px] top-[158px] w-[520px]" data-name="белая картинка">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[176.25%] left-0 max-w-none top-0 w-[196.92%]" src={img1} />
        </div>
      </div>
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[637px] text-[200px] text-white top-[327px] tracking-[3px]">NIKA</p>
      <div className="absolute bg-[rgba(217,217,217,0.2)] h-[69px] left-[552px] rounded-[25px] top-[619px] w-[337px]" />
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[686px] text-[20px] text-white top-[640px] tracking-[0.3px]">Начать</p>
      <div className="absolute left-[-82px] size-[583px] top-[-1011px]" data-name="IMG_4577 2">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImg45772} />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImg45772} />
          </div>
        </div>
      </div>
    </div>
  );
}