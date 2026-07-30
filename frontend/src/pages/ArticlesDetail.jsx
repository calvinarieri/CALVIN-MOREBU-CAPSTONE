import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaEdit, FaTrash, FaThumbsUp, FaThumbsDown, 
  FaChevronLeft, FaChevronRight, FaHistory, FaCheckCircle, 
  FaSpinner, FaLock, FaGlobe 
} from 'react-icons/fa';
import { useDocs } from '../context/DocsContext';

export default function ArticleDetail({ userDict = {} }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { 
    articles, 
    fetchArticleById, 
    deleteArticle, 
    submitFeedback, 
    voteArticle 
  } = useDocs();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  
  const [voteCount, setVoteCount] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchArticleById(id)
      .then((res) => {
        if (isMounted && res?.data) {
          setArticle(res.data);
          setVoteCount(res.data.upvotes || 0);
          setActiveVersionIndex(0);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id, fetchArticleById]);

  const { prevArticle, nextArticle } = useMemo(() => {
    if (!articles || articles.length === 0) return { prevArticle: null, nextArticle: null };
    const currentIndex = articles.findIndex((a) => String(a.id) === String(id));
    if (currentIndex === -1) return { prevArticle: null, nextArticle: null };

    return {
      prevArticle: articles[currentIndex - 1] || null,
      nextArticle: articles[currentIndex + 1] || null,
    };
  }, [articles, id]);

  const isAuthenticated = Boolean(userDict && Object.keys(userDict).length > 0);
  const isSuperUser = Boolean(userDict?.is_superuser);
  const isStaff = Boolean(userDict?.is_staff);
  const isAuthor = Boolean(
    isAuthenticated && 
    article && 
    String(article.author?.id || article.author) === String(userDict?.id)
  );

  const canEdit = isAuthenticated && (isSuperUser || (isStaff && isAuthor));
  const canDelete = isAuthenticated && (isSuperUser || (isStaff && isAuthor));

  const currentVersion = article?.versions?.[activeVersionIndex] || {
    content: article?.content || '<p>No content available.</p>',
    product_version: article?.product_version || 'v1.0',
    created_at: article?.updated_at || article?.created_at,
    changes: 'Initial release'
  };

  const handleDelete = async () => {
    if (!canDelete) return;
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;
    
    setIsDeleting(true);
    const result = await deleteArticle(id);
    setIsDeleting(false);
    
    if (result?.success) {
      navigate('/articles');
    } else {
      alert("Failed to delete article.");
    }
  };

  const handleVote = async (type) => {
    if (userVote === type) return;
    const delta = type === 'up' ? (userVote === 'down' ? 2 : 1) : (userVote === 'up' ? -2 : -1);
    
    setUserVote(type);
    setVoteCount((prev) => prev + delta);

    if (voteArticle) {
      await voteArticle(id, type);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    if (submitFeedback) {
      await submitFeedback(id, { 
        text: feedbackText, 
        rating: userVote,
        user_type: isAuthenticated ? 'user' : 'guest' 
      });
    }
    setFeedbackSubmitted(true);
    setFeedbackText('');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-500">
        <FaSpinner className="animate-spin text-amber-600 text-3xl" />
        <p className="text-sm font-medium">Fetching article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="my-12 p-8 text-center bg-white rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested article could not be found or may have been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"
        >
          <FaArrowLeft size={12} /> Back to Directory
        </button>

        {(canEdit || canDelete) && (
          <div className="flex items-center gap-2">
            {canEdit && (
              <button
                onClick={() => navigate(`/portal/editor/${id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border-amber-200 rounded-lg text-xs font-semibold hover:bg-amber-100 transition"
              >
                <FaEdit size={12} /> Edit Article
              </button>
            )}
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold hover:bg-rose-100 transition disabled:opacity-50"
              >
                {isDeleting ? <FaSpinner className="animate-spin" /> : <FaTrash size={12} />} Delete
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {article.visibility?.toLowerCase() === 'private' ? (
            <span className="flex items-center gap-1 bg-slate-800 text-slate-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              <FaLock size={10} /> Private
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              <FaGlobe size={10} /> Public
            </span>
          )}

          {article.category && (
            <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">
              {article.category.name || article.category}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>

        {article.description && (
          <p className="text-base text-slate-600 leading-relaxed italic border-l-4 border-amber-400 pl-4 py-1">
            {article.description}
          </p>
        )}
      </div>

      {article.versions && article.versions.length > 1 && (
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <FaHistory className="text-amber-600" />
            <span>Version History:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.versions.map((ver, idx) => (
              <button
                key={ver.id || idx}
                onClick={() => setActiveVersionIndex(idx)}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  activeVersionIndex === idx
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {ver.product_version || `v${idx + 1}.0`}
                {idx === 0 && ' (Latest)'}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xs">
        <div 
          className="prose max-w-none prose-slate prose-amber"
          dangerouslySetInnerHTML={{ __html: currentVersion.content }}
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Was this article helpful?</h3>
            <p className="text-xs text-slate-500">Provide feedback to help us improve our documentation.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVote('up')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
                userVote === 'up' 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500'
              }`}
            >
              <FaThumbsUp />
              <span>Upvote ({voteCount})</span>
            </button>

            <button
              onClick={() => handleVote('down')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
                userVote === 'down' 
                  ? 'bg-rose-600 text-white border-rose-600' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-rose-500'
              }`}
            >
              <FaThumbsDown />
            </button>
          </div>
        </div>

        {!feedbackSubmitted ? (
          <form onSubmit={handleFeedbackSubmit} className="space-y-2 pt-2 border-t border-slate-200/60">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tell us what could be improved (optional)..."
              className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
              rows={2}
            />
            <button
              type="submit"
              disabled={!feedbackText.trim()}
              className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 disabled:opacity-40 transition"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
            <FaCheckCircle /> Thank you for your feedback!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
        {prevArticle ? (
          <Link
            to={`/articles/${prevArticle.id}`}
            className="group flex flex-col p-4 border border-slate-200 rounded-xl hover:border-amber-500 transition-all bg-white"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <FaChevronLeft size={8} /> Previous Article
            </span>
            <span className="text-xs font-bold text-slate-800 group-hover:text-amber-600 mt-1 line-clamp-1">
              {prevArticle.title}
            </span>
          </Link>
        ) : <div />}

        {nextArticle && (
          <Link
            to={`/articles/${nextArticle.id}`}
            className="group flex flex-col items-end text-right p-4 border border-slate-200 rounded-xl hover:border-amber-500 transition-all bg-white"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              Next Article <FaChevronRight size={8} />
            </span>
            <span className="text-xs font-bold text-slate-800 group-hover:text-amber-600 mt-1 line-clamp-1">
              {nextArticle.title}
            </span>
          </Link>
        )}
      </div>

    </div>
  );
}