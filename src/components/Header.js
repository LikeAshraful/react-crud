import React, { useState, useEffect } from "react";
import { checkAuth } from "../AuthService";
import axiosInstance from "./axiosInstance";
import { Link, useNavigate } from "react-router-dom";



const Hero = () => {
  return (
    <>
      <Navbar />     
    </>
  );
};

export default Hero;


const Navbar = () => {

  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await checkAuth();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } 
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    setUser(null);
    axiosInstance.post('/logout');
    localStorage.removeItem("token");
    navigate('/login');
  };




  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link to="/" className="block w-full px-10 py-5">
              <h2 className="uppercase">ClickPack</h2>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/">Home</ListItem>
                  <ListItem NavLink="/inventories">Inventory Management</ListItem>               
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">

              {user ? (
                <button
                onClick={handleSignOut}
                className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
              >
                Sign out
              </button>
              ) : (
                <>
                <Link to="/login" className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white" > Sign in </Link>
              

              <Link to="/sign-up" className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
              > Sign Up </Link>
              </>
            )}
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <Link to={NavLink} className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex" >
          {children}
        </Link>
      </li>
    </>
  );
};
