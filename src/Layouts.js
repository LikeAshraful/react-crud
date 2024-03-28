import React from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './components/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layouts = ({ hideHeaderPaths = ['/sign-up', '/login'] }) => {
  const { pathname } = useLocation();

  return (

    <div className="max-auto">
      <ToastContainer />
      {!hideHeaderPaths.includes(pathname) && <Header />}
      <Outlet /> 
    </div>
  )
}

export default Layouts