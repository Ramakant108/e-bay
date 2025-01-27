import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return; 
    }
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  if (!selectedProduct) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={selectedProduct.images[0]} 
            alt={selectedProduct.title} 
            className="w-full rounded-lg shadow-md"
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {selectedProduct.images.slice(1).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${selectedProduct.title} ${index + 2}`} 
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.title}</h1>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          <div className="mb-4">
            <span className="text-2xl font-semibold text-green-600">
              ${selectedProduct.price}
            </span>
          </div>
          <div className="mb-4">
            <strong>Category:</strong> {selectedProduct.category.name}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;