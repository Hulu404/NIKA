import ChatPage from "../ChatPage/ChatPage";
import svgPaths from "./imports/svg-tyd27m3zhp";
import { WifiOff } from "lucide-react";

function WifiOffIcon() {
  return (
    <div className="size-[64px] flex items-center justify-center" data-name="wifi_off_icon">
      <WifiOff className="w-12 h-12 text-[#F6B044]" strokeWidth={2.5} />
    </div>
  );
}

function ConnectionErrorModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphism Modal */}
      <div 
        className="relative w-full max-w-[420px] rounded-[32px] bg-white/85 backdrop-blur-[25px] border-[1.5px] border-white p-10 flex flex-col items-center"
        style={{
          boxShadow: '0px 40px 80px 0px rgba(61, 43, 31, 0.25)'
        }}
      >
        {/* Icon */}
        <WifiOffIcon />
        
        {/* Title */}
        <h2 className="mt-6 text-[#2D3625] font-bold text-[24px] text-center leading-tight">
          Ошибка подключения
        </h2>
        
        {/* Body Text */}
        <p className="mt-4 text-[#6A7466] text-[16px] text-center leading-relaxed max-w-[340px]">
          Проверьте соединение с интернетом и попробуйте снова.
        </p>
        
        {/* Buttons */}
        <div className="mt-8 w-full flex flex-col gap-3">
          {/* Primary Button - Try Again */}
          <button 
            className="w-full h-[56px] rounded-[28px] bg-[#F6B044] text-white font-bold text-[16px] shadow-[0px_4px_12px_0px_rgba(246,176,68,0.3)] hover:bg-[#f5a832] transition-colors"
          >
            Попробовать снова
          </button>
          
          {/* Secondary Button - Go Back */}
          <button 
            className="w-full h-[56px] rounded-[28px] bg-transparent border-[1px] border-[#5A6444] text-[#5A6444] font-medium text-[16px] hover:bg-[#5A6444]/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-0">
              <path 
                d="M10 12L6 8L10 4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConnectionError() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF7EC]">
      {/* Background Chat Interface - Blurred */}
      <div className="absolute inset-0">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        {/* Blurred Chat Background */}
        <div className="absolute inset-0 blur-[8px]">
          <ChatPage />
        </div>
      </div>
      
      {/* Connection Error Modal */}
      <ConnectionErrorModal />
    </div>
  );
}
