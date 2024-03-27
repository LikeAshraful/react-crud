import React from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './components/Header';

const Layouts = ({ hideHeaderPaths = ['/sign-up', '/login'] }) => {
  const { pathname } = useLocation();

  return (

    <div className="max-auto">
      {!hideHeaderPaths.includes(pathname) && <Header />}
      <Outlet /> 
    </div>
  )
}

export default Layouts