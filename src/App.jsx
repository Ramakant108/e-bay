// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import store from './redux/Store';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooterPaths = ['/login']; 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route 
              path="/cart" 
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile/>
                </PrivateRoute>
              } 
            />
             <Route 
              path="/orders" 
              element={
                <PrivateRoute>
                  <Orders/>
                </PrivateRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;