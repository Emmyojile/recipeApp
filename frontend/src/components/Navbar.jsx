import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';


export default function Navbar() {

  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    axios.post('auth/logout');
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
  }

  return (
    <div className='navbar'>
      <Toaster position="top-right" toastOptions={{duration: 3000}}/>
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      {!cookies.access_token ? (<>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>) : (
        <>
        <Link to="/saved-recipe">Saved Recipe</Link>
        <Link to="/" onClick={logout}>Logout</Link>
        </>
      )}
    </div>
);
};
