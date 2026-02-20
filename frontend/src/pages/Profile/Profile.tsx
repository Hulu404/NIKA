import { Settings, LogOut, ChevronRight, User } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import svgPathsBack from './imports/svg-n101rx8ak0';
import svgPaths from './imports/svg-nfsr0erm4u';
import { NavLink } from 'react-router-dom';


export default function Profile() {
  return (
    <div className="flex min-h-screen w-full bg-[#fffee7]">
      {/* Sidebar */}
      <aside className="w-[264px] bg-[#faf8f0] flex flex-col p-6 shrink-0 border-r border-[#e8dcc8]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center shadow-md">
            <span className="text-white text-[18px] font-bold">N</span>
          </div>
          <span className="text-[#3d1f00] text-[18px] font-bold">NIKA</span>
        </div>
      
        {/* Back to Dialog Button */}
        <NavLink to='/chat'>
          <button className="w-full flex items-center gap-3 px-4 py-3 mb-6 text-white bg-[#f5a623] hover:bg-[#e59615] rounded-[10px] transition-colors shadow-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={svgPathsBack.p11678e00} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
          <span className="text-[14px]">Назад к диалогу</span>
        </button>
        </NavLink>
        {/* Menu Section */}
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-[#83451e] text-[12px] uppercase tracking-[0.6px] mb-4 px-3 leading-[18px]">
              МЕНЮ
            </h3>
            <nav className="flex flex-col gap-1">
              {/* Личный кабинет  - ACTIVE */}
              <NavLink to='/profile'>
              <a className="flex items-center gap-3 px-3 py-2 text-[#83451e] bg-[#f0e8d8] rounded-[10px] h-[37px]">
                <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  <div className="absolute contents inset-[12.5%_20.83%]">
                    <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]">
                      <div className="absolute inset-[-16.67%_-7.14%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 6.66667">
                          <path d={svgPaths.p18dfb480} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]">
                      <div className="absolute inset-[-12.5%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.3333 8.33334">
                          <path d={svgPaths.p9a07d80} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] leading-[21px]">Личный кабинет</span>
              </a>
              </NavLink>

              {/* Трекер питания */}
              <NavLink to='/food-tracker'>
              <a className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  <div className="absolute contents inset-[10%]">
                    <div className="absolute inset-[10%]">
                      <div className="absolute inset-[-4.69%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
                          <path d={svgPaths.p1b2ea00} stroke="#83451E" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-[42.5%] left-1/2 right-[35%] top-[30%]">
                      <div className="absolute inset-[-13.64%_-25.01%_-13.64%_-25%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.50016 7.00016">
                          <path d="M0.75 0.75V4.75L3.75 6.25" stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] leading-[21px]">Трекер питания</span>
              </a>
              </NavLink>

              {/* Трекер прогресса */}
              <NavLink to="">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  <div className="absolute contents inset-[10%]">
                    <div className="absolute inset-[10%]">
                      <div className="absolute inset-[-5.21%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
                          <path d={svgPaths.p8bb5780} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-[35%] left-1/2 right-[35%] top-[30%]">
                      <div className="absolute inset-[-11.9%_-27.78%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 8.66667">
                          <path d={svgPaths.p2b744180} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] leading-[21px]">Трекер прогресса</span>
              </a>
              </NavLink>
              {/* Дневник эмоций */}
              <NavLink to="/emotion-tracker">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  <div className="absolute contents inset-[10%]">
                    <div className="absolute inset-[10%]">
                      <div className="absolute inset-[-5.21%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
                          <path d={svgPaths.p8bb5780} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[55%_30%_35%_30%]">
                      <div className="absolute inset-[-41.67%_-10.42%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66677 3.66672">
                          <path d={svgPaths.p1f71cf00} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[37.5%_62.46%_62.5%_37.5%]">
                      <div className="absolute inset-[-0.83px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.675 1.66667">
                          <path d="M0.833335 0.833335H0.841665" stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[37.5%_37.46%_62.5%_62.5%]">
                      <div className="absolute inset-[-0.83px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.67497 1.66667">
                          <path d="M0.833335 0.833335H0.841635" stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] leading-[21px]">Дневник эмоций</span>
              </a>
              </NavLink>

              {/* Настройки */}
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors h-[37px]">
                <div className="h-[20px] w-[20px] overflow-clip relative shrink-0">
                  <div className="absolute contents inset-[8.41%_12.68%]">
                    <div className="absolute inset-[8.41%_12.68%]">
                      <div className="absolute inset-[-5.01%_-5.58%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5939 18.3035">
                          <path d={svgPaths.p33ad6400} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[37.5%]">
                      <div className="absolute inset-[-16.67%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
                          <path d={svgPaths.p3d26e2c0} stroke="#83451E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] leading-[21px]">Настройки</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Exit Button */}
        <button className="flex items-center gap-3 px-3 py-2 text-[#83451e] hover:bg-[#f0e8d8] rounded-[10px] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={svgPathsBack.p14ca9100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M17.5 10H7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPathsBack.p38966ca0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
          <span className="text-[14px]">Выйти</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[800px] mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-[#3d1f00] text-[36px] font-normal mb-2">
              Личный кабинет
            </h1>
            <p className="text-[#83451e] text-[14px]">
              Управляйте своим профилем и настройками
            </p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-[20px] p-8 mb-6 shadow-sm">
            <div className="mb-8">
              {/* User Info */}
              <div>
                <h2 className="text-[#3d1f00] text-[24px] font-semibold mb-1">
                  Александр Иванов
                </h2>
                <p className="text-[#83451e] text-[14px] mb-4">
                  alexandr.ivanov@email.com
                </p>
                <div className="flex gap-4">
                  <div className="bg-[#f0e8d8] px-4 py-2 rounded-full">
                    <span className="text-[#83451e] text-[14px]">Плавание</span>
                  </div>
                  <div className="bg-[#f0e8d8] px-4 py-2 rounded-full">
                    <span className="text-[#83451e] text-[14px]">Мужской</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-5">
              {/* Name Fields Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block pl-5 text-[#83451e] text-[14px]">
                    Имя
                  </label>
                  <input
                    type="text"
                    defaultValue="Александр"
                    className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block pl-5 text-[#83451e] text-[14px]">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    defaultValue="Иванов"
                    className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block pl-5 text-[#83451e] text-[14px]">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="alexandr.ivanov@email.com"
                  className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] placeholder:text-[rgba(131,69,30,0.5)] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] transition-colors"
                />
              </div>

              {/* Sport Type */}
              <div className="space-y-2">
                <label className="block pl-5 text-[#83451e] text-[14px]">
                  Вид спорта
                </label>
                <select
                  defaultValue="Плавание"
                  className="w-full h-[56px] px-6 bg-[#faf8f0] rounded-[25px] text-[#3d1f00] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-[#f0e8d8] appearance-none cursor-pointer transition-colors"
                >
                  <option>Плавание</option>
                  <option>Бег</option>
                  <option>Велоспорт</option>
                  <option>Футбол</option>
                  <option>Баскетбол</option>
                  <option>Теннис</option>
                  <option>Волейбол</option>
                </select>
              </div>

              {/* Gender Selection */}
              <div className="space-y-3">
                <label className="block pl-5 text-[#83451e] text-[14px]">
                  Пол
                </label>
                <div className="flex gap-3">
                  <button className="flex-1 h-[56px] bg-[#faf8f0] rounded-[25px] text-[#83451e] text-[16px] hover:bg-[#f0e8d8] transition-colors">
                    Женский
                  </button>
                  <button className="flex-1 h-[56px] bg-[#83451e] rounded-[25px] text-[#fffee7] text-[16px] shadow-md hover:bg-[#6d3918] transition-colors">
                    Мужской
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button className="w-full h-[56px] bg-[#83451e] rounded-[25px] text-[#fffee7] text-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] hover:bg-[#6d3918] transition-colors">
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>

          {/* Additional Settings Card */}
          <div className="bg-white rounded-[20px] p-8 shadow-sm">
            <h3 className="text-[#3d1f00] text-[20px] font-semibold mb-6">
              Дополнительные настройки
            </h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 hover:bg-[#faf8f0] rounded-[15px] transition-colors group">
                <span className="text-[#3d1f00] text-[16px]">Изменить пароль</span>
                <ChevronRight className="text-[#83451e] group-hover:text-[#f5a623] transition-colors" size={20} />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-[#faf8f0] rounded-[15px] transition-colors group">
                <span className="text-[#3d1f00] text-[16px]">О приложении</span>
                <ChevronRight className="text-[#83451e] group-hover:text-[#f5a623] transition-colors" size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
