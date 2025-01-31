import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';

// Hero Component - You can also move this to a separate file

const carouselItems = [
  {
    id: 1,
    title: 'Everything you want and more',
    subtitle: 'ELECTRONICS',
    description: 'Choose from a vast selection of new tech.',
    imageUrl: 'https://i.ebayimg.com/images/g/cYIAAOSwJI9nhSIl/s-l960.png',
    buttonText: 'Show new electronics',
    buttonLink: '/',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-500'
  },
  {
    id: 2,
    title: 'Your tech, your way',
    subtitle: 'REFURBISHED',
    description: 'Choose from a vast selection of refurbished tech.',
    imageUrl: 'https://i.ebayimg.com/images/g/C2gAAOSwo7dnhSiq/s-l960.png',
    buttonText: "It's up to you",
    buttonLink: '/',
    bgColor: 'bg-green-600',
    textColor: 'text-white'
  }
];
const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white flex flex-col gap-4 mt-4 mb-8">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`rounded-2xl px-8  shadow-lg transition-opacity duration-1000 ${item.bgColor} ${
            index === activeIndex ? 'block' : 'hidden'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className={`text-lg ${item.textColor} mb-2 block`}>{item.subtitle}</span>
              <h1 className={`text-4xl font-bold mb-4 ${item.textColor}`}>{item.title}</h1>
              <p className={`text-xl mb-6 ${item.textColor}`}>{item.description}</p>
              <Link
                to={item.buttonLink}
                className={`inline-block px-6 py-3 rounded-full transition-colors ${
                  item.bgColor === 'bg-green-600' ? 'bg-white text-green-700 hover:bg-gray-200' :
                  item.bgColor === 'bg-blue-100' ? 'bg-gray-800 text-white hover:bg-gray-900' :
                  'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {item.buttonText}
              </Link>
            </div>
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={`${item.subtitle} showcase`}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  
  const { 
    items: products, 
    selectedCategory,
    status, 
    error 
  } = useSelector((state) => state.products);

  useEffect(() =>{
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    if(searchQuery){
      const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery);
    return matchesSearch;
    }
    const matchesCategory = !selectedCategory || product.category.id === selectedCategory;
    // const matchesSearch = !searchQuery || 
    //   product.title.toLowerCase().includes(searchQuery) ||
    //   product.description.toLowerCase().includes(searchQuery);
    return matchesCategory;
  });

  if (status === 'loading') {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    ( !selectedCategory&&!searchQuery) ? <Hero />:
    <div className="min-h-screen bg-gray-100">
      {/* Show Hero section only when no category is selected and no search query */}
      {/* {!selectedCategory && !searchQuery && <Hero />} */}

      <div className="container mx-auto p-4">
        {searchQuery && (
          <h2 className="text-xl font-semibold mb-4 underline">
            {searchQuery}
          </h2>
        )}

        {/* {selectedCategory && (
          <h2 className="text-xl font-semibold mb-4">
            {products.find(p => p.category.id === selectedCategory)?.category.name || 'Category'}
          </h2>
        )} */}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No products found</p>
            <Link 
              to="/"
              className="mt-4 inline-block text-blue-500 hover:text-blue-600"
            >
              View all products
            </Link>
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
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    {product.title}
                  </h2>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600 font-bold">
                      ${product.price}
                    </span>
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
                      onClick={() => dispatch(addToCart(product))}
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
    </div>
  );
};

export default ProductList;