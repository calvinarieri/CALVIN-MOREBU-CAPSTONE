import React from 'react';
import { FaLongArrowAltRight, FaImage } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Card({ article }) {
  if (!article) return null;

  const { id, title, description, visibility, status, images, category } = article;

  const displayStatus = visibility?.toLowerCase() === 'private' ? 'private' : status?.toLowerCase();

  const getStatusTag = (tagStatus) => {
    const baseStyle = "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm z-10";
    switch (tagStatus) {
      case 'published':
        return <span className={`${baseStyle} bg-emerald-100 text-emerald-800 border border-emerald-200`}>Published</span>;
      case 'pending':
        return <span className={`${baseStyle} bg-amber-100 text-amber-800 border border-amber-200`}>Pending</span>;
      case 'private':
        return <span className={`${baseStyle} bg-slate-800 text-slate-100`}>Private</span>;
      default:
        return <span className={`${baseStyle} bg-blue-100 text-blue-800 border border-blue-200`}>Public</span>;
    }
  };

  const coverImageUrl = images && images.length > 0 ? images[0].image : null;

  return (
    <div className='w-full bg-white border border-slate-200/80 overflow-hidden rounded-xl shadow-xs transition-all duration-200 hover:shadow-md hover:border-amber-400 flex flex-col justify-between group'>
      <div>
        <div className='relative overflow-hidden h-44 bg-slate-100 flex items-center justify-center'>
          {coverImageUrl ? (
            <img 
              src={coverImageUrl} 
              alt={title} 
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <FaImage size={28} />
              <span className="text-xs mt-1 font-medium">No Preview</span>
            </div>
          )}
          {getStatusTag(displayStatus)}
          
          {category && (
            <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              {category.name || category}
            </span>
          )}
        </div>

        <div className='p-4 gap-2 flex flex-col'>
          <h2 className='text-base font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors'>
            {title}
          </h2>
          <p className='text-xs leading-relaxed text-slate-600 line-clamp-3'>
            {description || 'No summary description provided for this article.'}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link 
          to={`/portal/article/${id}`} 
          className='group/link flex items-center gap-2 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:text-amber-700'
        >
          Read article 
          <FaLongArrowAltRight className="transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}