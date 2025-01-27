import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">eBay Clone</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-200">Products</Link>
          <Link to="/cart" className="flex items-center hover:text-blue-200">
            Cart 
            <span className="bg-red-500 text-white rounded-full px-2 ml-1">
              {cartItems.length}
            </span>
          </Link>
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.name}</span>
              <button 
                onClick={() => dispatch(logout())} 
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-200">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;