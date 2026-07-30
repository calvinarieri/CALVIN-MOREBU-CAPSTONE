import React, { createContext, useContext, useState, useCallback } from 'react';
import * as api from '../api/articles';

const DocsContext = createContext();

export const DocsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [staffArticles, setStaffArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [tags, setTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  const [loading, setLoading] = useState({
    articles: false,
    tags: false,
    search: false,
    action: false,
  });

  const [error, setError] = useState(null);

  const setLoadingState = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const fetchArticles = useCallback(async () => {
    setLoadingState('articles', true);
    setError(null);
    const res = await api.getArticles();
    if (res.success) {
      setArticles(res.data);
    } else {
      setError(res.data);
    }
    setLoadingState('articles', false);
  }, []);

  const fetchStaffArticles = useCallback(async () => {
    setLoadingState('articles', true);
    setError(null);
    const res = await api.getStaffArticles();
    if (res.success) {
      setStaffArticles(res.data);
    } else {
      setError(res.data);
    }
    setLoadingState('articles', false);
  }, []);

  const fetchArticleById = useCallback(async (id) => {
    setLoadingState('articles', true);
    setError(null);
    const res = await api.getArticleById(id);
    if (res.success) {
      setCurrentArticle(res.data);
    } else {
      setError(res.data);
    }
    setLoadingState('articles', false);
    return res;
  }, []);

  const createNewArticle = async (articleData) => {
    setLoadingState('action', true);
    const res = await api.createArticle(articleData);
    if (res.success) {
      setArticles((prev) => [res.data, ...prev]);
    } else {
      setError(res.data);
    }
    setLoadingState('action', false);
    return res;
  };

  const editArticle = async (id, data, isPartial = false) => {
    setLoadingState('action', true);
    const updateFn = isPartial ? api.patchArticle : api.updateArticle;
    const res = await updateFn(id, data);
    
    if (res.success) {
      setArticles((prev) => prev.map((item) => (item.id === id ? res.data : item)));
      if (currentArticle?.id === id) {
        setCurrentArticle(res.data);
      }
    } else {
      setError(res.data);
    }
    setLoadingState('action', false);
    return res;
  };

  const removeArticle = async (id) => {
    setLoadingState('action', true);
    const res = await api.deleteArticle(id);
    if (res.success) {
      setArticles((prev) => prev.filter((item) => item.id !== id));
      if (currentArticle?.id === id) setCurrentArticle(null);
    } else {
      setError(res.data);
    }
    setLoadingState('action', false);
    return res;
  };

  const search = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setLoadingState('search', true);
    setError(null);
    const res = await api.searchArticles(query);
    if (res.success) {
      setSearchResults(res.data.results || []);
    } else {
      setError(res.data);
    }
    setLoadingState('search', false);
    return res;
  }, []);

  const fetchTags = useCallback(async () => {
    setLoadingState('tags', true);
    const res = await api.getTags();
    if (res.success) setTags(res.data);
    setLoadingState('tags', false);
  }, []);

  return (
    <DocsContext.Provider
      value={{
        articles,
        staffArticles,
        currentArticle,
        tags,
        searchResults,
        loading,
        error,
        fetchArticles,
        fetchStaffArticles,
        fetchArticleById,
        createNewArticle,
        editArticle,
        removeArticle,
        search,
        fetchTags,
        setError,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
};

export const useDocs = () => {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return context;
};