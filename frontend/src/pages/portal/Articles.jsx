import React, { useEffect, useState, useMemo } from 'react';
import { IoMdAdd } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Card from '../../components/articles/Card';
import Search from '../../components/articles/Search';
import { useDocs } from '../../context/DocsContext';

export default function Articles() {
  const { articles, loading, fetchArticles } = useDocs();

  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [orderBy, setOrderBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleClearAll = () => {
    setSearchQuery('');
    setStatus('');
    setOrderBy('newest');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        const matchesQuery = searchQuery.trim() === '' || 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = !status || 
          (status === 'private' && article.visibility?.toLowerCase() === 'private') ||
          (status !== 'private' && article.status?.toLowerCase() === status.toLowerCase());

        const matchesCategory = !selectedCategory || 
          article.category?.name === selectedCategory || 
          article.category === selectedCategory;

        const articleTagNames = article.article_tags?.map(t => t.tag?.name || t.tag) || [];
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.every(tag => articleTagNames.includes(tag));

        return matchesQuery && matchesStatus && matchesCategory && matchesTags;
      })
      .sort((a, b) => {
        if (orderBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        if (orderBy === 'oldest') {
          return new Date(a.created_at || a.id) - new Date(b.created_at || b.id);
        }
        return new Date(b.created_at || b.id) - new Date(a.created_at || a.id);
      });
  }, [articles, searchQuery, status, selectedCategory, selectedTags, orderBy]);

  return (
    <div className='w-full  px-4 py-6 space-y-6'>
      <nav className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Articles Directory</h1>
          <p className='text-slate-500 text-sm mt-1'>
            Explore clinical knowledge base articles, standard operating procedures, and troubleshooting guides.
          </p>
        </div>
        <div>
          <Link 
            to='/portal/editor' 
            className='bg-amber-600 hover:bg-amber-700 transition-colors text-white text-sm px-4 py-2.5 font-bold rounded-lg flex items-center gap-2 shadow-xs'
          >
            <IoMdAdd className="text-lg" /> Create Article
          </Link>
        </div>
      </nav>

      <Search 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        status={status} setStatus={setStatus}
        orderBy={orderBy} setOrderBy={setOrderBy}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
        onClearAll={handleClearAll}
      />

      {loading.articles ? (
        <div className='flex flex-col items-center justify-center py-20 text-slate-500 gap-3'>
          <FaSpinner className="animate-spin text-amber-600 text-3xl" />
          <p className="text-sm font-medium">Loading articles...</p>
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredArticles.map((article) => (
            <Card key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className='bg-slate-50 border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-500'>
          <p className='text-base font-semibold text-slate-700'>No articles match your criteria.</p>
          <p className='text-xs mt-1 text-slate-400'>Try adjusting your search terms or clearing your filters.</p>
          <button 
            onClick={handleClearAll} 
            className='mt-4 text-xs font-bold text-amber-600 hover:underline'
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}