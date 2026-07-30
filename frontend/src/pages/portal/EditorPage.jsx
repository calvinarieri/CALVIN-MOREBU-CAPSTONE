import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import Editor from '../../components/articles/Editor';
import { useDocs } from '../../context/DocsContext';

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchArticleById, createNewArticle, editArticle } = useDocs();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  // Fetch Article details if in edit mode (when `id` exists)
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchArticleById(id)
        .then((res) => {
          if (res.success && res.data) {
            const article = res.data;
            const latestVersion = article.versions?.[0] || {};
            
            setInitialData({
              id: article.id,
              title: article.title || '',
              description: article.description || '',
              category: article.category?.id || article.category || '',
              visibility: article.visibility || 'PUBLIC',
              status: article.status || 'PUBLISHED',
              product_version: latestVersion.product_version || '',
              changes: latestVersion.changes || '',
              content: latestVersion.content || '<p></p>',
            });
          } else {
            setError('Failed to load article data.');
          }
        })
        .catch(() => setError('Error retrieving article.'))
        .finally(() => setLoading(false));
    }
  }, [id, fetchArticleById]);

  // Handle Article Creation or Update Submission
  const handleSave = async (payload) => {
    let result;
    
    if (id) {
      // Edit Mode
      result = await editArticle(id, payload);
    } else {
      // Create Mode
      result = await createNewArticle(payload);
    }

    if (result && result.success) {
      navigate('/portal/articles');
    } else {
      alert(`Save failed: ${JSON.stringify(result?.data || 'Unknown error')}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-3">
        <FaSpinner className="animate-spin text-blue-600 text-3xl" />
        <p className="text-sm text-gray-500 font-medium">Loading article details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-3">
        <p className="text-red-600 font-semibold">{error}</p>
        <button 
          onClick={() => navigate('/portal/articles')}
          className="text-sm bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return <Editor onSave={handleSave} initialData={initialData} isEditing={!!id} />;
}