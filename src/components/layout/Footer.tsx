
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">DigiShopHub</h3>
            <p className="text-gray-600">
              Your one-stop shop for premium digital products.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Home</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-brand-blue">Products</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-brand-blue">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-blue">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: support@digishophub.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} DigiShopHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
