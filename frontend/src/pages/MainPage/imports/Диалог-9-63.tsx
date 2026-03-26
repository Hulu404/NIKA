import imgImage2 from "figma:asset/23ab7528e0cbc70eec16bb3be67f5d33b9e64433.png";
import imgImg45772 from "figma:asset/878ec072e69d54948acfc5eb71cb918512434d5b.png";

function Component1() {
  return <div className="absolute bg-[rgba(23,23,23,0)] h-[900px] left-0 top-[-1px] w-[1440px]" data-name="мейн экран оранж" />;
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="диалог">
      <Component1 />
      <div className="absolute bg-[#fffee7] h-[875px] left-[13px] rounded-[40px] top-[13px] w-[1413px]" data-name="окно чата" />
      <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[normal] left-[483px] text-[#3d1f00] text-[200px] top-[414px] tracking-[3px]">NIKA</p>
      <div className="absolute bg-[rgba(217,217,217,0.2)] h-[69px] left-[551px] rounded-[34.5px] top-[694px] w-[337px]" />
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] left-[685px] text-[#83451e] text-[20px] top-[715px] tracking-[0.3px]">Начать</p>
      <div className="absolute h-[438px] left-[540px] top-[58px] w-[361px]" data-name="image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[176.47%] left-[-56.79%] max-w-none top-[-41.76%] w-[214.29%]" src={imgImage2} />
        </div>
      </div>
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
      <p className="absolute decoration-[8%] decoration-solid font-['Manrope:Regular',sans-serif] font-normal leading-[normal] left-[704px] text-[#3d1f00] text-[13px] top-[782px] tracking-[0.195px] underline">FAQs</p>
    </div>
  );
}