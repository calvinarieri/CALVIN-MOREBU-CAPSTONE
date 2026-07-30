import React, { useState, useRef, useEffect, useContext } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { ImageResize } from 'tiptap-extension-resize-image';
import { 
  FaBold, FaItalic, FaStrikethrough, FaListUl, FaListOl, 
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, 
  FaLink, FaUnlink, FaHeading, FaImage, FaUpload, FaSpinner 
} from 'react-icons/fa';
import { useDocs } from '../../context/DocsContext';
import ProductChoices from './ProductChoices';
import BottomFloatingMenu from './BottomFloatingMenu';
import { CategoryContext } from '../../context/CategoryProvider';

export default function Editor({ onSave, initialData, isEditing }) {
  const { categories, fetchCategories } = useContext(CategoryContext);
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [visibility, setVisibility] = useState(initialData?.visibility || 'PUBLIC');
  const [status, setStatus] = useState(initialData?.status || 'PUBLISHED');
  const [productVersion, setProductVersion] = useState(initialData?.product_version || '');
  const [changes, setChanges] = useState(initialData?.changes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      Color,
      ImageResize.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4 inline-block',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none outline-none p-6 border-0 ring-0 min-h-full',
      },
    },
    content: initialData?.content || '<p>Start writing your article content here...</p>',
  });

  // Keep editor content synchronized if initialData updates
  useEffect(() => {
    if (editor && initialData?.content) {
      editor.commands.setContent(initialData.content);
    }
  }, [initialData, editor]);

  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImageUrl = () => {
    if (!editor) return;
    const url = window.prompt('Enter Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.chain().focus().setImage({ src: event.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editor) return;

    setIsSubmitting(true);
    const contentHtml = editor.getHTML();

    await onSave({
      title,
      description,
      category: category || null,
      visibility,
      status,
      product_version: productVersion,
      content: contentHtml,
      changes: changes,

    });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full h-screen p-6 bg-gray-50 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Article' : 'New Article Editor'}
          </h1>
          <p className="text-sm text-gray-500">
            {isEditing ? 'Modify content and publish updated metadata.' : 'Draft your content and manage release metadata.'}
          </p>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="py-2.5 px-6 bg-amber-700 hover:bg-amber-600 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-xs transition duration-150 ease-in-out focus:outline-none h-fit whitespace-nowrap flex items-center gap-2"
        >
          {isSubmitting && <FaSpinner className="animate-spin text-sm" />}
          {isEditing ? 'Update & Save Changes' : 'Save & Publish Version'}
        </button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 items-stretch">
        
        {/* Editor Container */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden flex flex-col h-full">
          {editor && (
            <div className="flex flex-wrap gap-1 items-center p-3 bg-gray-50 border-b border-gray-200 select-none shrink-0">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('bold') ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Bold"
              >
                <FaBold size={14} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('italic') ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Italic"
              >
                <FaItalic size={14} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('strike') ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Strike"
              >
                <FaStrikethrough size={14} />
              </button>
              
              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 flex items-center gap-0.5 rounded hover:bg-gray-200 transition ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Heading 1"
              >
                <FaHeading size={12} /><span>1</span>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 flex items-center gap-0.5 rounded hover:bg-gray-200 transition ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Heading 2"
              >
                <FaHeading size={12} /><span>2</span>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 flex items-center gap-0.5 rounded hover:bg-gray-200 transition ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Heading 3"
              >
                <FaHeading size={12} /><span>3</span>
              </button>

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('bulletList') ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Bullet List"
              >
                <FaListUl size={14} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('orderedList') ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Ordered List"
              >
                <FaListOl size={14} />
              </button>

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Align Left"
              >
                <FaAlignLeft size={14} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Align Center"
              >
                <FaAlignCenter size={14} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Align Right"
              >
                <FaAlignRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`}
                title="Align Justify"
              >
                <FaAlignJustify size={14} />
              </button>

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              <button
                type="button"
                onClick={setLink}
                className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('link') ? 'bg-gray-300 text-blue-600' : 'text-gray-600'}`}
                title="Add Link"
              >
                <FaLink size={14} />
              </button>
              {editor.isActive('link') && (
                <button
                  type="button"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                  title="Remove Link"
                >
                  <FaUnlink size={14} />
                </button>
              )}

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              <button
                type="button"
                onClick={addImageUrl}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded transition"
                title="Insert Image Link"
              >
                <FaImage size={14} />
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded transition"
                title="Upload Image File"
              >
                <FaUpload size={14} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              <input
                type="color"
                onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
                value={editor.getAttributes('textStyle').color || '#000000'}
                className="w-6 h-6 p-0 border-0 cursor-pointer rounded-sm bg-transparent"
                title="Text Color"
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto min-h-0 bg-white">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar Metadata Config */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-xs shrink-0 h-full overflow-y-auto">
          <h2 className="text-md font-semibold text-gray-900 pb-2 border-b border-gray-100">Release Metadata</h2>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="e.g., Working with Hooks"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm bg-white"
            >
              <option value="">Select Category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-xs bg-white"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-xs bg-white"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Brief summary of the article..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm h-24 resize-none"
            />
          </div>
          <ProductChoices handleSelectedProduct={(value)=> setProductVersion(value)} />

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Version Changes Log</label>
            <input 
              type="text" 
              value={changes} 
              onChange={(e) => setChanges(e.target.value)} 
              placeholder="e.g., Fixed typos, updated images"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

      </div>
      <BottomFloatingMenu />
    </form>
  );
}