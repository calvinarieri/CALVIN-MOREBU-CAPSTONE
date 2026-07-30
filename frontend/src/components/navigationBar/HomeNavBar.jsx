import React, { useState, useRef, useEffect } from 'react';
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { FaRegUserCircle, FaSpinner, FaFileAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDocs } from '../../context/DocsContext';

export default function HomeNavBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { searchResults, loading, search } = useDocs();

    const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      setIsOpen(true);
      search(value);
    } else {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectArticle = (articleId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/article/${articleId}`);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-xs relative z-50">

      <div className="text-xl font-bold text-gray-800 tracking-tight cursor-pointer">
        <Link to="/">Tiberbu <span className="text-amber-600 font-extrabold">Docs</span></Link>
      </div>

      <div className="relative w-full max-w-md mx-4" ref={searchRef}>
 
        <div className="flex items-center bg-gray-100 hover:bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500 transition-all duration-200 px-4 py-2 rounded-full border border-transparent focus-within:border-amber-500">
          <input 
            type="text" 
            value={query}
            onChange={handleSearchChange}
            onFocus={() => query.trim() && setIsOpen(true)}
            placeholder="Search documentation..." 
            className="w-full bg-transparent text-gray-700 placeholder-gray-500 outline-none pr-2 text-sm" 
          />

          {loading.search ? (
            <FaSpinner className="text-amber-600 text-lg animate-spin" />
          ) : query ? (
            <IoMdClose 
              onClick={handleClear} 
              className="text-gray-400 text-lg cursor-pointer hover:text-gray-600 mr-1" 
            />
          ) : (
            <IoMdSearch className="text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
          )}
        </div>  

        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto divide-y divide-gray-100 z-50">
            {loading.search ? (
              <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin text-amber-600" /> Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleSelectArticle(article.id)}
                  className="p-3.5 hover:bg-amber-50/60 transition-colors cursor-pointer group flex items-start gap-3"
                >
                  <FaFileAlt className="text-amber-500 text-base mt-1 shrink-0 group-hover:text-amber-700" />
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-700">
                        {article.category?.name || 'General'}
                      </span>
                      <h4 className="font-semibold text-sm text-gray-800 group-hover:text-amber-700 truncate">
                        {article.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-snug">
                      {article.description || 'No description available for this article.'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-sm text-gray-500">
                No matching articles found for <span className="font-semibold text-gray-700">"{query}"</span>
              </div>
            )}
          </div>
        )}
      </div>  

      <div className="flex items-center space-x-6 text-sm font-medium text-gray-600">
        <Link to="/articles" className="hover:text-amber-600 transition-colors duration-200">
          Get Started
        </Link>
        <a href="#faqs" className="hover:text-amber-600 transition-colors duration-200">
          Reference
        </a>
        
        {/* Divider */}
        <span className="h-5 w-[1px] bg-gray-300"></span>

        <Link to='/login' className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-xs font-semibold">
          <FaRegUserCircle className="text-lg" />
          <span>Log In</span>
        </Link>
      </div>
    </nav>
  );
}