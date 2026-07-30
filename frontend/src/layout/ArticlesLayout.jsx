import React from 'react';
import { HiTrendingUp } from 'react-icons/hi';

// UPDATE THIS PATH to match where your side navbar component is stored
import DocsSidebar from '../components/navigationBar/DocsSideBar'; 
import HomeNavBar from '../components/navigationBar/HomeNavBar';

export default function ArticlesLayout() {
  // Sample Data for Articles Grid
  const articles = [
    { id: 1, title: "Resolving 'Patient ID Conflict' on Admission", category: "Troubleshooting", views: 1240 },
    { id: 2, title: "How to Override Lab Order Errors Legally", category: "How-To", views: 980 },
    { id: 3, title: "Syncing Offline EMR Data after Network Drops", category: "Troubleshooting", views: 850 },
    { id: 4, title: "Setting up Quick-Templates for Nurse Shift Handovers", category: "Guides", views: 720 },
  ];

  return (
    <div className='h-screen'>
        <HomeNavBar />
        <div className="flex bg-slate-50 text-slate-800 min-h-11/12">
        
        <DocsSidebar />
        <main className="p-8 lg:p-12">
            <div className="max-w-4xl space-y-6">
            
            {/* Section Header */}
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-200">
                <HiTrendingUp className="text-2xl text-emerald-600" />
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Available Documentation Articles</h2>
            </div>
            
            {/* Articles Dynamic Grid Stack */}
            <div className="grid gap-4">
                {articles.map((art) => (
                <div 
                    key={art.id} 
                    className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-emerald-500 transition-all flex items-center justify-between cursor-pointer group"
                >
                    <div className="space-y-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase tracking-wider">
                        {art.category}
                    </span>
                    <h4 className="font-semibold text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {art.title}
                    </h4>
                    </div>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-4">
                    {art.views} clicks this week
                    </span>
                </div>
                ))}
            </div>

            </div>
        </main>

        </div>
    </div>
  );
}