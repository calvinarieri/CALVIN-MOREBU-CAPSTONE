import React, { useState } from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';


const sampleDocRoutes = [
  { title: "Getting Started", path: "#get-started" },
  {
    title: "Patient Management",
    children: [
      { title: "Admission Workflow", path: "#admission" },
      { title: "Triage & Vitals", path: "#triage" },
      {
        title: "Discharge Rules",
        children: [
          { title: "Legal Requirements", path: "#legal" },
          { title: "Billing Clearance", path: "#billing" },
        ],
      },
    ],
  },
  {
    title: "Diagnostics & Labs",
    children: [
      { title: "Ordering Lab Tests", path: "#lab-orders" },
      { title: "Overriding Result Errors", path: "#lab-errors" },
    ],
  },
  { title: "System Troubleshooting", path: "#fixes" },
];


function SidebarNavItem({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full">
     
      <a
        href={item.path || '#'}
        onClick={handleToggle}
        className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 group cursor-pointer
          ${hasChildren ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'}
        `}
        style={{ paddingLeft: `${Math.max(depth * 12, 12)}px` }}
      >
        <span className="truncate">{item.title}</span>
        
        {/* Toggle Arrow indicators */}
        {hasChildren && (
          <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
            {isOpen ? <HiChevronDown className="w-4 h-4" /> : <HiChevronRight className="w-4 h-4" />}
          </span>
        )}
      </a>

      {/* Nested Children Sub-tree block */}
      {hasChildren && isOpen && (
        <div className="mt-1 ml-3 border-l border-slate-200/80 space-y-1" role="group">
          {item.children.map((child, index) => (
            <SidebarNavItem 
              key={child.title + index} 
              item={child} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default function DocsSidebar() {
  return (
    <aside className="w-64 pt-8 bg-white border-r border-slate-200 p-4 flex flex-col justify-between overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Documentation Modules
          </h3>
          <nav className="space-y-1 flex flex-col">
            {sampleDocRoutes.map((route, index) => (
              <SidebarNavItem key={route.title + index} item={route} />
            ))}
          </nav>
        </div>
      </div>

      
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 mt-auto">
        <h4 className="text-xs font-bold text-slate-900">Stuck on a workflow?</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Search the core error code directly in the top search engine for hot patches.
        </p>
      </div>
    </aside>
  );
}