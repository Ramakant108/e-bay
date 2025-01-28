// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Buy Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Buy</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Registration</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">eBay Money Back Guarantee</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Bidding & buying help</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Stores</Link></li>
            </ul>
          </div>

          {/* Sell Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sell</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Start selling</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Learn to sell</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Affiliates</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Site map</Link></li>
            </ul>
          </div>

          {/* About eBay Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About eBay</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Company info</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">News</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Investors</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Help & Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Seller Information Center</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Contact us</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Privacy policy</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-white">Terms of use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>Copyright © {currentYear} eBay Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;