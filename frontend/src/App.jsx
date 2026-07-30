import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { DocsProvider } from './context/DocsContext'
import StaffPage from './pages/portal/StaffPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const ArticlesLayout = lazy(() => import('./layout/ArticlesLayout'))
const LogIn = lazy(() => import('./pages/auth/LogIn'))
const ChatWidget = lazy(() => import('./pages/ChatWidget'))
const ArticleDetail = lazy(() => import('./pages/ArticlesDetail'))
const PortalLayout = lazy(() => import('./layout/PortalLayout'))
const Articles = lazy(() => import('./pages/portal/Articles'))
const Products = lazy(() => import('./pages/portal/Products'))
const EditorPage = lazy(() => import('./pages/portal/EditorPage'))

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    Loading...
  </div>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route index element={<HomePage />} />
        <Route path='/article' element={<ArticlesLayout />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/chat' element={<ChatWidget />} />
        <Route path='/article/:id' element={<ArticleDetail />} />
        <Route path='/portal' element={<PortalLayout />}>
          <Route path='articles' element={<Articles />} />
          <Route path='products' element={<Products />} />
          <Route path='staff' element={<StaffPage />} />
          <Route path='editor' element={<EditorPage />} />
          <Route path='article/:id' element={<ArticleDetail />} />
          <Route path='editor/:id' element={<EditorPage />} />
          <Route path='*' element={<div>Not Found</div>} />
        </Route>
    </Route>
  )
)

export default function App() {
  return (
    <div>
      <DocsProvider>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </DocsProvider>        
    </div>
  )
}