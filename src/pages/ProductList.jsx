import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');

        setCategories(response.data.slice(0,5));
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    // Fetch products
    if (status === 'idle') {
      dispatch(fetchProducts());
    }

    fetchCategories();
  }, [status, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category.id === selectedCategory)
    : products;

  if (status === 'loading') return <div className="text-center py-10">Loading...</div>;
  if (status === 'failed') return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {/* <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All Categories
          </button> */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl"
            >
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">{product.title}</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-bold">${product.price}</span>
                  <span className="text-sm text-gray-500">
                    {product.category.name}
                  </span>
                </div>
                <div className="flex justify-between mt-4">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;