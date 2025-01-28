// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { setSelectedCategory } from '../redux/productSlice';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = [
    { name: 'Clothes', id: 1 },
    { name: 'Electronics', id: 2 },
    { name: 'Furniture', id: 3 },
    { name: 'Shoes', id: 4 },
    { name: 'Grosery', id: 6 },
  ];
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data.slice(0, 5)); // Limit to 6 categories
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    navigate('/');
  };

  return (
    <div className="bg-white shadow-md">
      {/* Main Navbar */}
      <nav className="bg-white text-black p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <Link to="/" className="text-2xl font-bold">eBay Clone</Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black md:hidden focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`w-full md:w-auto md:flex items-center md:space-x-4 ${
              mobileMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <form onSubmit={handleSearch} className="my-4 md:my-0 flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-2xl text-gray-900 bg-gray-100"
                />
                <button
                  type="submit"
                  className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2"
                >
                  🔍
                </button>
              </div>
            </form>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
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
        </div>
      </nav>

      {/* Categories Bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`py-1 px-4 whitespace-nowrap underline hover:text-blue-600 transition-colors ${
                  location.pathname === '/' ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
