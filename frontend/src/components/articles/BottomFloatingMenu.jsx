import React, { useState, useRef, useEffect } from 'react'
import { HiPlus, HiXMark, HiFolderPlus, HiTag } from 'react-icons/hi2'
import Category from './Category'

export default function BottomFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="fixed bottom-15 right-20 z-50 flex flex-col items-center" ref={menuRef}>
      {isOpen && (
        <div className="mb-4 w-80 max-w-[70vw] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 transition-all duration-200 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600">Quick Actions</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <HiXMark size={16} />
            </button>
          </div>

          <div className="space-y-2">
            <Category />
   

            <button
              onClick={() => {
                console.log('Add Tag clicked')
                setIsOpen(false)
              }}
              className="w-full flex items-center space-x-3 p-2.5 rounded-xl text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
                <HiTag size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">Add Tag</div>
                <div className="text-xs text-gray-400">Attach labels to products</div>
              </div>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-xl flex items-center justify-center transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300 cursor-pointer"
        aria-label="Toggle Menu"
      >
        <HiPlus
          size={28}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        />
      </button>
    </div>
  )
}