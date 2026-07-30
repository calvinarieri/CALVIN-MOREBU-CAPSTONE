import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalSideNavbar from '../components/navigationBar/PortalSideNavbar'
import { ProductProvider } from '../context/ProductsProvider'
import { StaffProvider } from '../context/StaffProvider'
import { CategoryProvider } from '../context/CategoryProvider'

export default function PortalLayout() {
  return (
    <div className='flex h-screen w-screen'>
      <ProductProvider>
        <StaffProvider>
          <PortalSideNavbar />
            <CategoryProvider>
              <div className='flex-1 h-screen overflow-auto px-8 py-8'>
                <Outlet />
              </div>
            </CategoryProvider>
        </StaffProvider>
      </ProductProvider>

    </div>
  )
}
