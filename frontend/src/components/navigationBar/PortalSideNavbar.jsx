import React, { useState } from 'react';

import { 

  FaUsers, 
  FaLock, 
  FaGear, 
  FaCircleQuestion,
  FaArrowRightFromBracket,
  FaBars,
  FaXmark,
  FaChevronDown,
  FaChevronRight,
  FaCompass,
  FaUser,
} from 'react-icons/fa6';
import { MdDashboard, MdArticle, MdApps } from 'react-icons/md';
import { SiGoogledocs } from "react-icons/si";

export default function PortalSideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Navigation Structure with Solid Icons
  const navItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard className="text-xl flex-shrink-0" />,
      path: "/portal/dashboard"
    },
    {
      title: "Products",
      icon: <MdApps className="text-xl flex-shrink-0" />,
      path: "/portal/products"
    },
    {
      title: "Article",
      icon: <MdArticle className="text-xl flex-shrink-0" />,
      path: "/portal/articles",
    },
    {
      title: "Staff",
      icon: <FaUser className="text-xl flex-shrink-0" />,
      path: "/portal/staff"
    },

    {
      title: "Settings",
      icon: <FaGear className="text-xl flex-shrink-0" />,
      path: "/settings"
    },
  ];

  const toggleSubmenu = (index) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <>
      <div className="flex items-center justify-between text-slate-500 p-4 md:hidden border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">Tiberbu</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-1.5 rounded-md hover:bg-slate-800 focus:outline-none transition-colors"
        >
          {isMobileOpen ? <FaXmark className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      <aside 
        className={`
          h-screen bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
      >
        <div>
          <div className="flex items-center justify-between p-4 border-b border-slate-800 min-h-[73px]">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className={`font-bold text-xl text-white transition-opacity duration-200 ${isCollapsed ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>
                Tiberbu
              </span>
            </div>
            
            <button 
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                setOpenSubmenu(null); 
              }}
              className="hidden md:block p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <FaBars className="text-sm" />
            </button>
          </div>

          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item, index) => {
              const hasSubRoutes = !!item.subRoutes;
              const isSubmenuOpen = openSubmenu === index;

              return (
                <div key={index} className="w-full">
                  {hasSubRoutes ? (
                    // Button Trigger for dropdown routes
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white
                        ${isSubmenuOpen ? 'bg-slate-800/50 text-white' : ''}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className={`font-medium transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                          {item.title}
                        </span>
                      </div>
                      {!isCollapsed && (
                        <span className="text-xs">
                          {isSubmenuOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </span>
                      )}
                    </button>
                  ) : (

                    <a
                      href={item.path}
                      className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white font-medium"
                    >
                      {item.icon}
                      <span className={`transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                        {item.title}
                      </span>
                    </a>
                  )}

                  {hasSubRoutes && isSubmenuOpen && !isCollapsed && (
                    <div className="mt-1 ml-9 pl-3 border-l border-slate-800 space-y-1">
                      {item.subRoutes.map((sub, subIdx) => (
                        <a
                          key={subIdx}
                          href={sub.path}
                          className="block p-2 text-sm text-slate-400 hover:text-white rounded-md transition-colors hover:bg-slate-800/30"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <FaArrowRightFromBracket className="text-xl flex-shrink-0" />
            <span className={`font-medium transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}