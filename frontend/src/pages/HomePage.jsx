import React, { useState, useEffect } from 'react';
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { FaBookOpen, FaQuestionCircle, FaTools, FaStethoscope, FaSpinner } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { Link } from 'react-router-dom';
import HomeNavBar from '../components/navigationBar/HomeNavBar';
import { useDocs } from '../context/DocsContext'; // Context Hook Import

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Consume Context
  const { 
    articles, 
    searchResults, 
    loading, 
    search, 
    fetchArticles 
  } = useDocs();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    search(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    search('');
  };

  const faqs = [
    { q: "Why is my electronic prescription failing to sign?", a: "Ensure your digital security certificate is renewed under Account Settings or check if the mandatory ICD-10 code field is filled." },
    { q: "How do I print a billing summary if the module freezes?", a: "Use the local cache bypass command (Ctrl + Shift + R) or retrieve the transaction backup via the Registry logs." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <HomeNavBar />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight">
            Fast Answers for Clinical Workflows
          </h1>
          <p className="text-slate-300 mt-3 text-lg max-w-xl mx-auto">
            Bypass the support queue. Fix HIMS system glitches, find local workarounds and get back to patient care instantly.
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 flex items-center bg-white text-slate-800 rounded-xl shadow-xl overflow-hidden max-w-2xl mx-auto p-2 border border-slate-700 relative">
            <IoMdSearch className="text-slate-400 text-2xl ml-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Search errors, codes, or modules (e.g., 'triage freeze', 'ICD-10 sync')..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent px-3 py-2 text-base outline-none placeholder-slate-400"
            />

            {searchQuery && (
              <button 
                onClick={handleClearSearch}
                className="text-slate-400 hover:text-slate-600 p-1 mr-2"
                aria-label="Clear Search"
              >
                <IoMdClose className="text-xl" />
              </button>
            )}

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm whitespace-nowrap flex items-center gap-2">
              {loading.search && <FaSpinner className="animate-spin text-sm" />}
              Search Docs
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div id="get-started" className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg w-fit mb-4">
              <FaTools className="text-xl" />
            </div>
            <h3 className="text-lg font-bold mb-2">Fixes & Troubleshooting</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Hardware disconnects, system lag patches, printer calibration, and data sync recovery tools.
            </p>
            <a href="#fixes" className="text-emerald-600 font-semibold text-sm hover:underline">Browse fixes →</a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg w-fit mb-4">
              <FaBookOpen className="text-xl" />
            </div>
            <h3 className="text-lg font-bold mb-2">How-To Materials</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Step-by-step interactive walk-throughs for admissions, triaging, pharmacy dispensing, and discharge workflows.
            </p>
            <a href="#how-tos" className="text-indigo-600 font-semibold text-sm hover:underline">View tutorials →</a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg w-fit mb-4">
              <FaStethoscope className="text-xl" />
            </div>
            <h3 className="text-lg font-bold mb-2">Clinical FAQ</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Answers verified by IT and Medical directors tailored around hospital legal compliance and EMR usage.
            </p>
            <a href="#faqs" className="text-amber-600 font-semibold text-sm hover:underline">Read FAQs →</a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <HiTrendingUp className="text-xl text-emerald-600" />
                <h2 className="text-2xl font-bold tracking-tight">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Most Visited Articles'}
                </h2>
              </div>
              {searchQuery && (
                <span className="text-sm font-medium text-slate-500">
                  Found {searchResults.length} result(s)
                </span>
              )}
            </div>
            
            {loading.search || loading.articles ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <FaSpinner className="animate-spin text-emerald-600 text-2xl mx-auto mb-2" />
                <p className="text-slate-500 text-sm">Searching knowledge base...</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {searchQuery ? (
                  searchResults.length > 0 ? (
                    searchResults.map((art) => (
                      <Link 
                        to={`/articles/${art.id}`} 
                        key={art.id} 
                        className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-500 transition-all flex items-center justify-between cursor-pointer group shadow-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">
                              {art.category?.name || 'General'}
                            </span>
                            {art.visibility === 'PRIVATE' && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700 uppercase">
                                Internal
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-slate-800 mt-1 group-hover:text-emerald-700 transition-colors">
                            {art.title}
                          </h4>
                          {art.description && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{art.description}</p>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                      <p className="text-slate-600 font-medium">No matching articles found.</p>
                      <p className="text-slate-400 text-xs mt-1">Try refining your search terms or search for generic error codes.</p>
                    </div>
                  )
                ) : (
                  articles.map((art) => (
                    <Link 
                      to={`/articles/${art.id}`} 
                      key={art.id} 
                      className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-500 transition-all flex items-center justify-between cursor-pointer group shadow-xs"
                    >
                      <div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">
                          {art.category?.name || 'General'}
                        </span>
                        <h4 className="font-semibold text-slate-800 mt-1 group-hover:text-emerald-700 transition-colors">
                          {art.title}
                        </h4>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </section>

          <section id="faqs" className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <FaQuestionCircle className="text-xl text-indigo-600" />
              <h2 className="text-xl font-bold tracking-tight">Top FAQs</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="font-semibold text-sm text-slate-900 flex items-start gap-1">
                    <span className="text-emerald-600 font-bold">Q:</span> {faq.q}
                  </h4>
                  <p className="text-slate-600 text-xs pl-4 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 text-xs py-8 text-center border-t border-slate-800 mt-16">
        <p>© 2026 Tiberbu HIMS Systems. For urgent life-critical infrastructure downtime, call internal line ext. 4911.</p>
      </footer>
    </div>
  );
}